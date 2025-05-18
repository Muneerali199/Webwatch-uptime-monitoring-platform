import { randomUUIDv7 } from "bun";
import type { OutgoingMessage, SignupOutgoingMessage, ValidateOutgoingMessage } from "common/types";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import nacl_util from "tweetnacl-util";

// Hardcoded private key (64-byte Uint8Array)
const PRIVATE_KEY = new Uint8Array([
  115,182,181,226,80,193,122,184,11,164,27,60,216,38,193,69,
  71,49,168,191,140,139,60,202,203,47,13,228,201,149,14,133,
  189,115,43,175,184,64,82,64,93,234,25,10,112,239,213,221,
  167,11,247,14,113,194,217,166,77,197,30,202,153,149,224,67
]);

const CALLBACKS: {[callbackId: string]: (data: SignupOutgoingMessage) => void} = {};
let validatorId: string | null = null;

async function main() {
    const keypair = Keypair.fromSecretKey(PRIVATE_KEY);
    const ws = new WebSocket("ws://localhost:8081");

    ws.onmessage = async (event) => {
        try {
            const data: OutgoingMessage = JSON.parse(event.data);
            if (data.type === 'signup') {
                CALLBACKS[data.data.callbackId]?.(data.data);
                delete CALLBACKS[data.data.callbackId];
            } else if (data.type === 'validate') {
                await validateHandler(ws, data.data, keypair);
            }
        } catch (error) {
            console.error('Error handling message:', error);
        }
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
        console.log('WebSocket connection closed. Reconnecting...');
        setTimeout(main, 5000);
    };

    ws.onopen = async () => {
        try {
            const callbackId = randomUUIDv7();
            CALLBACKS[callbackId] = (data: SignupOutgoingMessage) => {
                validatorId = data.validatorId;
                console.log(`Registered validator ID: ${validatorId}`);
            };
            
            const signedMessage = await signMessage(
                `Validator signup:${callbackId}:${keypair.publicKey.toString()}`, 
                keypair
            );

            ws.send(JSON.stringify({
                type: 'signup',
                data: {
                    callbackId,
                    ip: '127.0.0.1',
                    publicKey: keypair.publicKey.toString(),
                    signedMessage,
                    version: '1.0.0'
                },
            }));
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };
}

async function validateHandler(
    ws: WebSocket, 
    { url, callbackId, websiteId }: ValidateOutgoingMessage, 
    keypair: Keypair
) {
    console.log(`Validating ${url}`);
    const startTime = Date.now();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    try {
        const signature = await signMessage(`Validation:${callbackId}:${websiteId}`, keypair);
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeout);
        const endTime = Date.now();
        const latency = endTime - startTime;

        ws.send(JSON.stringify({
            type: 'validate',
            data: {
                callbackId,
                status: response.status === 200 ? 'Good' : 'Bad',
                latency,
                websiteId,
                validatorId,
                signedMessage: signature,
                timestamp: new Date().toISOString()
            },
        }));
        
        console.log(`Validation complete for ${url} (${latency}ms)`);
    } catch (error) {
        console.error(`Validation failed for ${url}:`, error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const isTimeout = errorMessage.includes('aborted');
        
        const signature = await signMessage(`Error:${callbackId}:${websiteId}`, keypair);
        ws.send(JSON.stringify({
            type: 'validate',
            data: {
                callbackId,
                status: 'Bad',
                latency: isTimeout ? 10000 : -1,
                websiteId,
                validatorId,
                signedMessage: signature,
                timestamp: new Date().toISOString(),
                error: isTimeout ? 'Request timed out' : errorMessage
            },
        }));
    } finally {
        clearTimeout(timeout);
    }
}

async function signMessage(message: string, keypair: Keypair): Promise<string> {
    const messageBytes = nacl_util.decodeUTF8(message);
    const signature = nacl.sign.detached(messageBytes, keypair.secretKey);
    return nacl_util.encodeBase64(signature);
}

// Start the validator with error handling
main().catch((error) => {
    console.error('Validator startup failed:', error);
    process.exit(1);
});

// Health monitoring
setInterval(() => {
    if (validatorId) {
        console.log(`[${new Date().toISOString()}] Validator active (ID: ${validatorId})`);
    }
}, 30000);
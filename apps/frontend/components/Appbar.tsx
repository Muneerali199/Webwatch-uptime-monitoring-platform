"use client";

import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'

export function Appbar() {
    return  <div className="flex justify-between items-center p-4">
        <div>DPin Uptime</div> 
        <div>
            <SignedOut>
                <SignInButton />
                <SignUpButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    </div>
}
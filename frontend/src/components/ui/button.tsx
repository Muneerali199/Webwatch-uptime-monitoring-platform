import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary/10 border border-primary/30 hover:bg-primary/20 text-primary",
        filled: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary/10 border border-secondary/30 hover:bg-secondary/20 text-secondary",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
        gradient: "text-white before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary before:to-secondary before:opacity-80 hover:before:opacity-100 before:transition-opacity",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        xl: "h-14 px-10 rounded-md text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  glowing?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, glowing = false, children, ...props }, ref) => {
    const buttonContent = (
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    );

    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {variant === 'gradient' ? (
          <>
            {buttonContent}
            {glowing && (
              <span className="absolute -inset-px rounded-md bg-gradient-to-r from-primary via-secondary to-accent opacity-50 blur-sm group-hover:opacity-75 transition-all" />
            )}
          </>
        ) : (
          <>
            {buttonContent}
            {glowing && (
              <span className="absolute -inset-px rounded-md bg-gradient-to-r from-primary to-secondary opacity-30 blur-md group-hover:opacity-50 transition-all" />
            )}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
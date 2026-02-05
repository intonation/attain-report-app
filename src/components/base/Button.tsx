import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'default' | 'small';
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'default', children, disabled, style, ...props }, ref) => {
    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-2)',
      padding: size === 'small'
        ? 'var(--space-2) var(--space-3)'
        : 'var(--space-3) var(--space-5)',
      fontFamily: 'var(--font-sans)',
      fontSize: size === 'small' ? 'var(--font-size-xsmall)' : 'var(--font-size-small)',
      lineHeight: 1.4,
      fontWeight: 500,
      borderRadius: 0,
      border: '1.5px solid transparent',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'background-color 0.15s ease, border-color 0.15s ease',
      ...style,
    };

    const variantStyles: React.CSSProperties =
      variant === 'primary'
        ? {
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-white)',
            borderColor: 'var(--color-accent)',
          }
        : {
            backgroundColor: 'transparent',
            color: 'var(--color-accent)',
            borderColor: 'var(--color-accent)',
          };

    return (
      <button
        ref={ref}
        disabled={disabled}
        style={{ ...baseStyles, ...variantStyles }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

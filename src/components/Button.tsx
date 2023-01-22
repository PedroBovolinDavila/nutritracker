import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariants = 'primary' | 'secondary'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  small?: boolean
  variant?: ButtonVariants
}

export function Button({
  children,
  small = false,
  variant = 'primary',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={` font-bold transition-all rounded-md p-2  disabled:cursor-not-allowed ${
        small ? 'w-max px-4' : 'w-full'
      } ${
        variant === 'primary'
          ? 'bg-teal-500 hover:bg-teal-600 disabled:bg-teal-700'
          : 'bg-slate-400 hover:bg-slate-500 disabled:bg-slate-600'
      }`}
      {...rest}
    >
      {children}
    </button>
  )
}

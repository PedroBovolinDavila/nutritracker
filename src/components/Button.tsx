import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      className="bg-teal-500 w-full hover:bg-teal-600 font-bold transition-all rounded-md p-2 disabled:bg-teal-700 disabled:cursor-not-allowed"
      {...rest}
    >
      {children}
    </button>
  )
}

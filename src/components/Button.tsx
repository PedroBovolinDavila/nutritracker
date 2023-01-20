import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      className="bg-teal-500 w-full hover:bg-teal-600 font-bold transition-all rounded-md p-2"
      {...rest}
    >
      {children}
    </button>
  )
}

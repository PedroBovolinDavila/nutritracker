import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ ...rest }: InputProps) {
  return (
    <input
      className="text-slate-200 w-full rounded-t-md bg-slate-900 border-b-2 border-transparent border-b-slate-700 py-2 px-4 h-max placeholder:text-slate-500 text-lg outline-none hover:border-b-teal-500/50 focus:border-teal-500 transition-all"
      {...rest}
    />
  )
}

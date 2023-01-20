import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ ...rest }: InputProps) {
  return (
    <input
      className="text-slate-200 rounded-md bg-slate-900 border-2 border-slate-700 py-2 px-4 h-max placeholder:text-slate-500 text-lg outline-none hover:border-slate-700 focus:border-teal-500 transition-all"
      {...rest}
    />
  )
}

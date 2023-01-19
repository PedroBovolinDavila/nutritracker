import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function Input({ label, ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-2 h-max">
      <label htmlFor={label} className="text-slate-200">
        {label}
      </label>
      <input
        id={label}
        {...rest}
        className="text-slate-100 rounded-md bg-slate-700 border-2 border-slate-600 p-2 text-lg outline-none hover:border-teal-500/50 focus:border-teal-500 transition-all"
      />
    </div>
  )
}

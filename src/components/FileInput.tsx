import { InputHTMLAttributes } from 'react'

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function FileInput({ label, ...rest }: FileInputProps) {
  return (
    <div className="flex flex-col gap-2 h-max">
      <label htmlFor={label} className="text-slate-200">
        {label}
      </label>
      <input
        type="file"
        id={label}
        className="text-slate-100 rounded-md bg-slate-700 p-2 border-2 border-slate-600 outline-none hover:border-teal-500/50 focus:border-teal-500 transition-all"
        {...rest}
      />
    </div>
  )
}

import { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: {
    value: string
    displayValue: string
  }[]
}

export default function Select({ options, ...rest }: SelectProps) {
  return (
    <select
      className="text-slate-200 border-b-slate-700 w-full rounded-t-md bg-slate-900 border-b-2 py-2 px-4 h-max placeholder:text-slate-500 text-lg outline-none hover:border-b-teal-500/50 focus:border-teal-500 transition-all"
      {...rest}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.displayValue}
        </option>
      ))}
    </select>
  )
}

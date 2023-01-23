import { forwardRef, SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: {
    value: string
    displayValue: string
  }[]
  errorMessage?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, errorMessage, ...rest }, ref) => {
    return (
      <div>
        <select
          className={`text-slate-200 w-full rounded-t-md bg-slate-900 border-b-2 py-2 px-4 h-max placeholder:text-slate-500 text-lg outline-none hover:border-b-teal-500/50 focus:border-teal-500 transition-all ${
            errorMessage ? 'border-red-600' : 'border-b-slate-700 '
          }`}
          ref={ref}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>

        {errorMessage && (
          <span className="text-red-600 mt-1">{errorMessage}</span>
        )}
      </div>
    )
  },
)

Select.displayName = 'Select'

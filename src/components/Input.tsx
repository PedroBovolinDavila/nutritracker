import { forwardRef, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ errorMessage, ...rest }, ref) => (
    <div>
      <input
        className={`text-slate-200 w-full rounded-t-md bg-slate-900 border-b-2 py-2 px-4 h-max placeholder:text-slate-500 text-lg outline-none hover:border-b-teal-500/50 focus:border-teal-500 transition-all ${
          errorMessage ? 'border-red-600' : 'border-b-slate-700 '
        }`}
        ref={ref}
        {...rest}
      />

      {errorMessage && (
        <span className="text-red-600 mt-1">{errorMessage}</span>
      )}
    </div>
  ),
)

Input.displayName = 'Input'

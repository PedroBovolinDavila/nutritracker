import { forwardRef, TextareaHTMLAttributes } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMessage?: string
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ errorMessage, ...rest }, ref) => (
    <div>
      <textarea
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

TextArea.displayName = 'TextArea'

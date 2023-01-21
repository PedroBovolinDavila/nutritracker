import { forwardRef, TextareaHTMLAttributes } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ ...rest }, ref) => (
    <textarea
      className="text-slate-100 rounded-md bg-slate-900 border-2 border-slate-700 p-2 placeholder:text-slate-500 text-lg outline-none hover:border-slate-700 focus:border-teal-500 transition-all"
      ref={ref}
      {...rest}
    />
  ),
)

TextArea.displayName = 'TextArea'

import { TextareaHTMLAttributes } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function TextArea({ ...rest }: TextAreaProps) {
  return (
    <textarea
      className="text-slate-100 rounded-md bg-slate-900 border-2 border-slate-700 p-2 placeholder:text-slate-500 text-lg outline-none hover:border-slate-700 focus:border-teal-500 transition-all"
      {...rest}
    />
  )
}

import { ReactNode } from 'react'

interface ModalProps {
  children: ReactNode
  isOpen: boolean
  large?: boolean
  small?: boolean
}

export function Modal({
  children,
  isOpen,
  large = false,
  small = false,
}: ModalProps) {
  return (
    <>
      {isOpen && (
        <div className="absolute left-0 top-0 w-full h-screen bg-black/60 flex items-center justify-center">
          <div
            className={`bg-slate-800 border-2 border-slate-700 rounded-md p-4 w-full relative ${
              large ? 'max-w-3xl' : small ? 'max-w-md' : 'max-w-xl'
            }`}
          >
            {children}
          </div>
        </div>
      )}
    </>
  )
}

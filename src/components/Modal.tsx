import { ReactNode } from 'react'

interface ModalProps {
  children: ReactNode
  isOpen: boolean
}

export function Modal({ children, isOpen }: ModalProps) {
  return (
    <>
      {isOpen && (
        <div className="absolute left-0 top-0 w-full h-screen bg-black/60 flex items-center justify-center">
          <div className="bg-slate-800 border-2 border-slate-700 rounded-md p-4 w-full max-w-xl">
            {children}
          </div>
        </div>
      )}
    </>
  )
}

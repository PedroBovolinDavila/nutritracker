import { ReactNode } from 'react'
import { Modal } from './Modal'

interface RecipeModalProps {
  title: string
  inputs: () => ReactNode
  isOpen: boolean
}

export function RecipeModal({ title, isOpen, inputs }: RecipeModalProps) {
  return (
    <Modal isOpen={isOpen}>
      <h1 className="text-2xl text-slate-200 font-bold mb-4">{title}</h1>
      {inputs()}
    </Modal>
  )
}

import { useState } from 'react'

type ModalOptions = 'title' | 'text' | 'list' | 'subtitle' | 'all'

export function useRecipesModals() {
  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false)
  const [isSubtitleModalOpen, setIsSubtitleModalOpen] = useState(false)
  const [isTextModalOpen, setIsTextModalOpen] = useState(false)
  const [isListModalOpen, setIsListModalOpen] = useState(false)

  function toggleModal(modal: ModalOptions) {
    switch (modal) {
      case 'list':
        setIsListModalOpen((prev) => !prev)
        break
      case 'text':
        setIsTextModalOpen((prev) => !prev)
        break
      case 'title':
        setIsTitleModalOpen((prev) => !prev)
        break
      case 'subtitle':
        setIsSubtitleModalOpen((prev) => !prev)
        break
      case 'all':
        setIsSubtitleModalOpen(false)
        setIsTitleModalOpen(false)
        setIsListModalOpen(false)
        setIsTextModalOpen(false)
    }
  }

  return {
    isTitleModalOpen,
    isTextModalOpen,
    isSubtitleModalOpen,
    isListModalOpen,
    toggleModal,
  }
}

import React from 'react'
import { LinkButton } from '../LinkButton'

type ModalTriggerFuncion = React.Dispatch<React.SetStateAction<boolean>>

interface DescriptionProps {
  name: string
  content: string
  doctorView?: boolean
  modalTriggers: {
    createMeal: ModalTriggerFuncion
    sendMessageToDoctor?: ModalTriggerFuncion
    sendAlert?: ModalTriggerFuncion
    aditPatient?: ModalTriggerFuncion
    removePatient?: ModalTriggerFuncion
  }
}

export function Description({
  name,
  content,
  doctorView = false,
  modalTriggers,
}: DescriptionProps) {
  return (
    <div className="flex-1 bg-slate-800 border-2 border-slate-700 rounded-md p-4 flex flex-col gap-8 ">
      <div>
        <h1 className="text-slate-200 font-semibold text-2xl">{name}</h1>
        <p className="text-slate-300 leading-relaxed mt-2">{content}</p>
      </div>
      <div className="flex gap-3 mt-auto">
        {doctorView ? (
          <>
            <LinkButton>Enviar alerta</LinkButton>
            <LinkButton>Editar paciente</LinkButton>
            <LinkButton>Excluir paciente</LinkButton>
          </>
        ) : (
          <>
            <LinkButton onClick={() => modalTriggers.createMeal(true)}>
              Adicionar refeição
            </LinkButton>
            <LinkButton>Enviar mensagem para o doutor</LinkButton>
          </>
        )}
      </div>
    </div>
  )
}

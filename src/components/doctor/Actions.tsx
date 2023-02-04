import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../lib/axios'
import { Patient } from '../../pages/doctor'
import { Button } from '../Button'
import { Input } from '../Input'
import { Modal } from '../Modal'
import { Select } from '../Select'
import { TextArea } from '../TextArea'

const createAlertFormSchema = z.object({
  title: z.string().min(1, { message: 'Informe um titulo para o alerta.' }),
  description: z
    .string()
    .min(10, { message: 'Informe uma descrição para o alerta.' }),
  patientId: z.string().min(1, { message: 'Selecione um paciente.' }),
})

type CreateAlertFormData = z.infer<typeof createAlertFormSchema>

interface ActionsProps {
  patients: Patient[]
}

export function Actions({ patients }: ActionsProps) {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateAlertFormData>({
    resolver: zodResolver(createAlertFormSchema),
  })

  async function handleCreateAlert(formData: CreateAlertFormData) {
    await api.post('/alert', {
      description: formData.description,
      to: formData.patientId,
      title: formData.title,
    })

    setIsAlertModalOpen(false)
  }

  return (
    <div className="bg-slate-800 border-2 border-slate-700 rounded-md p-4 flex-1 h-max my-auto">
      <h3 className="text-lg font-bold text-slate-200">Ações</h3>
      <div className="flex items-center justify-between h-full gap-4 mt-8">
        <Link
          href="/patient/create"
          className="bg-slate-700 border-2 border-slate-600 w-3/4 p-4 rounded-md flex gap-2 flex-col justify-center items-center text-slate-100 font-bold text-lg hover:border-teal-500 transition-all cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
            />
          </svg>
          Adicionar paciente
        </Link>
        <Link
          href="/patient/create-recipe"
          className="bg-slate-700 border-2 border-slate-600 w-3/4 p-4 rounded-md flex gap-2 flex-col justify-center items-center text-slate-100 font-bold text-lg hover:border-teal-500 transition-all cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
            />
          </svg>
          Criar receita
        </Link>
        <button
          onClick={() => setIsAlertModalOpen(true)}
          className="bg-slate-700 border-2 border-slate-600 w-3/4 p-4 rounded-md flex gap-2 flex-col justify-center items-center text-slate-100 font-bold text-lg hover:border-teal-500 transition-all cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
            />
          </svg>
          Adicionar alerta
        </button>
      </div>

      <Modal isOpen={isAlertModalOpen}>
        <h3 className="text-xl text-slate-200 font-bold mb-4">
          Envie um alerta/menssagem para um paciente
        </h3>
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Titulo do alerta"
            errorMessage={errors.title?.message}
            {...register('title')}
          />
          <TextArea
            placeholder="Conteudo do alerta"
            errorMessage={errors.description?.message}
            {...register('description')}
          />
          <Select
            options={patients.map((patient) => ({
              displayValue: `${patient.name} ${patient.lastName}`,
              value: patient.id,
            }))}
            errorMessage={errors.patientId?.message}
            {...register('patientId')}
          />
        </div>
        <div className="flex gap-2 mt-4">
          <Button
            onClick={handleSubmit(handleCreateAlert)}
            disabled={isSubmitting}
          >
            Adicionar
          </Button>
          <Button
            variant="secondary"
            small
            onClick={() => setIsAlertModalOpen(false)}
          >
            Cancelar
          </Button>
        </div>
      </Modal>
    </div>
  )
}

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../../components/Button'
import { MultiStep } from '../../../components/MultiStep'
import { Navbar } from '../../../components/Navbar'
import { TextArea } from '../../../components/TextArea'
import { localStorageConfig } from '../../../config/localStorage'
import { api } from '../../../lib/axios'

const addPatientDescriptionFormSchema = z.object({
  description: z
    .string()
    .min(10, { message: 'Sua descrição deve ter no mínimo 10 caracteres.' }),
})

type AddPatientDescriptionFormData = z.infer<
  typeof addPatientDescriptionFormSchema
>

export default function AddDescription() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddPatientDescriptionFormData>({
    resolver: zodResolver(addPatientDescriptionFormSchema),
    shouldFocusError: false,
  })

  const router = useRouter()

  async function handleAddPatientDescription(
    formData: AddPatientDescriptionFormData,
  ) {
    const patientId = localStorage.getItem(localStorageConfig.patientIdKey)

    if (!patientId) {
      await router.push('/patient/create')
    }

    await api.patch(
      '/patients/add-description',
      {
        description: formData.description,
      },
      {
        params: {
          patientId,
        },
      },
    )

    await router.push('/patient/create/add-avatar')
  }

  return (
    <div className="bg-gray-900 w-full h-screen p-4">
      <Navbar />

      <div className="flex gap-4 w-full mt-4 max-w-screen-xl mx-auto">
        <MultiStep
          steps={['Dados pessoais', 'Registro', 'Descrição', 'Avatar']}
          activeStep={3}
          vertical
        />

        <div className="bg-slate-800 border-2 border-slate-700 rounded-md p-4 flex-1 flex flex-col gap-4">
          <h2 className="text-xl text-slate-200 font-bold">
            Dados pessoais do paciente
          </h2>

          <TextArea
            placeholder="Faça uma breve descrição do estado atual do paciente, para comparações futuras"
            errorMessage={errors.description?.message}
            {...register('description')}
          />

          <Button
            onClick={handleSubmit(handleAddPatientDescription)}
            disabled={isSubmitting}
            small
          >
            Proximo passo
          </Button>
        </div>
      </div>
    </div>
  )
}

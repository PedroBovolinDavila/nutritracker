import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../components/Button'
import { MultiStep } from '../../components/MultiStep'
import { TextArea } from '../../components/TextArea'
import { localStorageConfig } from '../../config/localStorage'
import { api } from '../../lib/axios'

const addDescriptionFormSchema = z.object({
  description: z
    .string()
    .min(10, { message: 'Sua descrição deve ter no mínimo 10 caracteres.' }),
})

type AddDescriptionFormData = z.infer<typeof addDescriptionFormSchema>

export default function AddDescription() {
  const { register, handleSubmit } = useForm<AddDescriptionFormData>({
    resolver: zodResolver(addDescriptionFormSchema),
  })

  const router = useRouter()

  async function handleAddDescription(formData: AddDescriptionFormData) {
    const doctorId = localStorage.getItem(localStorageConfig.doctorIdKey)

    if (!doctorId) {
      await router.push('/signup')
    }

    await api.patch(
      '/doctors/add-description',
      { description: formData.description },
      { params: { doctorId } },
    )

    await router.push('/signup/add-avatar')
  }

  return (
    <div className="bg-gray-900 w-full h-screen p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <MultiStep
          steps={[
            'Informações pessoais',
            'Cadastro',
            'Descrição',
            'Foto de perfil',
          ]}
          activeStep={3}
        />

        <div className="bg-slate-800 border-2 border-slate-700 rounded-md p-4 mt-4">
          <h3 className="text-lg font-bold text-slate-200">
            Faça uma breve descrição sobre você
          </h3>

          <div className="flex flex-col gap-6 mt-6">
            <TextArea placeholder="Descrição" {...register('description')} />

            <Button onClick={handleSubmit(handleAddDescription)}>
              Proximo passo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

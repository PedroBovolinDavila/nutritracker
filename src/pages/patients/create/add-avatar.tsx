import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../../components/Button'
import { Input } from '../../../components/Input'
import { MultiStep } from '../../../components/MultiStep'
import { Navbar } from '../../../components/Navbar'
import { localStorageConfig } from '../../../config/localStorage'
import { api } from '../../../lib/axios'

const addPatientAvatarFormSchema = z.object({
  avatar: z.any(),
})

type AddPatientAvatarFormData = z.infer<typeof addPatientAvatarFormSchema>

export default function AddAvatar() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddPatientAvatarFormData>({
    resolver: zodResolver(addPatientAvatarFormSchema),
    shouldFocusError: false,
  })

  const router = useRouter()

  async function handleAddPatientAvatar(formData: AddPatientAvatarFormData) {
    const patientId = localStorage.getItem(localStorageConfig.patientIdKey)

    if (!patientId) {
      await router.push('/patients/create')
    }

    await api.patch(
      '/patients/add-avatar',
      { file: formData.avatar[0] },
      {
        params: { patientId },
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    )

    localStorage.removeItem(localStorageConfig.patientIdKey)

    await router.push('/doctor')
  }

  return (
    <div className="bg-gray-900 w-full h-screen p-4">
      <Navbar />

      <div className="flex gap-4 w-full mt-4 max-w-screen-xl mx-auto">
        <MultiStep
          steps={['Dados pessoais', 'Registro', 'Descrição', 'Avatar']}
          activeStep={1}
          vertical
        />

        <div className="bg-slate-800 border-2 border-slate-700 rounded-md p-4 flex-1 flex flex-col gap-4">
          <h2 className="text-xl text-slate-200 font-bold">
            Dados pessoais do paciente
          </h2>

          <Input
            type="file"
            errorMessage={errors.avatar?.message as string}
            {...register('avatar')}
          />

          <Button
            onClick={handleSubmit(handleAddPatientAvatar)}
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

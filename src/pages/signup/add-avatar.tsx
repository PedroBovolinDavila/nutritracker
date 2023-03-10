import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { MultiStep } from '../../components/MultiStep'
import { localStorageConfig } from '../../config/localStorage'
import { api } from '../../lib/axios'

const addAvatarFormSchema = z.object({
  avatar: z.any(),
})

type AddAvatarFormData = z.infer<typeof addAvatarFormSchema>

export default function AddAvatar() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddAvatarFormData>({
    resolver: zodResolver(addAvatarFormSchema),
    shouldFocusError: false,
  })

  const router = useRouter()

  async function handleAddAvatar(formData: AddAvatarFormData) {
    const doctorId = localStorage.getItem(localStorageConfig.doctorIdKey)

    if (!doctorId) {
      await router.push('/signup')
    }

    await api.patch(
      '/doctors/add-avatar',
      { file: formData.avatar[0] },
      {
        params: { doctorId },
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    )

    localStorage.removeItem(localStorageConfig.doctorIdKey)

    await router.push('/signin')
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
          activeStep={4}
        />

        <div className="bg-slate-800 border-2 border-slate-700 rounded-md p-4 mt-4">
          <h3 className="text-lg font-bold text-slate-200">
            Adicione uma foto de perfil
          </h3>

          <div className="flex flex-col gap-6 mt-6">
            <Input
              type="file"
              errorMessage={errors.avatar?.message as string}
              {...register('avatar')}
            />

            <Button
              onClick={handleSubmit(handleAddAvatar)}
              disabled={isSubmitting}
            >
              Finalizar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

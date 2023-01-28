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

const registerPatientFormSchema = z.object({
  username: z.string().min(1, { message: 'Informe um username.' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
})

type RegisterPatientFormSchema = z.infer<typeof registerPatientFormSchema>

export default function RegisterPatient() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterPatientFormSchema>({
    resolver: zodResolver(registerPatientFormSchema),
  })

  const router = useRouter()

  async function handleRegisterPatient(formData: RegisterPatientFormSchema) {
    const patientId = localStorage.getItem(localStorageConfig.patientIdKey)

    if (!patientId) {
      await router.push('/patients/create')
    }

    await api.patch(
      '/patients/register',
      {
        username: formData.username,
        password: formData.password,
      },
      {
        params: {
          patientId,
        },
      },
    )

    await router.push('/patient/create/add-description')
  }

  return (
    <div className="bg-gray-900 w-full h-screen p-4">
      <Navbar />

      <div className="flex gap-4 w-full mt-4 max-w-screen-xl mx-auto">
        <MultiStep
          steps={['Dados pessoais', 'Registro', 'Descrição', 'Avatar']}
          activeStep={2}
          vertical
        />

        <div className="bg-slate-800 border-2 border-slate-700 rounded-md p-4 flex-1">
          <h2 className="text-xl text-slate-200 font-bold">
            Dados pessoais do paciente
          </h2>

          <div className="grid grid-cols-2 gap-2 my-4">
            <Input
              placeholder="Username para acesso"
              errorMessage={errors.username?.message}
              {...register('username')}
            />
            <Input
              placeholder="Senha"
              type="password"
              errorMessage={errors.password?.message}
              {...register('password')}
            />
          </div>

          <Button
            onClick={handleSubmit(handleRegisterPatient)}
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

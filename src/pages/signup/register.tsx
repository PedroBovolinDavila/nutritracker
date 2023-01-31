import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Modal } from '../../components/Modal'
import { MultiStep } from '../../components/MultiStep'
import { localStorageConfig } from '../../config/localStorage'
import { api } from '../../lib/axios'

const registerFormSchema = z.object({
  username: z.string().min(1, { message: 'Informe um username.' }),
  password: z
    .string()
    .min(6, { message: 'Sua senha deve ter no mínimo 6 caracteres' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const [errorModalData, setErrorModalData] = useState({
    open: false,
    message: '',
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    shouldFocusError: false,
  })

  const router = useRouter()

  async function handleRegisterDoctor(formData: RegisterFormData) {
    const doctorId = localStorage.getItem(localStorageConfig.doctorIdKey)

    if (!doctorId) {
      await router.push('/signup')
    }

    try {
      await api.patch(
        '/doctors/register',
        {
          username: formData.username,
          password: formData.password,
        },
        {
          params: { doctorId },
        },
      )

      await router.push('/signup/add-description')
    } catch (err) {
      if (err instanceof AxiosError) {
        setErrorModalData({
          open: true,
          message: err.response?.data.message,
        })
      }
    }
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
          activeStep={2}
        />

        <div className="bg-slate-800 border-2 border-slate-700 rounded-md p-4 mt-4">
          <h3 className="text-lg font-bold text-slate-200">
            Preencha os dados para o registro
          </h3>

          <div>
            <div className="flex flex-col gap-2 my-6">
              <Input
                placeholder="Username"
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
              onClick={handleSubmit(handleRegisterDoctor)}
              disabled={isSubmitting}
            >
              Proximo passo
            </Button>
          </div>
        </div>
      </div>

      <Modal isOpen={errorModalData.open}>
        <h2 className="text-xl text-slate-200 font-bold">
          Erro ao se registrar
        </h2>
        <p className="text-lg text-slate-200 my-4">{errorModalData.message}</p>
        <Button
          small
          variant="secondary"
          onClick={() => setErrorModalData({ open: false, message: '' })}
        >
          Fechar
        </Button>
      </Modal>
    </div>
  )
}

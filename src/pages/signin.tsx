import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Modal } from '../components/Modal'
import { Select } from '../components/Select'
import { api } from '../lib/axios'

const signInFormSchema = z.object({
  username: z.string().min(1, { message: 'Informe o seu username.' }),
  password: z.string().min(1, { message: 'Informe a sua senha.' }),
  role: z.string(),
})

type SignInFormData = z.infer<typeof signInFormSchema>

export default function SignIn() {
  const [isErroModalOpen, setIsErrorModalOpen] = useState(false)
  const [loginError, setLoginError] = useState('')

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
  })

  async function handleSignIn(formData: SignInFormData) {
    try {
      await api.post('/session', {
        username: formData.username,
        password: formData.password,
        role: formData.role,
      })

      await router.push(`/${formData.role}`)
    } catch (err) {
      if (err instanceof AxiosError) {
        setIsErrorModalOpen(true)
        setLoginError(err.response?.data.message)
      } else {
        setIsErrorModalOpen(true)
        setLoginError('Error ao fazer login, tente novamente mais tarde.')
      }
    }
  }

  return (
    <div className="bg-gray-900 w-full h-screen p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="bg-slate-800 border-2 border-slate-700 rounded-md p-4 mt-4">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-3xl text-slate-200">
              Nutri
              <span className="text-teal-400">Tracker</span>
            </h1>

            <div className="flex flex-col items-end text-slate-400 ">
              <p>Faça seu login ou</p>
              <Link href="/signup">se registre clicando aqui</Link>
            </div>
          </div>

          <div className="my-6 flex flex-col gap-2">
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

            <Select
              options={[
                {
                  displayValue: 'Doutor',
                  value: 'doctor',
                },
                {
                  displayValue: 'Paciente',
                  value: 'patient',
                },
              ]}
              errorMessage={errors.role?.message}
              {...register('role')}
            />
          </div>
          <Button onClick={handleSubmit(handleSignIn)} disabled={isSubmitting}>
            Entrar
          </Button>
        </div>
      </div>

      <Modal isOpen={isErroModalOpen}>
        <h2 className="text-xl text-slate-200 font-bold">
          Erro ao fazer login
        </h2>
        <p className="text-lg text-slate-200 my-4">{loginError}</p>
        <Button
          small
          variant="secondary"
          onClick={() => setIsErrorModalOpen(false)}
        >
          Fechar
        </Button>
      </Modal>
    </div>
  )
}

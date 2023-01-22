import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { MultiStep } from '../../components/MultiStep'
import { api } from '../../lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { localStorageConfig } from '../../config/localStorage'

const signUpFormSchema = z.object({
  name: z.string().min(1, { message: 'Informe seu nome.' }),
  lastName: z.string().min(1, { message: 'Informe seu sobrenome.' }),
  age: z
    .string()
    .transform((age) => Number(age))
    .refine((age) => age >= 18, { message: 'Você deve ser maior de idade.' }),
  email: z.string().email({ message: 'Informe um e-mail válido.' }),
})

type SignUpFormData = z.infer<typeof signUpFormSchema>

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    shouldFocusError: false,
  })

  const router = useRouter()

  async function handleSignUp(formData: SignUpFormData) {
    const { data } = await api.post('/doctors', {
      name: formData.name,
      email: formData.email,
      lastName: formData.lastName,
      age: formData.age,
    })

    localStorage.setItem(localStorageConfig.doctorIdKey, data.content.doctorId)

    await router.push('/signup/register')
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
          activeStep={1}
        />

        <div className="bg-slate-800 border-2 border-slate-700 rounded-md p-4 mt-4">
          <h3 className="text-lg font-bold text-slate-200">
            Preencha suas informações pessoais
          </h3>

          <div>
            <div className="grid grid-cols-2 my-6 gap-2">
              <Input
                placeholder="Nome"
                errorMessage={errors.name?.message}
                {...register('name')}
              />
              <Input
                placeholder="Sobrenome"
                errorMessage={errors.lastName?.message}
                {...register('lastName')}
              />
              <Input
                placeholder="Idade"
                type="number"
                errorMessage={errors.age?.message}
                {...register('age')}
              />
              <Input
                placeholder="E-mail"
                errorMessage={errors.email?.message}
                {...register('email')}
              />
            </div>

            <Button
              onClick={handleSubmit(handleSignUp)}
              disabled={isSubmitting}
            >
              Proximo passo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

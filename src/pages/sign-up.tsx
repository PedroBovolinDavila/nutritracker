import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../components/Button'
import { FileInput } from '../components/FileInput'
import { Input } from '../components/Input'
import { TextArea } from '../components/TextArea'
import { zodResolver } from '@hookform/resolvers/zod'

const signUpFormSchema = z.object({
  name: z.string(),
  age: z
    .string()
    .transform((age) => Number(age))
    .refine((age) => age >= 18, {
      message: 'Você deve ser maior de idade para se cadastrar no sistema.',
    }),
  email: z.string().email({
    message: 'Informe um e-mail valido.',
  }),
  username: z.string().min(3, {
    message: 'Seu username deve ter 3 caracteres ou mais.',
  }),
  password: z.string().min(6, {
    message: 'Sua senha deve ter 6 caracteres ou mais.',
  }),
  avatar: z.string(),
  description: z.string().min(10, {
    message: 'Sua descrição deve ter 10 caracteres ou mais.',
  }),
})

type SignUpFormData = z.infer<typeof signUpFormSchema>

export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  })

  function handleSignUp(data: SignUpFormData) {
    console.log(data)
  }

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center bg-gray-900">
      <div className="w-full mt-4 max-w-screen-sm mx-auto bg-slate-800 border-2 border-slate-700 rounded-md flex flex-col gap-8 p-4">
        <div>
          <h1 className="text-slate-200 text-2xl font-bold mb-1">
            Faça seu cadastro<span className="text-teal-400">.</span>
          </h1>
          <Link href="/sign-in" className="text-slate-400/80 underline">
            ou entre no site caso já tenha um registro
          </Link>
        </div>
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input label="Nome" onChange={field.onChange} />
              )}
            />
            <Controller
              control={control}
              name="age"
              render={({ field }) => (
                <Input label="Idade" type="number" onChange={field.onChange} />
              )}
            />
          </div>

          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <Input label="Username" onChange={field.onChange} />
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input label="Email" type="email" onChange={field.onChange} />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <Input
                  label="Senha"
                  type="password"
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <Controller
            control={control}
            name="avatar"
            render={({ field }) => (
              <FileInput label="Imagem de perfil" onChange={field.onChange} />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <TextArea
                label="Faça uma descrição sobre você"
                onChange={(e) => field.onChange(e)}
              />
            )}
          />

          <Button type="submit">Registrar</Button>
        </form>
      </div>
      {JSON.stringify(errors)}
    </div>
  )
}

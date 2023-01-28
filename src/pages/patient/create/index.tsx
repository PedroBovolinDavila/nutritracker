import { zodResolver } from '@hookform/resolvers/zod'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../../components/Button'
import { Input } from '../../../components/Input'
import { MultiStep } from '../../../components/MultiStep'
import { Navbar } from '../../../components/Navbar'
import { localStorageConfig } from '../../../config/localStorage'
import { api } from '../../../lib/axios'
import { getDoctorData } from '../../../utils/getDoctorData'

const createPatientFormSchema = z.object({
  name: z.string().min(1, { message: 'Informe um nome.' }),
  lastName: z.string().min(1, { message: 'Informe um sobrenome.' }),
  age: z
    .string()
    .transform((age) => Number(age))
    .refine((age) => !!age, { message: 'Informe uma idade.' }),
  email: z.string().email({ message: 'Informe um e-mail válido.' }),
})

type CreatePatientFormSchema = z.infer<typeof createPatientFormSchema>

interface CreatePatientProps {
  doctorId: string
}

export default function CreatePatient({ doctorId }: CreatePatientProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreatePatientFormSchema>({
    resolver: zodResolver(createPatientFormSchema),
  })

  const router = useRouter()

  async function handleCreatePatient(formData: CreatePatientFormSchema) {
    const { data } = await api.post('/patients', {
      name: formData.name,
      email: formData.email,
      lastName: formData.lastName,
      age: formData.age,
      doctorId,
    })

    localStorage.setItem(
      localStorageConfig.patientIdKey,
      data.content.patientId,
    )

    await router.push('/patient/create/register')
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

        <div className="bg-slate-800 border-2 border-slate-700 rounded-md p-4 flex-1">
          <h2 className="text-xl text-slate-200 font-bold">
            Dados pessoais do paciente
          </h2>

          <div className="grid grid-cols-2 gap-2 my-4">
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
              placeholder="Email"
              errorMessage={errors.email?.message}
              {...register('email')}
            />
          </div>

          <Button
            onClick={handleSubmit(handleCreatePatient)}
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { doctor, redirectUrl } = await getDoctorData(ctx)

  if (redirectUrl) {
    return {
      redirect: {
        destination: redirectUrl,
        permanent: false,
      },
    }
  }

  return {
    props: {
      doctorId: doctor?.id,
    },
  }
}

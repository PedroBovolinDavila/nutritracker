import { Navbar } from '../../components/Navbar'
import { Profile } from '../../components/Profile'
import { Description } from '../../components/patients/Description'
import Link from 'next/link'
import { Plus } from 'phosphor-react'
import { MealCard } from '../../components/patients/MealCard'
import { GetServerSideProps } from 'next'
import { getPatientData } from '../../utils/getPatientData'

interface PatientProps {
  patient: {
    name: string
    lastName: string
    email: string
    description: string
    avatar_url: string
  }
}

export default function Patient({ patient }: PatientProps) {
  return (
    <div className="bg-gray-900 w-full p-4">
      <Navbar />
      <div className="w-full mt-4 max-w-screen-xl mx-auto flex gap-4">
        <Profile
          avatar={patient.avatar_url}
          name={patient.name}
          email={patient.email}
        />
        <Description
          name={`${patient.name} ${patient.lastName}`}
          content={patient.description}
        />
      </div>

      <div className="w-full mt-4 max-w-screen-xl mx-auto bg-slate-800 border-2 border-slate-700 rounded-md p-4">
        <div className="flex items-center justify-between border-b-2 border-b-slate-600 pb-2">
          <h3 className="font-bold text-xl text-slate-200">
            Suas refeições cadastradas
          </h3>
          <Link
            href="/meals/create"
            className="flex items-center gap-1 text-slate-300 hover:underline"
          >
            <Plus color="white" />
            Adicionar refeição
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-3">
          <MealCard />
          <MealCard />
          <MealCard />
          <MealCard />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { patient, redirectUrl } = await getPatientData(ctx)

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
      patient: JSON.parse(JSON.stringify(patient)),
    },
  }
}
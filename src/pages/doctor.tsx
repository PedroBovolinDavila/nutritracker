import { Navbar } from '../components/Navbar'
import { Profile } from '../components/Profile'
import { Actions } from '../components/doctor/Actions'
import { Patients } from '../components/doctor/Patients'
import { GetServerSideProps } from 'next'
import { getDoctorData } from '../utils/getDoctorData'
import Link from 'next/link'

export interface Patient {
  id: string
  avatar_url: string
  name: string
  lastName: string
  description: string
}

interface DoctorProps {
  name: string
  avatar: string
  email: string
  patients: Patient[]
}

export default function Doctor({ name, avatar, email, patients }: DoctorProps) {
  return (
    <div className="bg-gray-900 w-full p-4">
      <Navbar />
      <div className="w-full mt-4 max-w-screen-xl mx-auto flex gap-4">
        <Profile x={-50} avatar={avatar} name={name} email={email} />
        <Actions />
      </div>
      {patients.length ? (
        <Patients patients={patients} />
      ) : (
        <div className="w-full flex-col max-w-screen-xl mx-auto bg-slate-800 border-2 border-slate-700 flex items-center justify-center rounded-md p-4 mt-4">
          <h3 className="text-2xl font-bold text-slate-200">
            Você não tem nenhum paciente cadastrado
          </h3>
          <Link href="/patients/create" className="text-lg text-slate-300 mt-2">
            Cadastre agora clicando aqui
          </Link>
        </div>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { redirectUrl, doctor } = await getDoctorData(ctx)

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
      name: doctor?.name,
      avatar: doctor?.avatar_url,
      email: doctor?.email,
      patients: JSON.parse(JSON.stringify(doctor?.patients)),
    },
  }
}

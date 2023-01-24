import { Navbar } from '../components/Navbar'
import { Profile } from '../components/Profile'
import { Actions } from '../components/doctor/Actions'
import { Patients } from '../components/doctor/Patients'
import { GetServerSideProps } from 'next'
import { getDoctorData } from '../utils/getDoctorData'

interface DoctorProps {
  name: string
  avatar: string
  email: string
}

export default function Doctor({ name, avatar, email }: DoctorProps) {
  console.log(avatar)

  return (
    <div className="bg-gray-900 w-full p-4">
      <Navbar />
      <div className="w-full mt-4 max-w-screen-xl mx-auto flex gap-4">
        <Profile x={-50} avatar={avatar} name={name} email={email} />
        <Actions />
      </div>
      <Patients />
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
    },
  }
}

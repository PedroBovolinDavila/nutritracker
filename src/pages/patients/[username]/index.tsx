import { GetServerSideProps } from 'next'
import { Description } from '../../../components/patients/Description'
import { Meals } from '../../../components/patients/Meals'
import { Navbar } from '../../../components/Navbar'
import { Profile } from '../../../components/Profile'

interface PatientProps {
  username: string
}

export default function Patient({ username }: PatientProps) {
  return (
    <div className="bg-gray-900 w-full p-4">
      <Navbar />
      <div className="w-full max-w-screen-xl mx-auto flex justify-between mt-4 gap-4">
        <Description username={username} />
        <Profile x={50} username={username} />
      </div>
      <Meals />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      username: query.username,
    },
  }
}

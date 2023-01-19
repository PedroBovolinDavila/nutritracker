import { Navbar } from '../../../components/Navbar'
import { Profile } from '../../../components/Profile'
import { Actions } from '../../../components/doctor/Actions'
import { Patients } from '../../../components/doctor/Patients'

export default function Doctor() {
  return (
    <div className="bg-gray-900 w-full p-4">
      <Navbar />
      <div className="w-full mt-4 max-w-screen-xl mx-auto flex gap-4">
        <Profile x={-50} username="Doutor teste" />
        <Actions />
      </div>
      <Patients />
    </div>
  )
}

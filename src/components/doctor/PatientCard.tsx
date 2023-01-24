import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { Patient } from '../../pages/doctor'

interface PatientCardProps {
  patient: Patient
}

export function PatientCard({ patient }: PatientCardProps) {
  const router = useRouter()

  async function handleOpenPatientDetails() {
    await router.push('/patients/pedro')
  }

  return (
    <motion.div
      variants={{
        hide: {
          opacity: 0,
          y: 50,
        },
        show: {
          opacity: 1,
          y: 0,
        },
      }}
      transition={{
        duration: 0.8,
      }}
      className="p-4 border-2 rounded-md border-slate-600 hover:border-teal-600 transition-all flex gap-4 cursor-pointer"
      onClick={handleOpenPatientDetails}
    >
      <Image
        src={`http://localhost:3000/uploads/${patient.avatar_url}`}
        width={120}
        height={120}
        className="rounded-md"
        alt=""
      />

      <div>
        <strong className="text-lg text-slate-300 font-bold">
          {patient.name} {patient.lastName}
        </strong>
        <p className="text-slate-300">{patient.description}</p>
      </div>
    </motion.div>
  )
}

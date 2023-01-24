import { AnimatePresence, motion, Variants } from 'framer-motion'
import { Patient } from '../../pages/doctor'
import { PatientCard } from './PatientCard'

const patientCardContainerVariants: Variants = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
    },
  },
}

interface PatientsProps {
  patients: Patient[]
}

export function Patients({ patients }: PatientsProps) {
  console.log(patients)

  return (
    <div className="w-full max-w-screen-xl mx-auto bg-slate-800 border-2 border-slate-700 rounded-md p-4 mt-4">
      <div className="border-b-2 border-b-slate-600 pb-2">
        <strong className="font-bold text-xl text-slate-200">Pacientes</strong>
      </div>
      <motion.div
        variants={patientCardContainerVariants}
        initial="hide"
        whileInView="show"
        className="flex gap-4 flex-col py-4"
      >
        <AnimatePresence>
          {patients.map((patient) => {
            return <PatientCard key={patient.id} patient={patient} />
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

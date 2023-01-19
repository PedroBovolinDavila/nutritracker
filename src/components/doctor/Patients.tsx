import { AnimatePresence, motion, Variants } from 'framer-motion'
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

export function Patients() {
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
          <PatientCard key={1} />
          <PatientCard key={2} />
          <PatientCard key={3} />
          <PatientCard key={4} />
          <PatientCard key={5} />
          <PatientCard key={6} />
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

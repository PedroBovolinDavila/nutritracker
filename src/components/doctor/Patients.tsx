import { Patient } from '../../pages/doctor'
import { PatientCard } from './PatientCard'

interface PatientsProps {
  patients: Patient[]
}

export function Patients({ patients }: PatientsProps) {
  return (
    <div className="w-full max-w-screen-xl mx-auto bg-slate-800 border-2 border-slate-700 rounded-md p-4 mt-4">
      <div className="border-b-2 border-b-slate-600 pb-2">
        <strong className="font-bold text-xl text-slate-200">Pacientes</strong>
      </div>
      <div className="flex gap-4 flex-col py-4">
        {patients.map((patient) => {
          return <PatientCard key={patient.id} patient={patient} />
        })}
      </div>
    </div>
  )
}

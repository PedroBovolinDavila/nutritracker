import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

export function PatientCard() {
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
        src="https://github.com/pedrobovolindavila.png"
        width={120}
        height={120}
        className="rounded-md"
        alt=""
      />

      <div>
        <strong className="text-lg text-slate-300 font-bold">Paicente 1</strong>
        <p className="text-slate-300">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias
          delectus ea quia sint. Exercitationem assumenda, veritatis, mollitia
          aliquam delectus in deleniti, laboriosam nostrum rerum architecto
          veniam iste incidunt unde necessitatibus!
        </p>
      </div>
    </motion.div>
  )
}

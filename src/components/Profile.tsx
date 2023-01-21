import Image from 'next/image'
import { motion } from 'framer-motion'

interface ProfileProps {
  name: string
  avatar: string
  email: string
  x: number
}

export function Profile({ name, avatar, email, x }: ProfileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
      className=" bg-slate-800 border-2 border-slate-700 rounded-md p-4 flex flex-col"
    >
      <div className="flex flex-col items-center gap-4">
        <Image
          src={`http://localhost:3000/uploads/${avatar}`}
          width={150}
          height={150}
          alt={`Foto de perfil do doutor ${name}`}
          className="rounded-md border-2 border-slate-600"
        />
        <div className="text-center">
          <h2 className="font-semibold text-xl text-slate-300">{name}</h2>
          <p className="text-md mt-1 text-slate-400">{email}</p>
        </div>
      </div>
    </motion.div>
  )
}

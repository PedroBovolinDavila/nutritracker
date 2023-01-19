import Image from 'next/image'
import { motion } from 'framer-motion'

interface ProfileProps {
  username: string
  x: number
}

export function Profile({ username, x }: ProfileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
      className=" bg-slate-800 border-2 border-slate-700 rounded-md p-4 flex flex-col"
    >
      <div className="flex flex-col items-center gap-4">
        <Image
          src="https://github.com/pedrobovolindavila.png"
          width={80}
          height={80}
          alt=""
          className="rounded-full"
        />
        <div className="text-center">
          <h2 className="font-semibold text-xl text-slate-300">{username}</h2>
          <p className="text-md mt-1 text-slate-400">username@username.com</p>
        </div>
      </div>
    </motion.div>
  )
}

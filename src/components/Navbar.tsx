import Link from 'next/link'
import { Gear, Power } from 'phosphor-react'
import { IconButton } from './IconButton'
import { motion } from 'framer-motion'

export function Navbar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
      className="w-full max-w-screen-xl mx-auto bg-slate-800 border-2 border-slate-700 rounded-md p-4 flex items-center justify-between"
    >
      {/* Header */}
      <Link href="/" className="font-bold text-2xl text-slate-200">
        Nutri
        <span className="text-teal-400">Tracker</span>
      </Link>
      <div className="flex gap-2 text-xl text-slate-300">
        <IconButton icon={<Gear />} title="Configurações da conta" />
        <IconButton icon={<Power />} title="Sair da plataforma" />
      </div>
    </motion.div>
  )
}

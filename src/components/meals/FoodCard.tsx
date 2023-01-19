import { Scales } from 'phosphor-react'
import { motion, Variants } from 'framer-motion'

const foodCardVariants: Variants = {
  hide: {
    opacity: 0,
    y: -30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
}

export function FoodCard() {
  return (
    <motion.div
      variants={foodCardVariants}
      className="border-2 border-slate-700 hover:border-teal-400/70 transition-all w-max p-2 rounded-md text-slate-200"
    >
      <h3 className="text-md">Filé de frango</h3>
      <div className="flex text-sm gap-1 items-center mt-1">
        <Scales /> 120g
      </div>
    </motion.div>
  )
}

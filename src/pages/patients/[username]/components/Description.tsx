import { LinkButton } from '../../../../components/LinkButton'
import { motion } from 'framer-motion'

interface DescriptionProps {
  username: string
}

export function Description({ username }: DescriptionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
      className="flex-1 bg-slate-800 border-2 border-slate-700 rounded-md p-4 flex flex-col gap-8 "
    >
      <div>
        <h1 className="text-slate-200 font-semibold text-2xl">{username}</h1>
        <p className="text-slate-300 leading-relaxed mt-2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia
          reprehenderit maiores suscipit libero itaque, natus ullam tempora
          consequatur tempore amet harum placeat at unde sit temporibus ducimus
          dicta, omnis quibusdam! Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Quasi sapiente ipsa aliquid sed velit saepe
          dignissimos qui quod atque cumque pariatur, veritatis enim ex, nobis
          animi odio quis. A, dolor.
        </p>
      </div>
      <div className="flex gap-3">
        <LinkButton to="#">Adicionar dieta</LinkButton>
        <LinkButton to="#">Enviar alerta</LinkButton>
      </div>
    </motion.div>
  )
}

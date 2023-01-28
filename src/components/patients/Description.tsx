import { LinkButton } from '../LinkButton'

interface DescriptionProps {
  name: string
  content: string
  doctorView?: boolean
}

export function Description({
  name,
  content,
  doctorView = false,
}: DescriptionProps) {
  return (
    <div className="flex-1 bg-slate-800 border-2 border-slate-700 rounded-md p-4 flex flex-col gap-8 ">
      <div>
        <h1 className="text-slate-200 font-semibold text-2xl">{name}</h1>
        <p className="text-slate-300 leading-relaxed mt-2">{content}</p>
      </div>
      <div className="flex gap-3 mt-auto">
        {doctorView ? (
          <>
            <LinkButton to="#">Enviar alerta</LinkButton>
            <LinkButton to="#">Editar paciente</LinkButton>
            <LinkButton to="#">Excluir paciente</LinkButton>
          </>
        ) : (
          <>
            <LinkButton to="#">Adicionar refeição</LinkButton>
            <LinkButton to="#">Enviar mensagem para o doutor</LinkButton>
          </>
        )}
      </div>
    </div>
  )
}

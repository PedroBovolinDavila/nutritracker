import { useState } from 'react'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Navbar } from '../../components/Navbar'
import { RecipeModal } from '../../components/RecipeModal'
import { useRecipesModals } from '../../hooks/useRecipeModals'
import ReactMarkdown from 'react-markdown'
import RehypeRawPlugin from 'rehype-raw'
import { addCommunHtmlTag, TagOptions } from '../../utils/addCommunHtmlTag'
import { addListHtmlTag } from '../../utils/addLIstHtmlTag'
import { Modal } from '../../components/Modal'
import { PatientCard } from '../../components/doctor/PatientCard'
import { X } from 'phosphor-react'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { prisma } from '../../lib/prisma'
import { api } from '../../lib/axios'
import { Patient } from '../doctor'

interface CreateRecipeProps {
  patients: Patient[]
}

export default function CreateRecipe({ patients }: CreateRecipeProps) {
  const [recipe, setRecipe] = useState('')
  const [isChosePatientModalOpen, setChosePatientModalOpen] = useState(false)
  const [listElementsQuantity, setListElementsQuantity] = useState(0)
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [text, setText] = useState('')
  const [list, setList] = useState<string[]>(
    Array.from({ length: listElementsQuantity }).map(() => ' '),
  )

  function addCommunTag(tag: TagOptions, content: string) {
    setRecipe((prev) => addCommunHtmlTag(tag, content, prev))

    toggleModal('all')
  }

  function addListTag() {
    setRecipe((prev) => addListHtmlTag(list, prev))

    setListElementsQuantity(0)
    setList([])
    toggleModal('all')
  }

  const {
    isListModalOpen,
    isTextModalOpen,
    isSubtitleModalOpen,
    isTitleModalOpen,
    toggleModal,
  } = useRecipesModals()

  return (
    <div className="bg-gray-900 w-full h-screen p-4">
      <Navbar />

      <div className="flex gap-4 w-full mt-4 max-w-screen-xl mx-auto">
        <div>
          <div className="flex flex-col gap-4 bg-slate-800 border-2 border-slate-700 rounded-md p-4 h-max">
            <Button variant="secondary" onClick={() => toggleModal('title')}>
              Adicionar titulo
            </Button>
            <Button variant="secondary" onClick={() => toggleModal('subtitle')}>
              Adicionar subtitulo
            </Button>
            <Button variant="secondary" onClick={() => toggleModal('text')}>
              Adicionar texto
            </Button>
            <Button variant="secondary" onClick={() => toggleModal('list')}>
              Adicionar lista
            </Button>
          </div>
          <div className="flex flex-col gap-4 bg-slate-800 border-2 border-slate-700 rounded-md p-4 h-max mt-4">
            <Button onClick={() => setChosePatientModalOpen(true)}>
              Escolher paciente
            </Button>
            <Button onClick={() => setRecipe('')}>Limpar</Button>
          </div>
        </div>
        <div className="flex flex-1 overflow-auto flex-col gap-4 bg-slate-800 border-2 text-slate-50 border-slate-700 rounded-md p-4 h-max">
          <ReactMarkdown rehypePlugins={[RehypeRawPlugin]}>
            {recipe}
          </ReactMarkdown>
        </div>
      </div>

      <div>
        <RecipeModal
          title="Adicionar titulo"
          isOpen={isTitleModalOpen}
          inputs={() => (
            <div className="w-full flex flex-col gap-4">
              <Input
                placeholder="Informe o titulo que deseja adicionar"
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="flex gap-2">
                <Button onClick={() => addCommunTag('h1', title)}>
                  Adicionar
                </Button>
                <Button
                  onClick={() => toggleModal('title')}
                  variant="secondary"
                  small
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        />

        <RecipeModal
          title="Adicionar subtitulo"
          isOpen={isSubtitleModalOpen}
          inputs={() => (
            <div className="w-full flex flex-col gap-4">
              <Input
                placeholder="Informe o subtitulo que deseja adicionar"
                onChange={(e) => setSubtitle(e.target.value)}
              />
              <div className="flex gap-2">
                <Button onClick={() => addCommunTag('h2', subtitle)}>
                  Adicionar
                </Button>
                <Button
                  onClick={() => toggleModal('subtitle')}
                  variant="secondary"
                  small
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        />

        <RecipeModal
          title="Adicionar texto"
          isOpen={isTextModalOpen}
          inputs={() => (
            <div className="w-full flex flex-col gap-4">
              <Input
                placeholder="Informe o text que deseja adicionar"
                onChange={(e) => setText(e.target.value)}
              />
              <div className="flex gap-2">
                <Button onClick={() => addCommunTag('p', text)}>
                  Adicionar
                </Button>
                <Button
                  onClick={() => toggleModal('text')}
                  variant="secondary"
                  small
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        />

        <RecipeModal
          title="Adicionar lista"
          isOpen={isListModalOpen}
          inputs={() => (
            <div className="w-full flex flex-col gap-6">
              <Input
                placeholder="Informe o titulo que deseja adicionar"
                onChange={(e) =>
                  setListElementsQuantity(Number(e.target.value))
                }
              />

              <div className="flex flex-col gap-2">
                {Array.from({ length: listElementsQuantity }).map(
                  (_, index) => (
                    <Input
                      key={index}
                      placeholder="Informe o texto"
                      onChange={(e) =>
                        setList((prev) => {
                          prev[index] = e.target.value
                          return prev
                        })
                      }
                    />
                  ),
                )}
              </div>

              <div className="flex gap-2">
                <Button onClick={addListTag}>Adicionar</Button>
                <Button
                  onClick={() => toggleModal('list')}
                  variant="secondary"
                  small
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        />
      </div>

      <Modal isOpen={isChosePatientModalOpen} large>
        <h1 className="text-2xl text-slate-200 font-bold mb-8">
          Informe o paciente que ira receber a receita
        </h1>

        <button
          className="text-slate-400 absolute top-4 right-4"
          onClick={() => setChosePatientModalOpen(false)}
        >
          <X size={24} />
        </button>

        <div className="overflow-auto h-96 flex flex-col gap-4 pr-1">
          {patients.map((patient) => {
            return <PatientCard key={patient.id} patient={patient} />
          })}
        </div>
      </Modal>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { '@nutritracker-auth': token } = parseCookies({ req })

  if (!token) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  const { data } = await api.post('http://localhost:3000/api/validate-token', {
    token,
  })

  if (data.role !== 'doctor') {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  const doctor = await prisma.doctor.findUnique({
    where: {
      id: data.id,
    },
    include: {
      patients: true,
    },
  })

  if (!doctor) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  return {
    props: {
      patients: JSON.parse(JSON.stringify(doctor.patients)),
    },
  }
}

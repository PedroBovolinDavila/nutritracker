import { z } from 'zod'
import { Button } from '../Button'
import { Input } from '../Input'
import { Modal } from '../Modal'
import { TextArea } from '../TextArea'
import { useForm, useFieldArray } from 'react-hook-form'
import { IconButton } from '../IconButton'
import { Plus } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

const createMealFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Informe um titulo para a sua refeição.' }),
  description: z
    .string()
    .min(10, { message: 'Sua descrição deve ter no minimo 10 caracteres.' }),
  image: z.any(),
  ingredients: z
    .array(
      z.object({
        name: z.string(),
        weight: z.number(),
      }),
    )
    .min(1),
})

const addIngredientFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Informe um nome para a seu ingrediente.' }),
  weight: z.string().transform((weight) => Number(weight)),
})

type CreateMealFormData = z.infer<typeof createMealFormSchema>
type AddIngredientFormData = z.infer<typeof addIngredientFormSchema>

interface CreateMealModalProps {
  isOpen: boolean
  closeModal: () => void
}

export function CreateMealModal({ isOpen, closeModal }: CreateMealModalProps) {
  const [isAddIngredientModalOpen, setIsAddIngredientModalOpen] =
    useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateMealFormData>({
    resolver: zodResolver(createMealFormSchema),
  })

  const {
    register: ingredientFormRegister,
    handleSubmit: ingredientFormHandleSubmit,
    reset: ingredientFormReset,
    formState: { errors: ingredientFormErrors },
  } = useForm<AddIngredientFormData>({
    resolver: zodResolver(addIngredientFormSchema),
  })

  const { fields, append } = useFieldArray({
    name: 'ingredients',
    rules: {
      minLength: 1,
    },
    control,
  })

  function handleCreateMeal(formData: CreateMealFormData) {
    console.log(formData)
  }

  function handleAddIngredient(formData: AddIngredientFormData) {
    append({
      name: formData.name,
      weight: formData.weight,
    })
    setIsAddIngredientModalOpen(false)
    ingredientFormReset()
  }

  return (
    <>
      <Modal isOpen={isOpen} large>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <Input
              placeholder="Titulo"
              errorMessage={errors.title?.message}
              {...register('title')}
            />
            <TextArea
              placeholder="Descrição da comida"
              errorMessage={errors.description?.message}
              {...register('description')}
            />
            <Input
              type="file"
              errorMessage={errors.image?.message as string}
              {...register('image')}
            />
          </div>
          <div>
            <div className="flex items-center justify-between text-slate-200">
              <strong className="text-lg font-bold">Ingredientes</strong>

              <IconButton
                icon={<Plus />}
                title="Adicionar ingrediente"
                onClick={() => setIsAddIngredientModalOpen(true)}
              />
            </div>
            <div className="flex flex-col gap-2 mt-2">
              {fields.map((field) => (
                <div
                  key={field.id}
                  className="flex items-center justify-between p-2 bg-slate-900 border-2 border-slate-600 rounded-md"
                >
                  <p className="text-slate-200 font-bold">{field.name}</p>
                  <p className=" text-slate-300">{field.weight}g</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSubmit(handleCreateMeal)}>Cadastrar</Button>
          <Button variant="secondary" small onClick={closeModal}>
            Cancelar
          </Button>
        </div>
      </Modal>

      <Modal isOpen={isAddIngredientModalOpen} small>
        <div className="flex flex-col gap-2 mb-4">
          <Input
            placeholder="Nome do ingrediente"
            errorMessage={ingredientFormErrors.name?.message}
            {...ingredientFormRegister('name')}
          />
          <Input
            placeholder="Peso (em gramas)"
            type="number"
            errorMessage={ingredientFormErrors.weight?.message}
            {...ingredientFormRegister('weight')}
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={ingredientFormHandleSubmit(handleAddIngredient)}>
            Adicionar
          </Button>
          <Button
            variant="secondary"
            onClick={() => setIsAddIngredientModalOpen(false)}
            small
          >
            Cancelar
          </Button>
        </div>
      </Modal>
    </>
  )
}

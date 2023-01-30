import { NextApiRequest, NextApiResponse } from 'next'
import { z, ZodError } from 'zod'
import { prisma } from '../../../lib/prisma'

const createMealBodySchema = z.object({
  title: z.string().min(1, { message: 'Informe um titulo' }),
  description: z.string().min(1, { message: 'Informe uma descrição' }),
  patientId: z.string().uuid().min(1, { message: 'Informe um id' }),
  ingredients: z.array(
    z.object({
      name: z.string(),
      weight: z.number(),
    }),
  ),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  try {
    const { description, ingredients, patientId, title } =
      createMealBodySchema.parse(req.body)

    const meal = await prisma.meal.create({
      data: {
        description,
        title,
        ingredients,
        patient_id: patientId,
      },
    })

    return res.json({
      meal,
    })
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        message: err.issues[0].message,
      })
    } else {
      return res.status(500).json({
        message: 'Internal server error',
      })
    }
  }
}

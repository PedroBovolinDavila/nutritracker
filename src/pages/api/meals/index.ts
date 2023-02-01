import multer from 'multer'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { z, ZodError } from 'zod'
import { prisma } from '../../../lib/prisma'
import { storage } from '../../../lib/storage'

const createMealBodySchema = z.object({
  title: z.string().min(1, { message: 'Informe um titulo' }),
  description: z.string().min(1, { message: 'Informe uma descrição' }),
  patientId: z.string().uuid().min(1, { message: 'Informe um id' }),
  ingredients: z
    .array(
      z.object({
        name: z.string(),
        weight: z.string().transform((weight) => Number(weight)),
      }),
    )
    .min(1),
})

const upload = multer({ storage })

const apiRoute = nextConnect({
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    return res.status(405).end()
  },
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` })
  },
})

apiRoute.use(upload.single('image'))

interface Req extends NextApiRequest {
  file: {
    filename: string
  }
}

apiRoute.post(async (req: Req, res: NextApiResponse) => {
  try {
    const { description, ingredients, patientId, title } =
      createMealBodySchema.parse(req.body)

    const { filename } = req.file

    if (!filename) {
      return res.status(400).json({
        message: 'Informe uma imagem para sua refeição.',
      })
    }

    const meal = await prisma.meal.create({
      data: {
        description,
        title,
        ingredients,
        image_url: filename,
        patient_id: patientId,
      },
    })

    return res.status(201).json({
      mealId: meal.id,
    })
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        message: 'Infome uma imagem para sua refeição',
      })
    } else {
      return res.status(400).json({
        message: 'Infome uma imagem para sua refeição',
      })
    }
  }
})

export default apiRoute

export const config = {
  api: {
    bodyParser: false,
  },
}

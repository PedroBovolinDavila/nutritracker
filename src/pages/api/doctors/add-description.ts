import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'

const addDescriptionBodySchema = z.object({
  description: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({
      message: `HTTP method ${req.method} is not allowed`,
    })
  }

  const { description } = addDescriptionBodySchema.parse(req.body)
  const id = String(req.query.doctorId)

  if (!id) {
    return res.status(400).json({
      message: `Id is missing`,
    })
  }

  await prisma.doctor.update({
    where: { id },
    data: {
      description,
    },
  })

  return res.status(200).end()
}

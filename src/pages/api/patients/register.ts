import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'
import { hash } from 'bcrypt'

const registerPatientBodySchema = z.object({
  username: z.string(),
  password: z.string(),
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

  const { username, password } = registerPatientBodySchema.parse(req.body)
  const id = String(req.query.patientId)

  if (!id) {
    return res.status(400).json({
      message: `Id is missing`,
    })
  }

  const patientExists = await prisma.patients.findUnique({
    where: { username },
  })

  if (patientExists) {
    return res.status(400).json({
      message: `Username ${username} alredy taken`,
    })
  }

  const hashedPassword = await hash(password, 8)

  await prisma.patients.update({
    where: { id },
    data: {
      username,
      password: hashedPassword,
    },
  })

  return res.status(200).end()
}

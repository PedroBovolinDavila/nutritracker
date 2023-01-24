import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const username = String(req.query.username)

  if (!username) {
    return res.status(400).json({
      message: 'Username is missing.',
    })
  }

  const doctor = await prisma.doctor.findUnique({
    where: { username },
  })

  return res.json({
    content: { doctor },
  })
}

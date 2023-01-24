import { verify } from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

interface Payload {
  role: string
  sub: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { token } = req.body

  if (!token) {
    return res.status(400).json({
      message: 'Missing data',
    })
  }

  const { role, sub } = verify(token, '123123') as Payload

  return res.json({
    role,
    id: sub,
  })
}

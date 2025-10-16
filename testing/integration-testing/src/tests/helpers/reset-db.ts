// to clear db between test suits
// say
// addition test suite
// multiplication test suite

import { PrismaClient } from '../../generated/prisma'

const prisma = new PrismaClient()

export default async () => {
  await prisma.$transaction([
    prisma.request.deleteMany(),
  ])
}
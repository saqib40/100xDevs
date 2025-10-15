// this is what we are mocking
// a prisma client

// this is an approach that we will take many times
// we define an external service in a seperate file
// then we import it in actual file for work
// and mock out in test file presuming that extenal service won't fail

import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient();
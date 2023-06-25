// import { z } from "zod";
// // import { db } from "./db";
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()
// import { publicProcedure, router } from "./trpc";


// export const userRouter = router({

    
// })

import { z } from 'zod';
import { PrismaClient } from '@prisma/client'
 const prisma = new PrismaClient()
import { router, publicProcedure } from './trpc';

export const userRouter = router({
  getUser: publicProcedure
  .input(z.number())
  .query(async (opts) => {
    const { input } = opts;
    const user = await prisma.user.findUnique({
      where: {
        id: input
      },
      select: {
        name: true,
        email: true,
      },
    });
    return user;
  }),
  
  
});

export type UserRouter = typeof userRouter;



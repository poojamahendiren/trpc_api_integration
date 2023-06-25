// import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";
// import { db } from "./db";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { publicProcedure, router } from "./trpc";


export const libraryRouter = router({
  bookList: publicProcedure
    .query(async () => {
      const users = await prisma.book.findMany();
      return users;
    }),
  bookById: publicProcedure
    .input(z.number())
    .query(async (opts) => {
      const { input } = opts;
      const user = await prisma.book.findUnique({
        where:{
          id:input
        }
      });
      return user;
    }),
  bookCreate: publicProcedure
    .input(z.object({ title: z.string() ,author: z.string() ,price: z.number() ,quantity: z.number()}))
    .mutation(async (opts) => {
      const { title,author,price,quantity } = opts.input;
      const user = await prisma.book.create({data:{ title ,author,price,quantity}});
      return user;
    }),
   
    
});
 

import { z } from "zod";
// import { db } from "./db";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { publicProcedure, router } from "../trpc";


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
   bookDelete:publicProcedure
     .input(z.number())
     .mutation(async (opts) => {
        const { input } = opts;
        const user = await prisma.book.delete({
          where:{
            id:input
          }
        });
        return user;
      }),

    bookUpdate: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        author: z.string(),
        price: z.number(),
        quantity: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { id, title, author, price, quantity } = opts.input;
      const updatebook = await prisma.book.update({
        where: { id },
        data: { title, author, price, quantity },
      });
      return updatebook;
    }) ,

    bookListByPriceRange: publicProcedure
    .input(z.object({
      minPrice: z.number().optional(),
      maxPrice: z.number().optional(),
    }))
    .query(async (opts) => {
      const { minPrice, maxPrice } = opts.input;
      let books;

      if (minPrice !== undefined && maxPrice !== undefined) {
        books = await prisma.book.findMany({
          where: {
            AND: [
              { price: { gte: minPrice } },
              { price: { lte: maxPrice } }
            ]
          },
        });
      } else {
        books = await prisma.book.findMany();
      }

      return { books, message: 'Got the book names' };
      
    }),

    bookAuthor : publicProcedure.input(z.string()).query(async (opts) => {
      const {input} = opts;
      const bookAuthor = await prisma.book.findMany({where: {author:{contains:input}}})
      return bookAuthor;
    })

    
    
});
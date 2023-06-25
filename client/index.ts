import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server/main';
//     👆 **type-only** import
 
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});

// async function user() {
//     const userList= await trpc.bookCreate.mutate( { name: "pooja", email: "pooja@gmail.com" })
//     console.log(userList)
//     const userById = await trpc.bookById.query(1)
//     console.log(userById)
// }

// user()
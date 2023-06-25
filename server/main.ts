import { userRouter } from './routers/userRouter';
import { libraryRouter } from './routers/libraryRouter';
import { router } from './trpc';

export const appRouter = router({
  library: libraryRouter, 
  user: userRouter, 
});
 

 
export type AppRouter = typeof appRouter;
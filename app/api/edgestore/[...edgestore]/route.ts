import { auth } from '@/auth';
import { initEdgeStore } from '@edgestore/server';
import { CreateContextOptions, createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { z } from 'zod';


const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
    publicFiles: es.fileBucket({
      accept: ['image/*', 'video/*', 'application/pdf'],
      maxSize: 1024 * 1024 * 10, // 10MB
    }).input(z.object({type: z.enum(['asset', 'profile', 'wallpaper'])})).path(({input}) => [{type: input.type}]),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

export { handler as GET, handler as POST };

export type EdgeStoreRouter = typeof edgeStoreRouter;
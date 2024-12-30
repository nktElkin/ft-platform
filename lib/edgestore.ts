// 'use client';

// import { type EdgeStoreRouter } from '../app/api/adgestore/[...edgestore]/route';
// import { createEdgeStoreProvider } from '@edgestore/react';

// const { EdgeStoreProvider, useEdgeStore } = createEdgeStoreProvider<EdgeStoreRouter>();

// export { EdgeStoreProvider, useEdgeStore };


'use client';

import { type EdgeStoreRouter } from '../app/api/edgestore/[...edgestore]/route';
import { createEdgeStoreProvider } from '@edgestore/react';

const { EdgeStoreProvider, useEdgeStore } =
  createEdgeStoreProvider<EdgeStoreRouter>({
    maxConcurrentUploads: 2,
  });

export { EdgeStoreProvider, useEdgeStore };
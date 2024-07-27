import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { IncomingMessage, ServerResponse } from 'http';

function crossOriginIsolationMiddleware(req: IncomingMessage, res: ServerResponse, next: () => void) {
  if (!req.url?.includes("/src/Assets/Shorts")) {
    res.removeHeader("Cross-Origin-Opener-Policy");
    res.removeHeader("Cross-Origin-Embedder-Policy");
  } else {
    res.appendHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.appendHeader("Cross-Origin-Embedder-Policy", "require-corp");
  }
  next();
}

const crossOriginIsolation: Plugin = {
  name: 'cross-origin-isolation',
  configureServer: (server) => {
    server.middlewares.use(crossOriginIsolationMiddleware);
  },
  configurePreviewServer: (server) => {
    server.middlewares.use(crossOriginIsolationMiddleware);
  },
};

export default defineConfig({
  plugins: [react()],
  server: {
    port: 6767,
  },
  preview: {
    port: 6767,
  },
});

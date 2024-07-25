import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { IncomingMessage, ServerResponse } from 'http';

function crossOriginIsolationMiddleware(req: IncomingMessage, res: ServerResponse, next: () => void) {
  if (req.url && req.url === "/src/Assets/Shorts/Hooks.tsx") {
    console.log(req.url)
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin"); 
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  } else {
    res.removeHeader("Cross-Origin-Opener-Policy");
    res.removeHeader("Cross-Origin-Embedder-Policy");
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
  plugins: [react(),crossOriginIsolation],
  server: {
    port: 6767,
  },
  preview: {
    port: 6767,
  },
});

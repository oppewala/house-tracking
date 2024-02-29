import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    // depending on your application, base can also be "/"
    base: '/',
    plugins: [react(), viteTsconfigPaths(),
        svgr({
          include: '**/*.svg?react',
        }),],
    server: {    
        // this ensures that the browser opens upon server start
        open: true,
        // this sets a default port to 3000  
        port: 3000, 
    },
    // test: {
    //   globals: true,
    //   environment: 'jsdom',
    //   setupFiles: './src/setupTests.ts',
    //   css: true,
    //   reporters: ['verbose'],
    //   coverage: {
    //     reporter: ['text', 'json', 'html'],
    //     include: ['src/**/*'],
    //     exclude: [],
    //   }
    // },
})
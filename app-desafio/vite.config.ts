import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      plugins: [visualizer()],
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@mui/material')) {
              return 'mui-material';
            }
            if (id.includes('@mui/x-date-pickers')) {
              return 'mui-date-pickers';
            }
            if (id.includes('react-router-dom')) {
              return 'react-router-dom';
            }
            if (id.includes('react-dom')) {
              return 'react-dom';
            }
            return 'vendor';
          }
        },
      },
    }
  },
})

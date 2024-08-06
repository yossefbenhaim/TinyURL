import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    return {
        plugins: [react(), tsconfigPaths()],
        server: {
            port: parseInt(env.VITE_PORT) || 3000,
            proxy: {
                '/api': 'http://localhost:5000',
            },
        },
        define: {
            'process.env': process.env,
        },
    };
});

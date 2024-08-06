import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return {
        plugins: [react(), tsconfigPaths()],
        server: {
            port: 3000,
        },
        define: {
            'process.env': process.env,
        },
    };
});

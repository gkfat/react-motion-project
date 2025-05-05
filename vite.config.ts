/// <reference types="vitest/config" />

import {
    fileURLToPath,
    URL,
} from 'node:url';

import { defineConfig } from 'vite';
// @ts-expect-error temporary workaround for missing types
import eslint from 'vite-plugin-eslint';

import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), eslint()],
    envDir: './',
    resolve: {
        alias: [
            {
                find: '@',
                replacement: fileURLToPath(new URL('./src', import.meta.url)), 
            },
        ],
        extensions: [
            '.js',
            '.json',
            '.jsx',
            '.mjs',
            '.ts',
            '.tsx',
        ],
    },
});

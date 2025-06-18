import { defineConfig, type AliasOptions } from 'vite'
import vue from '@vitejs/plugin-vue'

// @ts-ignore
import path from 'path'
// @ts-ignore
const root = path.resolve(__dirname, "src");

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    base: "/letter-jam-solver/",
    resolve: {
        alias: {
            '@': root
        } as AliasOptions
    }
})

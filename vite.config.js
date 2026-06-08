import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// VITE_BASE_PATH é injetado pelo GitHub Actions (ex.: /contaviva-edu/).
// Localmente (npm run dev) não precisa definir — usa "/" por padrão.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/",
});

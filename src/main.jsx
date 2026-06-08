import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

/* ----------------------------------------------------------------------------
   Shim de window.storage
   O componente usa window.storage (API do sandbox de artefatos Claude).
   Localmente, mapeamos essa API para o localStorage do navegador.
   O progresso dos exercícios fica salvo entre sessões automaticamente.
---------------------------------------------------------------------------- */
if (!window.storage) {
  window.storage = {
    async get(key) {
      const value = localStorage.getItem(key);
      if (value === null) throw new Error("storage: chave não encontrada — " + key);
      return { key, value, shared: false };
    },
    async set(key, value) {
      localStorage.setItem(key, String(value));
      return { key, value, shared: false };
    },
    async delete(key) {
      localStorage.removeItem(key);
      return { key, deleted: true, shared: false };
    },
    async list(prefix = "") {
      const keys = Object.keys(localStorage).filter((k) => k.startsWith(prefix));
      return { keys, prefix, shared: false };
    },
  };
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

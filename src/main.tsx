import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

// The mock server is the only backend, including on GitHub Pages
async function startApp() {
  const { worker } = await import("./mocks/server");
  await worker.start({
    serviceWorker: {
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
    },
    onUnhandledRequest: "bypass",
  });

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

startApp();

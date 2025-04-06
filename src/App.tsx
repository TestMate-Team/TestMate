import "./App.css";

import { BrowserRouter } from "react-router-dom";

import { Header } from "@/components/layout/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen items-center">
        <div className="max-w-md mx-auto w-full shadow-md"></div>
        <Header />
        <main className="pt-16">
          <h1>Vite + React</h1>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

import "./App.css";

import { BrowserRouter } from "react-router-dom";

import { Header } from "@/components/layout/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen items-center bg-white">
        {/* モバイルでは最大幅448px、タブレットでは640px、デスクトップでは768pxに設定 */}
        <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl shadow-md relative">
          <Header />
          <main className="pt-16 md:pt-20 px-4">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
              Vite + React
            </h1>
            {/* ここに他のコンテンツ */}
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

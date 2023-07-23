import { BrowserRouter, Routes, Route } from "react-router-dom";
import Geo from "./components/Geo";
import Weather from "./components/Weather";

function App() {
  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-800 p-4 min-h-screen h-full">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Geo />} />
            <Route path="/weather" element={<Weather />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

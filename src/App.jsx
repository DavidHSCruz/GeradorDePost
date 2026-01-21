import { Route, Routes, BrowserRouter } from "react-router-dom";
import { TemplateProvider } from "./context/templateContext";
import ImageEditor from "./pages/ImageEditor";
import Templates from "./pages/Templates";
import CardGenerator from "./components/CardGenerator";


function App() {
  
  return (
    <BrowserRouter>
      <TemplateProvider>
        <Routes>
          <Route index element={<Templates />}/>
          <Route path="/edit" element={<ImageEditor />}/>
          <Route path="/generate" element={<CardGenerator />}/>
        </Routes>
      </TemplateProvider>
    </BrowserRouter>
  )
}

export default App

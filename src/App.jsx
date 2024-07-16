import { Route, Routes, BrowserRouter } from "react-router-dom";
import { TemplateProvider } from "./context/templateContext";
import ImageEditor from "./pages/ImageEditor";
import Templates from "./pages/Templates";


function App() {
  
  return (
    <BrowserRouter>
      <TemplateProvider>
        <Routes>
          <Route index element={<Templates />}/>
          <Route path="/edit" element={<ImageEditor />}/>
        </Routes>
      </TemplateProvider>
    </BrowserRouter>
  )
}

export default App

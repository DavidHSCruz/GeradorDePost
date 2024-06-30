import ImageEditor from "./components/ImageEditor";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Templates from "./components/Templates";
import { TemplateProvider } from "./context/templateContext";


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

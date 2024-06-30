import { useState, useContext, createContext } from "react"

const TemplateContext = createContext()

export function TemplateProvider({ children }) {
    const [ template, setTemplate ] = useState(undefined)

    return <TemplateContext.Provider value={{ template, setTemplate }}>{ children }</TemplateContext.Provider>
}

export function useTemplateData() {
    return useContext(TemplateContext)
}

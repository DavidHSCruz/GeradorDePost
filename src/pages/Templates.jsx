import { useTemplateData } from "../context/templateContext";
import { CardTemplate } from "../components/CardTemplate";

const Templates = () => {
    const { setTemplate } = useTemplateData()
    const templates = ['principal', 'template1', 'template2', 'template3', 'template4']
    return (
        <section className="text-center text-xl font-roboto m-5 min-h-screen flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-8 text-preto">Selecione seu template</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full px-4">
                {templates.map((template, i) => {
                    return(
                        <div key={i} className="transform hover:scale-105 transition-transform duration-300">
                            <CardTemplate 
                                to={template === 'principal' && '/generate' || '/edit'}
                                template={`/imagens/templates/${template}.png`}
                                setTemplate={setTemplate}
                            />
                        </div>
                    )
                }
                )}
            </ul>
        </section>
    );
}

export default Templates;

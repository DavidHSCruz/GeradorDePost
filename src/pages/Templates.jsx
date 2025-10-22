import { useTemplateData } from "../context/templateContext";
import { CardTemplate } from "../components/CardTemplate";

const Templates = () => {
    const { setTemplate } = useTemplateData()
    const templates = ['TestPost', 'template1', 'template2', 'template3', 'template4']
    return (
        <section className=" text-center text-xl font-roboto m-5">
            <h2>Selecione seu template</h2>
            <ul className="flex flex-col items-center gap-5 mt-5">
                {templates.map((template, i) => {
                    if(template === 'TestPost') {
                        return (
                            <div key={i} className="bg-preto px-5 pb-5">
                                <p className="p-2 text-cinza">TEMPLATE EM TESTE</p>
                                <CardTemplate
                                    to='/test'
                                    template={`/imagens/templates/${template}.png`}
                                    setTemplate={setTemplate}
                                />
                            </div>
                        )
                    }
                    return(
                        <CardTemplate 
                            key={i}
                            template={`/imagens/templates/${template}.png`}
                            setTemplate={setTemplate}
                        />
                    )
                }
                )}
            </ul>
        </section>
    );
}

export default Templates;

import { useTemplateData } from "../context/templateContext";
import { CardTemplate } from "../components/CardTemplate";

const Templates = () => {
    const { setTemplate } = useTemplateData()
    const templates = ['template1', 'template2', 'template3', 'template4']
    return (
        <section className=" text-center font-black m-5">
            <h2>Selecione seu template</h2>
            <ul className="grid grid-cols-1 gap-5 mt-5">
                {templates.map((template, i) => 
                    <CardTemplate 
                        key={i}
                        template={`../../public/imagens/templates/${template}.png`}
                        setTemplate={setTemplate}
                    />
                )}
            </ul>
        </section>
    );
}

export default Templates;

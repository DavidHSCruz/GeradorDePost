import template1 from '../assets/imagens/template1.png'
import template2 from '../assets/imagens/template2.png'
import { useTemplateData } from "../context/templateContext";
import { CardTemplate } from "../components/CardTemplate";

const Templates = () => {
    const { setTemplate } = useTemplateData()

    return (
        <section className=" text-center font-black m-5">
            <h2>Selecione seu template</h2>
            <ul className="grid grid-cols-1 gap-5 mt-5">
                <CardTemplate template={template1} setTemplate={setTemplate} />
                <CardTemplate template={template2} setTemplate={setTemplate} />
            </ul>
        </section>
    );
}

export default Templates;

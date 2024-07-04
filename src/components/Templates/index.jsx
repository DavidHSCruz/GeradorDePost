import { Link } from "react-router-dom";
import template1 from '../../assets/imagens/template1.png'
import template2 from '../../assets/imagens/template2.png'
import template3 from '../../assets/imagens/template3.png'
import template4 from '../../assets/imagens/template4.png'
import { useTemplateData } from "../../context/templateContext";

const Templates = () => {
    const { setTemplate } = useTemplateData()

    return (
        <section className=" text-center font-black m-5">
            <h2>Selecione seu template</h2>
            <ul className="grid grid-cols-1 gap-5 mt-5">
                <li onClick={() => setTemplate(template1)}>
                    <Link to='/edit'>
                        <img src={template1} alt="" className=" brightness-90 hover:brightness-100"/>
                    </Link>
                </li>
                <li onClick={() => setTemplate(template2)}>
                    <Link to='/edit'>
                        <img src={template2} alt="" className=" brightness-90 hover:brightness-100"/>
                    </Link>
                </li>
                <li onClick={() => setTemplate(template3)}>
                    <Link to='/edit'>
                        <img src={template3} alt="" className=" brightness-90 hover:brightness-100"/>
                    </Link>
                </li>
                <li onClick={() => setTemplate(template4)}>
                    <Link to='/edit'>
                        <img src={template4} alt="" className=" brightness-90 hover:brightness-100"/>
                    </Link>
                </li>
            </ul>
        </section>
    );
}

export default Templates;

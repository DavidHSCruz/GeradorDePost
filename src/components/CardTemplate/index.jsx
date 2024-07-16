import { Link } from "react-router-dom";


export const CardTemplate = ({ template, setTemplate }) => {
    return (
        <li onClick={() => setTemplate(template)}>
            <Link to='/edit'>
                <img src={template} alt="" className=" brightness-90 hover:brightness-100"/>
            </Link>
        </li>
    );
}
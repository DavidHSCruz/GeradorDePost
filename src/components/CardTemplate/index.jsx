/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";


export const CardTemplate = ({ template, setTemplate, to, className }) => {
    return (
        <li className={className} onClick={() => setTemplate(template)}>
            <Link to={to || '/edit'}>
                <img src={template} alt="" className=" brightness-90 hover:brightness-100"/>
            </Link>
        </li>
    );
}
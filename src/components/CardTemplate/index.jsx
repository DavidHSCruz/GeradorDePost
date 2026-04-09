/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export const CardTemplate = ({ template, name, setTemplate, to, className }) => {
    return (
        <li className={className} onClick={() => setTemplate(template)}>
            <Link to={to} className="w-full h-full flex flex-col">
                <div className="relative overflow-hidden flex-1 bg-slate-100/50">
                    <img
                        src={template}
                        alt={name || "Template"}
                        className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors duration-300" />
                </div>
                {name && (
                    <div className="p-5 border-t border-slate-100 bg-white flex items-center justify-between">
                        <span className="font-semibold text-slate-800">{name}</span>
                        <span className="text-sm font-medium text-indigo-600 opacity-0 transform translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            Usar modelo &rarr;
                        </span>
                    </div>
                )}
            </Link>
        </li>
    );
}
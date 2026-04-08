import { useTemplateData } from "../context/templateContext";
import { CardTemplate } from "../components/CardTemplate";

const Templates = () => {
    const { setTemplate } = useTemplateData()

    // Mapeamento dos templates com nomes para exibição
    const templates = [
        { id: 'templateCard1', name: 'Novo Layout (Versão Beta)' },
        { id: 'templateCard0', name: 'Layout Principal' },
        // { id: 'templateCard2', name: 'Estilo Moderno' },
        // { id: 'templateCard3', name: 'Aparência Elegante' },
        { id: 'template1', name: 'Design Clássico' },
        { id: 'template2', name: 'Estilo Moderno' },
        { id: 'template3', name: 'Aparência Elegante' },
        { id: 'template4', name: 'Formato Minimalista' }
    ]

    return (
        <section className="relative min-h-screen bg-slate-50 flex flex-col items-center py-20 px-4 sm:px-6 lg:px-8 font-roboto overflow-hidden">
            {/* Elementos decorativos de fundo suaves (estilo SaaS) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none flex justify-center z-0">
                <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-3xl mix-blend-multiply"></div>
                <div className="absolute top-1/4 -right-24 w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-3xl mix-blend-multiply"></div>
            </div>

            <div className="relative z-10 text-center mb-16">
                <h2 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 sm:text-5xl mb-6">
                    Catálogo de Templates
                </h2>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                    Escolha o design perfeito para o seu consórcio. Modelos criados por profissionais para engajar seus clientes e maximizar seus resultados.
                </p>
            </div>

            <ul className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl w-full">
                {templates.map((tpl, i) => (
                    <CardTemplate
                        key={i}
                        to={tpl.id.startsWith('templateCard') ? '/generate' : '/edit'}
                        template={`/imagens/templates/${tpl.id}.png`}
                        name={tpl.name}
                        setTemplate={setTemplate}
                        className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-sm hover:shadow-2xl hover:shadow-indigo-900/10 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer list-none flex flex-col"
                    />
                ))}
            </ul>
        </section>
    );
}

export default Templates;

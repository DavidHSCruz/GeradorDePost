import { ImageMenu } from "../ImageMenu"

export const CardForm = ({ 
    inf, 
    setInf, 
    check, 
    setCheck, 
    inputs, 
    tipos, 
    color,
    selectedIMG, 
    setSelectedIMG 
}) => {
    
    function checkInput(name) {
        if (Object.keys(check).includes(name)) {
            return (
                <div className="flex items-center mr-2">
                    <input 
                        type="checkbox" 
                        className="w-4 h-4 text-vermelho bg-gray-100 border-gray-300 rounded focus:ring-vermelho focus:ring-2 cursor-pointer accent-vermelho"
                        checked={check[name]} 
                        onChange={() => setCheck({ ...check, [name]: !check[name] })} 
                    />
                </div>
            )
        }
        return null
    }

    return (
        <section className="bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl mx-auto border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Editar Informações</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Select Tipo */}
                <div className="flex flex-col group">
                    <label className="text-gray-600 text-sm font-medium mb-1 ml-1" htmlFor='tipo'>Tipo de Consórcio</label>
                    <div className="relative">
                        <select 
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-vermelho focus:border-vermelho block p-2.5 outline-none transition-all hover:bg-gray-100" 
                            name="tipo"
                            value={inf.tipo} 
                            onChange={(e) => setInf({...inf, tipo: e.target.value})}
                        >
                            <option value="selecione">Selecione...</option>
                            {Object.keys(tipos).map((tipo, i) => {
                                const t = tipo === 'servico' ? 'serviço' : tipo
                                return(
                                    <option 
                                        key={i}
                                        value={t}
                                    >{t}</option>
                                )}
                            )}
                        </select>
                    </div>
                </div>

                <div className="flex flex-col group">
                    <label className="text-gray-600 text-sm font-medium mb-1 ml-1" htmlFor='tipo'>Cor de destaque</label>
                    <div className="relative">
                        <select 
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-vermelho focus:border-vermelho block p-2.5 outline-none transition-all hover:bg-gray-100" 
                            name="color"
                            value={inf.color} 
                            onChange={(e) => setInf({...inf, color: e.target.value})}
                        >
                            <option value="selecione">Selecione...</option>
                            {Object.keys(color).map((c, i) => (
                                <option 
                                    key={i}
                                    value={c}
                                >{c}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* Inputs Dinâmicos */}
                {Object.keys(inf).map((name, i) => {
                    if (name === 'tipo' || name === 'color') return null

                    if (name === 'maisParcelasValor') return null

                    if (name === 'maisParcelasNum') {
                        const checkName = 'maisParcelasDe'
                        const isChecked = check[checkName]
                        const checkDisabled = !isChecked
                        
                        return (
                            <div key={i} className={`flex flex-col group ${checkDisabled ? 'opacity-50' : ''}`}>
                                <div className="flex items-center mb-1 ml-1">
                                    {checkInput(checkName)}
                                    <label className={`text-sm font-medium ${checkDisabled ? 'text-gray-400' : 'text-gray-600'}`} htmlFor={name}>
                                        Mais Parcelas
                                    </label>
                                </div>
                                
                                <div className={`flex gap-2 relative transition-all duration-200 ${checkDisabled ? 'grayscale' : ''}`}>
                                    <div className="w-1/3">
                                        <input
                                            className={`
                                                w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                                focus:ring-vermelho focus:border-vermelho block p-2.5 outline-none
                                                disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors
                                                placeholder-gray-400
                                            `}
                                            type="text"
                                            value={inf.maisParcelasNum}
                                            disabled={checkDisabled}
                                            placeholder="Nº"
                                            onChange={(e) => setInf({...inf, maisParcelasNum: e.target.value})}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            className={`
                                                w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                                focus:ring-vermelho focus:border-vermelho block p-2.5 outline-none
                                                disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors
                                                placeholder-gray-400
                                            `}
                                            type="text"
                                            value={inf.maisParcelasValor}
                                            disabled={checkDisabled}
                                            placeholder="Valor (R$)"
                                            onChange={(e) => setInf({...inf, maisParcelasValor: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    if (!inputs[i]) return null 
                    const { name: inputName, placeholder } = inputs[i]
                    
                    const checkDisabled = Object.keys(check).includes(name) && !check[name]

                    return(
                        <div key={i} className={`flex flex-col group ${checkDisabled ? 'opacity-50' : ''}`}>
                            <div className="flex items-center mb-1 ml-1">
                                {checkInput(name)}
                                <label className={`text-sm font-medium ${checkDisabled ? 'text-gray-400' : 'text-gray-600'}`} htmlFor={name}>
                                    {inputName}
                                </label>
                            </div>
                            
                            <div className={`relative transition-all duration-200 ${checkDisabled ? 'grayscale' : ''}`}>
                                <input
                                    className={`
                                        w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                        focus:ring-vermelho focus:border-vermelho block p-2.5 outline-none
                                        disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors
                                        placeholder-gray-400
                                    `}
                                    type="text"
                                    id={name}
                                    value={inf[name]}
                                    disabled={checkDisabled}
                                    placeholder={placeholder}
                                    onChange={(e) => setInf({...inf, [name]: e.target.value})}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Seleção de Imagens</h3>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <ImageMenu 
                        selected={selectedIMG} 
                        setSelected={setSelectedIMG} 
                        tipos={tipos} 
                        tipo={inf.tipo} 
                    />
                </div>
            </div>
        </section>
    )
}

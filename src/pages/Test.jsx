import { useEffect, useRef, useState } from "react"
import * as htmlToImage from 'html-to-image'
import bg from '../assets/imagens/bg.jpg'
import logo from '../assets/imagens/LOGO.png'
import casaSVG from '../assets/imagens/casa.png'
import carroSVG from '../assets/imagens/car.png'
import motoSVG from '../assets/imagens/moto.png'

import { Informacao } from "../components/Informacao"
import { ImageMenu } from "../components/ImageMenu"

const Test = () => {
    const node = useRef(null)

    const inputs = [
        { name: 'Tipo', placeholder: 'Casa' },
        { name: 'Descrição', placeholder: 'Ex: Carta Contemplada' },
        { name: 'Consórcio', placeholder: 'Ex: Servopa' },
        { name: 'Crédito', placeholder: '200' },
        { name: 'Entrada', placeholder: 'Ex: 10.593,55' },
        { name: 'Transferência', placeholder: 'Ex: 500,75' },
        { name: 'Valor pago', placeholder: 'Ex: 1.569,47' },
        { name: 'Prazo', placeholder: 'Ex: 40' },
        { name: 'Valor Parcela Integral', placeholder: 'Ex: 917,50' },
        { name: 'Valor Parcela Flex', placeholder: 'Ex: 500,77' },
        { name: 'Seguro', placeholder: 'Ex: 80,50' },
        { name: 'Vencimento', placeholder: 'Ex: 00/00/0000' },
        { name: 'Contato', placeholder: 'Ex: (00) 00000-0000' },
    ]

    const [inf, setInf] = useState({
        tipo: 'selecione',
        descricao: '',
        consorcio: '',
        credito: '',
        entrada: '',
        transferencia: '',
        valorPago: '',
        prazo: '',
        valorParcelaInt: '',
        valorParcelaFlex: '',
        seguro: '',
        vencimento: '',
        contato: ''
    })
    const tipos = {
        casa: casaSVG,
        carro: carroSVG,
        moto: motoSVG
    }
    
    const [milhar, setMilhar] = useState('mil')
    const [selectedIMG, setSelectedIMG] = useState({
    item: '',
    fundo: ''
  })

  useEffect(() => setSelectedIMG({ item: '', fundo: '' }), [inf.tipo, setSelectedIMG])

    const [check, setCheck] = useState({
        seguro: false,
        valorParcelaFlex: false
    })

    function checkInput(name) {
        if (name === 'seguro' || name === 'valorParcelaFlex') {
            return <input type="checkbox" checked={check[name]} onChange={() => setCheck({ ...check, [name]: !check[name] })} />
        }

        return null
    }

    async function downloadImage() {
        if (!node.current) return console.log('el não existe')

        try {
            const dataURL = await htmlToImage.toPng(node.current)
            const link = document.createElement('a')
            link.download = 'my-image.png'
            link.href = dataURL
            link.click()
        }catch (error) {
            console.error('oops, algo deu errado!', error)
        }
    }

    return (
        <div className="flex flex-col items-center gap-5 mt-5">
            <section className=" grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex flex-col">
                    <div className="flex gap-2 ml-2">
                        <label className="text-preto text-[12px] opacity-50" htmlFor='tipo'>Tipo:</label>
                    </div>
                    <div className="flex border-2 rounded-[10px] border-preto border-opacity-10 focus-within:border-opacity-20 focus-within:border-vermelho py-1 px-2">
                        <select 
                            className="text-preto text-opacity-75 focus:outline-none bg-transparent w-full capitalize" 
                            name="tipo"
                            value={inf.tipo} 
                            onChange={(e) => setInf({...inf, tipo: e.target.value})}
                        >
                            <option value="selecione">Selecione...</option>
                            {Object.keys(tipos).map((tipo, i) => (
                                <option 
                                    key={i}
                                    value={tipo}
                                >{tipo}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {Object.keys(inf).map((name, i) => {
                    const {name: inputName, placeholder} = inputs[i]
                    const checkDisabled = name === 'seguro' || name === 'valorParcelaFlex' ? !check[name] : false
                    if (name === 'tipo') return

                    return(
                        <div key={i} className="flex flex-col">
                            <div className="flex gap-2 ml-2">

                                {/* CHECK */}
                                {checkInput(name)}

                                <label className="text-preto text-[12px] opacity-50" htmlFor={name}>{inputName}:</label>
                            </div>
                            <div className={`flex border-2 rounded-[10px] border-preto border-opacity-10 focus-within:border-opacity-20 focus-within:border-vermelho py-1 px-2 ${checkDisabled && 'opacity-25 bg-cinza cursor-not-allowed'}`}>
                                <input
                                    className={`text-preto text-opacity-75 focus:outline-none disabled:cursor-not-allowed bg-transparent ${name === 'credito' ? 'w-[30px]' : 'w-full'}`}
                                    type="text"
                                    id={name}
                                    value={inf[name]}
                                    disabled={checkDisabled}
                                    placeholder={placeholder}
                                    onChange={(e) => setInf({...inf, [name]: e.target.value})}
                                />
                               {name === 'credito' && 
                                    <select 
                                        className="outline-none text-preto text-opacity-75" 
                                        name="milhar" 
                                        value={milhar} 
                                        onChange={(e) => setMilhar(e.target.value)}
                                    >
                                        <option value="mil">Mil</option>
                                        <option value="mi">Mi</option>
                                    </select>
                                }
                            </div>
                        </div>
                    )
                })}
                <ImageMenu selected={selectedIMG} setSelected={setSelectedIMG} tipo={inf.tipo} />

            </section>
            <section className="scale-50 md:scale-75 lg:scale-100 mt-[-150px] md:mt-[-90px] lg:mt-[-20px]">
                <div ref={node} className="w-[512px] overflow-hidden font-roboto">
                    <div 
                        className="aspect-square bg-cover bg-center relative"
                        style={{ backgroundImage: `url(${bg})` }}
                    >
                        {/* LOGO */}
                        <img src={logo} alt="Logo" className="w-[100px] absolute bottom-0 right-0"/>
                        {/* FUNDO IMG */}
                        <div 
                            className="w-[256px] h-[300px] bg-cinza bg-cover bg-center absolute top-[71px] right-0 rounded-l-[25px] shadow-padrao"
                            style={{ backgroundImage: `url(${selectedIMG.fundo})` }}
                        />
                        {/* ITEM IMG */}
                        {selectedIMG.item &&
                            <img src={selectedIMG.item} alt="Logo" className="w-[370px] absolute top-[220px] right-[-60px] z-10"/>
                        }
                        {/* TITULO */}
                        <div className="absolute top-[21px] left-[37px] flex items-center gap-3">

                            <div className="bg-vermelho w-[50px] aspect-square p-[6px] rounded-[5px] shadow-padrao">
                                {Object.entries(tipos).find(key => key[0] === inf.tipo) &&
                                    <img 
                                        src={Object.entries(tipos).find(key => key[0] === inf.tipo)[1]} 
                                        alt={Object.entries(tipos).find(key => key[0] === inf.tipo)[1]} 
                                        className="w-full relative top-[4px] opacity-70"
                                    />
                                }
                            </div>

                            <div className="pt-1">
                                <h1 className="text-xl leading-5 font-bold text-preto">{inf.descricao.toUpperCase() || 'Digite uma descrição'}</h1>
                                <h2 className="text-base text-preto capitalize">{inf.consorcio || 'Nome do consórcio'}</h2>
                            </div>

                        </div>
                        <div className="w-1/2 absolute top-[126px] left-0">
                            {/* PRAZO */}
                            <div className="absolute left-[36px] text-preto flex items-end gap-1">
                                <div className="flex flex-col items-end">
                                    <p>Prazo de</p>
                                    <p className="text-[2rem] leading-6 font-bold text-vermelho relative left-[2px]">{inf.prazo || '0'}</p>
                                </div>
                                <p className="relative top-2">meses</p>
                            </div>
                            
                            <div className="flex flex-col absolute top-[95px] right-0 bg-cinza shadow-padrao rounded-[10px] p-2 px-5">
                                <div className="self-end absolute top-[-32px]">
                                    {/* ENTRADA */}
                                    <Informacao titulo='Entrada de' valor={`R$ ${inf.entrada || '0,00'}`}/>
                                    {/* TRANSFERÊNCIA */}
                                    <Informacao className='text-[8px]' titulo='Transferência' valor={`R$ ${inf.transferencia || '0,00'}`}/>
                                </div>
                                {/* VALOR PAGO */}
                                <Informacao className='self-end' titulo='Valor pago' valor={`R$ ${inf.valorPago || '0,00'}`}/>
                                <div className='flex gap-1 text-[12px] items-end text-preto mt-[-10px] '>
                                    {/* PARCELA FLEX */}
                                    <p className="opacity-50">{`Parcela${check.valorParcelaFlex ? ' flex' : ''}`}</p>
                                    <div className="flex text-vermelho gap-[2px]">
                                        <p className="text-[11px] self-end">R$</p>
                                        <p className="text-[32px] font-bold relative top-2">{check.valorParcelaFlex ? inf.valorParcelaFlex.split(',')[0] || '0' : inf.valorParcelaInt.split(',')[0] || '0'}</p>
                                        <p className="text-[15px] font-black self-start relative top-[15px]">{`,${check.valorParcelaFlex ? inf.valorParcelaFlex.split(',')[1] || '00' : inf.valorParcelaInt.split(',')[1] || '00'}`}</p>
                                    </div>
                                </div>
                                {/* PARCELA INTEGRAL */}
                                {check.valorParcelaFlex &&
                                    <Informacao titulo='Parcela integral' valor={`R$ ${inf.valorParcelaInt || '0,00'}`}/>
                                }
                                {/* SEGURO */}
                                {check.seguro &&
                                    <Informacao className='text-[8px]' titulo='+ Seguro de vida pf' valor={`R$ ${inf.seguro || '0,00'}`}/>
                                }
                                {/* VENCIMENTO */}
                                <Informacao className='self-end text-[8px] mt-1' titulo='Vencimento' valor={inf.vencimento || '00/00/0000'}/>
                                {/* CONTATO */}
                                <Informacao className='absolute bottom-[-16px] text-[8px]' titulo='Contato' valor={inf.contato || '(00) 00000-0000'}/>
                            </div>

                            {/* CRÉDITO */}
                            <div className="bg-vermelho text-cinza flex flex-col items-center absolute right-[135px] top-[63px] rounded-[10px] p-2 shadow-padrao">
                                <p className="text-[8px] absolute">Crédito de</p>
                                <div className="flex gap-[2px]">
                                    <p className="text-[8px] self-end">R$</p>
                                    <p className="text-[24px] font-bold relative top-[7px]">{inf.credito || '0'}</p>
                                    <p className="text-[10px] font-black self-end relative top-[1px]">{milhar === 'mi' ? inf.credito === '1' ? 'MILHÃO' : 'MILHÕES' : milhar.toUpperCase()}</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
            <button 
                className="bg-vermelho text-cinza font-bold py-2 px-4 rounded-[10px] hover:brightness-110 transition-all mb-10 mt-[-120px] md:mt-[-60px] lg:mt-0"
                onClick={downloadImage}
            >Baixar imagem</button>
        </div>
    )
}

export default Test

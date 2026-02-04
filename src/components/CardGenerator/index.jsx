import { useEffect, useRef, useState } from "react"
import * as htmlToImage from 'html-to-image'

import casaSVG from '../../assets/imagens/casa.png'
import carroSVG from '../../assets/imagens/car.png'
import motoSVG from '../../assets/imagens/moto.png'
import servicosSVG from '../../assets/imagens/hammer.png'

import { CardForm } from "./CardForm"
import { CardPreview } from "./CardPreview"

const CardGenerator = () => {
    const node = useRef(null)

    const inputs = [
        { name: 'Tipo', placeholder: 'Casa' },
        { name: 'Color', placeholder: 'Vermelho' },
        { name: 'Descrição', placeholder: 'Carta Contemplada' },
        { name: 'Consórcio', placeholder: 'Servopa' },
        { name: 'Crédito', placeholder: '200' },
        { name: 'Upgrade', placeholder: '300' },
        { name: 'Entrada', placeholder: '10.593,55' },
        { name: 'Transferência', placeholder: '500,75' },
        { name: 'Valor pago', placeholder: '1.569,47' },
        { name: 'Prazo', placeholder: '40' },
        { name: 'Valor Parcela Integral', placeholder: '917,50' },
        { name: 'Valor Parcela Flex', placeholder: '500,77' },
        { name: 'Mais Parcelas Num', placeholder: '8' },
        { name: 'Mais Parcelas Valor', placeholder: '59,90' },
        { name: 'Seguro', placeholder: '80,50' },
        { name: 'Vencimento', placeholder: '00/00/0000' },
        { name: 'Contato', placeholder: '(00) 00000-0000' },
    ]

    const [inf, setInf] = useState({
        tipo: 'selecione',
        color: 'selecione',
        descricao: '',
        consorcio: '',
        credito: '',
        upgrade: '',
        entrada: '',
        transferencia: '',
        valorPago: '',
        prazo: '',
        valorParcelaInt: '',
        valorParcelaFlex: '',
        maisParcelasNum: '',
        maisParcelasValor: '',
        seguro: '',
        vencimento: '',
        contato: ''
    })

    const tipos = {
        casa: casaSVG,
        carro: carroSVG,
        moto: motoSVG,
        servico: servicosSVG
    }

    const color = {
        vermelho: 0,
        verde: 120,
        azul: 240,
    }
    
    // eslint-disable-next-line no-unused-vars
    const [milhar, setMilhar] = useState('mil')
    
    const [selectedIMG, setSelectedIMG] = useState({
        item: '',
        fundo: ''
    })

    useEffect(() => {
        setSelectedIMG(prev => ({ ...prev, item: '', fundo: '' }))
    }, [inf.tipo])

    const [check, setCheck] = useState({
        seguro: false,
        valorParcelaFlex: false,
        maisParcelasDe: false,
        upgrade: false
    })

    async function downloadImage() {
        if (!node.current) return console.log('Elemento não existe')

        try {
            const dataURL = await htmlToImage.toPng(node.current)
            const link = document.createElement('a')
            link.download = `card-${inf.consorcio || 'consorcio'}.png`
            link.href = dataURL
            link.click()
        }catch (error) {
            console.error('Oops, algo deu errado!', error)
        }
    }

    return (
        <div className="flex flex-col items-center gap-5 mt-5">
            <CardForm 
                inf={inf}
                setInf={setInf}
                check={check}
                setCheck={setCheck}
                inputs={inputs}
                tipos={tipos}
                color={color}
                selectedIMG={selectedIMG}
                setSelectedIMG={setSelectedIMG}
            />

            <CardPreview 
                nodeRef={node}
                inf={inf}
                selectedIMG={selectedIMG}
                tipos={tipos}
                color={color}
                check={check}
                milhar={milhar}
            />

            <button 
                className="bg-vermelho text-cinza font-bold py-2 px-4 rounded-[10px] hover:brightness-110 transition-all mb-10 mt-[-120px] md:mt-[-60px] lg:mt-0"
                onClick={downloadImage}
            >
                Baixar imagem
            </button>
        </div>
    )
}

export default CardGenerator

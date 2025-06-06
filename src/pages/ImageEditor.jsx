import { useEffect, useRef, useState } from "react";
import { useTemplateData } from "../context/templateContext";
import { Navigate } from "react-router-dom";
import { Input } from "../components/Input";
import { InputCheck } from "../components/InputCheck";
import { InputSelect } from "../components/InputSelect";
import { InputImageProdutos } from "../components/InputImageProdutos";

const ImageEditor = () => {
    const canvasRef = useRef(null)
    const download = useRef(null)

    const [reset, setReset] = useState(true)

    const { template } = useTemplateData()

    const [ creditoValue, setCreditoValue ] = useState('')
    const [ tipo, setTipo ] = useState('')
    const [ consorcio, setConsorcio ] = useState('')
    const [ entradaValue, setEntradaValue ] = useState('')
    const [ valorSeguroValue, setValorSeguroValue ] = useState('')
    const [ numeroDeParcelasValue, setNumeroDeParcelasValue ] = useState('')
    const [ valorParcelasValue, setValorParcelasValue ] = useState('')
    const [ valorPagoValue, setValorPagoValue ] = useState('')
    const [ transferenciaValue, setTransferenciaValue ] = useState('')
    const [ quantidadeDeImagens, setQuantidaDeImagens ] = useState('')
    const [ vencimentoValue, setVencimentoValue ] = useState('')
    const [ contatoValue, setContatoValue ] = useState('')
    
    const [ seletorImagens1, setSeletorImagens1 ] = useState('')
    const [ seletorImagens2, setSeletorImagens2 ] = useState('')
    const [ seletorImagens3, setSeletorImagens3 ] = useState('')
    
    const [ parcelaFlex, setParcelaFlex ] = useState(false)
    const [seguroCheck, setSeguroCheck] = useState(false)

    const [erro, setErro] = useState("")

    let imagensCarregadas = 0

    function defineFont(ctx, tamanho) {
        ctx.font = `bold ${tamanho}px Verdana`;
        ctx.textAlign = "start";
        ctx.textBaseline = "middle";
    }

    function criaCanvas(canvas, template, ctx) {
        if (template) {
            const img = new Image();
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
            };
            img.src = template;
        }
    }
    
    function criaImagemNoTemplate(ctx, imgSelect, x, y) {
        if(imgSelect !== '') {
            const img = new Image()
            img.onload = () => {
                    ctx.translate(0, -img.height)
                    ctx.drawImage(img, x, y, img.width, img.height)
                    ctx.translate(0, img.height)
                    imagensCarregadas++
                    if (imagensCarregadas === Number(quantidadeDeImagens)) {
                        console.log(imagensCarregadas)
                        downloadIMG()
                    }
                };
                img.src = imgSelect
        }
    }
    
    function escreveValoresDosInputs(ctx, tipo, consorcio, credito, entrada, numeroDeParcelas, valorParcelas, parcelaFlex, valorPago, transferencia, valorSeguro, vencimento, contato) {
        //Tipo
        defineFont(ctx, 75)
        ctx.fillStyle = '#ff0000'
        ctx.fillText(tipo, 110, 100)
        //Empresa consórcio
        defineFont(ctx, 75);
        ctx.fillStyle = '#000'
        ctx.fillText(consorcio, 110, 195);
        //Crédito
        defineFont(ctx, 70);
        ctx.fillText(`R$${credito}`, 75, 774);
        //Entrada
        defineFont(ctx, 40);
        ctx.fillText(`Entrada: R$${entrada}`, 75, 855);
        //Parcelas + Seguro
        defineFont(ctx, 30);
        ctx.fillText(
                `${numeroDeParcelas}x R$${valorParcelas} ${seguroCheck ? `+ seg. de vida pf R$${valorSeguro}` : ''} ${parcelaFlex ? 'Obs: parcela flex': ''}`,
                75,
                912
            )
        //Valor pago
        defineFont(ctx, 35);
        ctx.fillText(`Valor pago: R$${valorPago}`, 75, 970);
        //Transferência
        defineFont(ctx, 35);
        ctx.fillText(`Transferência: R$${transferencia}`, 75, 1028);
        //Vencimento
        defineFont(ctx, 35);
        ctx.fillText(`Vencimento: ${vencimento}`, 150, 1100);
        //Contato
        defineFont(ctx, 35);
        ctx.fillText(`Contato: ${contato}`, 150, 1150);
    }

    function downloadIMG() {
        const link = download.current
        const canvas = canvasRef.current

        link.download = 'image.png'
        link.href = canvas.toDataURL('image/png')
    }

    function handleClick(e) {
        e.preventDefault();
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const data = [ 
            tipo, 
            consorcio, 
            creditoValue, 
            entradaValue, 
            numeroDeParcelasValue, 
            valorParcelasValue,

            parcelaFlex,

            valorPagoValue, 
            transferenciaValue, 

            valorSeguroValue,

            vencimentoValue,
            contatoValue
        ]
        const dataTest = data.filter(data => data !== false).filter(data => data !== '')
        if (dataTest.length >= 9) {
            criaImagemNoTemplate(ctx, seletorImagens1, 200, 700)
            criaImagemNoTemplate(ctx, seletorImagens2, 330, 730)
            criaImagemNoTemplate(ctx, seletorImagens3, 450, 760)
            escreveValoresDosInputs(ctx, ...data)
            setErro("")
        } else {
            setErro("Preencha todos os campos");
        }
    }

    useEffect(() => {
        if(reset) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            criaCanvas(canvas, template, ctx);
            setReset(false)
        }
    }, [template, reset])

    const tiposDeConsorcio = ['Carta contemplada', 'Consórcio não contemplado', 'Carnê não contemplado']
    const empresa = ['Servopa', 'Yamaha', 'Gazin', 'Sicredi', 'Santander']
    const quantDeImg = [1,2,3]

    return (
        <section className="flex justify-center flex-col gap-10 items-center">
            {!template ? (
                <Navigate to="/" />
            ) : (
                <>
                    <form className="min-w-80 max-w-3xl m-5" onSubmit={(e) => handleClick(e)}>
                        <InputSelect 
                            descricoes={tiposDeConsorcio}
                            setValue={setTipo}
                            value={tipo}
                        >Tipo</InputSelect>

                        <InputSelect 
                            descricoes={empresa}  
                            setValue={setConsorcio}
                            value={consorcio}
                        >Consórcio</InputSelect>

                        <Input 
                            value={creditoValue} 
                            setValue={setCreditoValue} 
                            placeholder='35.950,00' 
                        >Crédito</Input>

                        <InputSelect 
                            descricoes={quantDeImg}
                            setValue={setQuantidaDeImagens}
                            value={quantidadeDeImagens}
                        >Quantidade de imagens</InputSelect>

                        <InputImageProdutos 
                            quantidade={quantidadeDeImagens}
                            setSeletor1={setSeletorImagens1}
                            setSeletor2={setSeletorImagens2}
                            setSeletor3={setSeletorImagens3}
                        />
                        <picture>
                            <img src={seletorImagens1} alt="" width='150px'/>
                            <img src={seletorImagens2} alt="" width='150px'/>
                            <img src={seletorImagens3} alt="" width='150px'/>
                        </picture>

                        <Input 
                            value={entradaValue}
                            setValue={setEntradaValue} 
                            placeholder='12.720,80'
                        >Entrada</Input>

                        <InputCheck 
                            value={seguroCheck} 
                            setValue={setSeguroCheck}
                        >Tem valor do seguro?</InputCheck>

                        {seguroCheck && (
                            <Input 
                                value={valorSeguroValue} 
                                setValue={setValorSeguroValue} 
                                placeholder="87,14"
                            ></Input>
                        )}

                        <div className="flex gap-2">
                            <Input 
                                classLabel="w-1/6" 
                                value={numeroDeParcelasValue} 
                                setValue={setNumeroDeParcelasValue} 
                                placeholder="45"
                            >Parcelas</Input>

                            <Input 
                                classLabel="w-full" 
                                value={valorParcelasValue} 
                                setValue={setValorParcelasValue} 
                                placeholder="875,05"
                            >Valor</Input>
                        </div>

                        <InputCheck 
                            value={parcelaFlex} 
                            setValue={setParcelaFlex}
                        >Parcela Flex?</InputCheck>

                        <Input 
                            value={valorPagoValue} 
                            setValue={setValorPagoValue} 
                            placeholder="10.875,00"
                        >Valor pago</Input>

                        <Input 
                            value={transferenciaValue} 
                            setValue={setTransferenciaValue} 
                            placeholder="575,00"
                        >Transferência</Input>

                        <Input
                            setValue={setVencimentoValue} 
                            placeholder='19/12/2024'
                            tipo='date'
                        >Vencimento</Input>

                        <Input 
                            value={contatoValue} 
                            setValue={setContatoValue} 
                            placeholder="(41)..."
                            tipo='contato'
                            maxlength={15}
                        >Contato</Input>

                        <p>{erro}</p>

                        <button
                            className="bg-red-600 px-3 py-1 text-white rounded-sm mt-2 w-40"
                            type="submit"
                        >Criar post
                        </button>
                    </form>
                    <button
                        className="bg-red-600 px-3 py-1 text-white rounded-sm mt-2 w-40"
                        type="button"
                        onClick={() => setReset(true)}
                    >Apagar
                    </button>
                </>
            )}
            <canvas className="size-72 border-solid border-gray-400 border-2" ref={canvasRef} />
            <a href="#" ref={download} className="bg-red-600 px-3 py-1 text-white rounded-sm mb-10 w-40">Download image</a>
        </section>
    );
};

export default ImageEditor;

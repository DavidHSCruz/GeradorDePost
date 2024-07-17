import { useEffect, useRef, useState } from "react";
import { useTemplateData } from "../context/templateContext";
import { Navigate } from "react-router-dom";
import { InputText } from "../components/InputText";
import { InputCheck } from "../components/InputCheck";
import { InputSelect } from "../components/InputSelect";

const ImageEditor = () => {
    const canvasRef = useRef(null)
    const download = useRef(null)

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


    const [seguroCheck, setSeguroCheck] = useState(false)

    const [erro, setErro] = useState("")

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

    function escreveValoresDosInputs(ctx, tipo, consorcio, credito, entrada, numeroDeParcelas, valorParcelas, valorPago, transferencia, valorSeguro) {
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
        defineFont(ctx, 35);
        valorSeguro
            ? ctx.fillText(
                `Assume: ${numeroDeParcelas}x R$${valorParcelas} + seg. de vida pf R$${valorSeguro}`,
                75,
                912
            )
            : ctx.fillText(
                `Assume: ${numeroDeParcelas}x R$${valorParcelas}`,
                75,
                912
            );
        //Valor pago
        defineFont(ctx, 35);
        ctx.fillText(`Valor pago: R$${valorPago}`, 75, 970);
        //Transferência
        defineFont(ctx, 35);
        ctx.fillText(`Transferência: R$${transferencia}`, 75, 1028);

        downloadIMG()
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
        if (
            tipo &&
            consorcio &&
            creditoValue &&
            entradaValue &&
            numeroDeParcelasValue &&
            valorParcelasValue &&
            valorPagoValue &&
            transferenciaValue
        ) {
            escreveValoresDosInputs(
                ctx,
                tipo,
                consorcio,
                creditoValue,
                entradaValue,
                numeroDeParcelasValue,
                valorParcelasValue,
                valorPagoValue,
                transferenciaValue,
                valorSeguroValue
            );
            setErro("");
        } else {
            setErro("Preencha todos os campos");
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        criaCanvas(canvas, template, ctx);
    }, [template]);
    const tiposDeConsorcio = ['Carta contemplada', 'Carta não contemplada', 'Carnê contemplado', 'Carnê não contemplado']
    const empresa = ['Servopa', 'Yamaha', 'Gazin']
    return (
        <section className="flex justify-center flex-col gap-10 items-center">
            {!template ? (
                <Navigate to="/" />
            ) : (
                <form className="min-w-80 max-w-3xl m-5">
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

                    <InputText 
                        value={creditoValue} 
                        setValue={setCreditoValue} 
                        placeholder='35.950,00' 
                    >Crédito</InputText>

                    <InputText 
                        value={entradaValue} 
                        setValue={setEntradaValue} 
                        placeholder='12.720,80'
                    >Entrada</InputText>

                    <InputCheck 
                        value={seguroCheck} 
                        setValue={setSeguroCheck}
                    >Tem valor do seguro?</InputCheck>

                    {seguroCheck && (
                        <InputText 
                            value={valorSeguroValue} 
                            setValue={setValorSeguroValue} 
                            placeholder="87,14"
                        ></InputText>
                    )}

                    <div className="flex gap-2">
                        <InputText 
                            classLabel="w-1/6" 
                            value={numeroDeParcelasValue} 
                            setValue={setNumeroDeParcelasValue} 
                            placeholder="45"
                        >Parcelas</InputText>

                        <InputText 
                            classLabel="w-full" 
                            value={valorParcelasValue} 
                            setValue={setValorParcelasValue} 
                            placeholder="875,05"
                        >Valor</InputText>
                    </div>

                    <InputText 
                        value={valorPagoValue} 
                        setValue={setValorPagoValue} 
                        placeholder="10.875,00"
                    >Valor pago</InputText>

                    <InputText 
                        value={transferenciaValue} 
                        setValue={setTransferenciaValue} 
                        placeholder="575,00"
                    >Transferência</InputText>

                    <p>{erro}</p>

                    <button
                        className="bg-red-600 px-3 py-1 text-white rounded-sm mt-2 w-40"
                        type="submit"
                        onClick={ (e) => handleClick(e) }
                    >Criar post
                    </button>
                </form>
            )}
            <canvas className=" size-72" ref={canvasRef} />
            <a href="#" ref={download} className="bg-red-600 px-3 py-1 text-white rounded-sm mb-10 w-40">Download image</a>
        </section>
    );
};

export default ImageEditor;

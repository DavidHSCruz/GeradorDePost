import { useEffect, useRef, useState } from "react";
import { useTemplateData } from "../../context/templateContext";
import { Navigate } from "react-router-dom";

const ImageEditor = () => {
    const canvasRef = useRef(null);
    const download = useRef(null)
    const { template } = useTemplateData();

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

    function escreveValoresInputs(
        ctx,
        consorcio,
        credito,
        entrada,
        numeroDeParcelas,
        valorParcelas,
        valorPago,
        transferencia,
        valorSeguro
    ) {
        //Empresa consórcio
        defineFont(ctx, 75);
        ctx.fillText(consorcio, 110, 195);
        //Crédito
        defineFont(ctx, 70);
        ctx.fillText(`R$${credito}mil`, 75, 774);
        //Entrada
        defineFont(ctx, 40);
        ctx.fillText(`Entrada: R$${entrada}`, 75, 855);
        //Parcelas + Seguro
        defineFont(ctx, 35);
        valorSeguro
            ? ctx.fillText(
                `Assume: ${numeroDeParcelas}x R$${valorParcelas} + seg. de vida pf R$${valorSeguro.value}`,
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

    const consorcio = useRef(null);
    const credito = useRef(null);
    const entrada = useRef(null);
    const numeroDeParcelas = useRef(null);
    const valorParcelas = useRef(null);
    const seguro = useRef(null);
    const valorSeguro = useRef(null);
    const valorPago = useRef(null);
    const transferencia = useRef(null);

    const [seguroCheck, setSeguroCheck] = useState(false);
    const [erro, setErro] = useState("");

    function handleClick(e) {
        e.preventDefault();
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        if (
            consorcio.current.value &&
            credito.current.value &&
            entrada.current.value &&
            numeroDeParcelas.current.value &&
            valorParcelas.current.value &&
            valorPago.current.value &&
            transferencia.current.value
        ) {
            escreveValoresInputs(
                ctx,
                consorcio.current.value,
                credito.current.value,
                entrada.current.value,
                numeroDeParcelas.current.value,
                valorParcelas.current.value,
                valorPago.current.value,
                transferencia.current.value,
                valorSeguro.current
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
    }, []);

    return (
        <section className="flex justify-center flex-col gap-10 items-center">
            {!template ? (
                <Navigate to="/" />
            ) : (
                <form className="min-w-80 max-w-3xl m-5">
                    <label>
                        <p>Consórcio:</p>
                        <input
                            className="w-full border-b-2"
                            ref={consorcio}
                            type="text"
                            placeholder="Servopa"
                        />
                    </label>
                    <label>
                        <p>Crédito:</p>
                        <input
                            className="w-full border-b-2"
                            ref={credito}
                            type="text"
                            placeholder="35.000,00"
                        />
                    </label>
                    <label>
                        <p>Entrada:</p>
                        <input 
                            className="w-full border-b-2"
                            ref={entrada}
                            type="text"
                            placeholder="12.900,00"
                        />
                    </label>
                    <label className="flex gap-2 my-2">
                        <p>Tem valor do seguro?</p>
                        <input
                            ref={seguro}
                            type="checkbox"
                            onChange={() =>
                                seguroCheck ? setSeguroCheck(false) : setSeguroCheck(true)
                            }
                        />
                    </label>

                    {seguroCheck && (
                        <input
                            className="w-full border-b-2"
                            ref={valorSeguro}
                            type="text"
                            placeholder="87,14"
                        />
                    )}
                    <div className="flex gap-2">
                        <label className="w-1/6">
                            <p>Parcelas:</p>
                            <input
                                className="w-full border-b-2"
                                ref={numeroDeParcelas}
                                type="text"
                                placeholder="45"
                            />
                        </label>
                        <label className="w-full">
                            <p>Valor:</p>
                            <input
                                className="w-full border-b-2"
                                ref={valorParcelas}
                                type="text"
                                placeholder="875,05"
                            />
                        </label>
                    </div>
                    <label>
                        <p>Valor pago:</p>
                        <input
                            className="w-full border-b-2"
                            ref={valorPago}
                            type="text"
                            placeholder="10.875,00"
                        />
                    </label>
                    <label>
                        <p>Transferência:</p>
                        <input
                            className="w-full border-b-2"
                            ref={transferencia}
                            type="text"
                            placeholder="575,00"
                        />
                    </label>
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

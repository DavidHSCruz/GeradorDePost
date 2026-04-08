import bg from "../../assets/imagens/bg.jpg";
import logo from "../../assets/imagens/LOGO.png";

export const CardPreview = ({
  nodeRef,
  inf,
  selectedIMG,
  tipos,
  color,
  check,
  milhar = "mil",
}) => {
  const hueBg = (color !== "selecione" && color[inf.color]) || 0;
  const tipoIcon = Object.entries(tipos).find((key) => key[0] === (inf.tipo || '').replace("ç", "c"))?.[1];
  const parcelaAtiva = check.valorParcelaFlex ? (inf.valorParcelaFlex || '0,00') : (inf.valorParcelaInt || '0,00');
  const [parcInteira, parcCentavos] = parcelaAtiva.split(',');

  return (
    <section className="scale-50 md:scale-75 lg:scale-100 mt-[-120px] md:mt-[-50px] lg:mt-0">
      <div ref={nodeRef} className="w-[512px] h-[512px] relative overflow-hidden font-roboto shadow-2xl rounded-[30px] bg-white">

        {/* Fundo Principal - BG Original do Cliente */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bg})`, filter: `hue-rotate(${hueBg}deg)` }} />

        {/* Fundo IMG - Imagem de Apoio (Carro/Casa) */}
        <div className="absolute top-[-50px] left-[-50px] w-[612px] h-[612px]">
          <div
            className={`w-full h-full bg-cover bg-center ${selectedIMG.item && "mix-blend-overlay"}`}
            style={{ backgroundImage: `url(${selectedIMG.fundo})`, filter: `hue-rotate(${-hueBg}deg)` }}
          />
          {/* Gradiente para mesclar a imagem com o fundo suavemente */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
        </div>

        {/* Item Image (Cutout) */}
        {selectedIMG.item && (
          <img
            src={selectedIMG.item}
            alt="Item"
            className="absolute top-[75px] left-[50%] -translate-x-1/2 w-[340px] drop-shadow-2xl z-10 object-contain"
            style={{ filter: `hue-rotate(${-hueBg}deg)` }}
          />
        )}

        {/* Header - Logo e Título */}
        <div className="absolute top-[20px] left-[20px] right-[20px] z-20 flex justify-between items-start">
          <div className="flex gap-3">
            <div className="bg-vermelho w-[45px] h-[45px] rounded-xl flex items-center justify-center shadow-lg border border-white/20">
              {tipoIcon && <img src={tipoIcon} className="w-[60%]" alt="icon" />}
            </div>
            <div className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              <h1 className="text-2xl font-black leading-none uppercase">{inf.descricao || 'DESCRIÇÃO'}</h1>
              <h2 className="text-[10px] font-medium text-gray-300 mt-1 uppercase tracking-widest opacity-80">{inf.consorcio || 'Consórcio'}</h2>
            </div>
          </div>
          <img src={logo} alt="Logo" className="w-[120px] drop-shadow-xl bg-white p-2 rounded-xl border border-white/20" style={{ filter: `hue-rotate(${-hueBg}deg)` }} />
        </div>

        {/* Painel Inferior - Valores */}
        <div className="absolute top-[260px] left-[20px] w-[472px] h-[235px] z-20 flex flex-col gap-2">

          {/* Destaque: Parcela e Crédito */}
          <div className="flex gap-2 min-h-[90px]">
            {/* Parcela */}
            <div className="flex-1 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2 shadow-xl border border-white/60 flex flex-col justify-center min-w-0">
              <p className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">Parcela {check.valorParcelaFlex ? 'Flex' : 'Integral'}</p>
              <div className="flex items-start text-vermelho">
                <span className="text-sm font-bold mt-1 mr-1">R$</span>
                <span className="text-[2.4rem] font-black leading-[0.9] tracking-tighter">{parcInteira}</span>
                <span className="text-lg font-bold shrink-0">,{parcCentavos || '00'}</span>
              </div>
              {check.valorParcelaFlex && (
                <p className="text-[9px] text-gray-500 font-medium mt-1">Integral: R$ {inf.valorParcelaInt}</p>
              )}
            </div>
            {/* Crédito */}
            <div className="flex-shrink-0 min-w-[140px] max-w-[280px] px-4 py-2 bg-vermelho text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center relative overflow-hidden border border-red-400">
              <p className="text-[10px] font-bold uppercase opacity-90 tracking-wider w-full">Crédito</p>
              <div className="flex items-end justify-center mt-1 w-full flex-wrap leading-none gap-x-1">
                <span className="text-sm font-bold mb-[2px]">R$</span>
                <span className="text-[2rem] font-black leading-none shrink-0 break-all" style={{ fontSize: inf.credito && inf.credito.length > 7 ? '1.5rem' : '2rem' }}>{inf.credito || '00'}</span>
                <span className="text-[10px] font-bold mb-[2px]">{milhar === 'mi' ? (inf.credito === '1' ? 'MILHÃO' : 'MILHÕES') : milhar.toUpperCase()}</span>
              </div>
              {check.upgrade && (
                <div className="mt-1 text-[9px] bg-black/20 px-2 py-1 rounded w-full">
                  <span className="opacity-80">UPGRADE</span> <span className="font-bold">R$ {inf.upgrade}</span>
                </div>
              )}
            </div>
          </div>

          {/* Grid de Detalhes Adicionais */}
          <div className="flex gap-2 flex-1 mb-2">
            <div className="bg-gray-900/90 backdrop-blur-md text-white rounded-2xl px-4 py-2 shadow-xl flex-1 flex flex-col justify-center gap-[3px] text-[10px] border border-white/10">
              <div className="flex justify-between border-b border-white/10 pb-[2px]">
                <span className="opacity-70 font-medium uppercase text-[9px]">Prazo</span>
                <span className="font-bold text-vermelho text-right">{inf.prazo} meses</span>
              </div>
              {check.maisParcelasDe && (
                <div className="flex justify-between border-b border-white/10 pb-[2px]">
                  <span className="opacity-70 font-medium uppercase text-[9px]">+{inf.maisParcelasNum} parcelas de</span>
                  <span className="font-bold text-gray-300 text-right">R$ {inf.maisParcelasValor}</span>
                </div>
              )}
              <div className="flex justify-between border-b border-white/10 pb-[2px]">
                <span className="opacity-70 font-medium uppercase text-[9px]">Entrada</span>
                <span className="font-bold text-right">R$ {inf.entrada}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-[2px]">
                <span className="opacity-70 font-medium uppercase text-[9px]">Lance/Pago</span>
                <span className="font-bold text-right">R$ {inf.valorPago}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-[2px]">
                <span className="opacity-70 font-medium uppercase text-[9px]">Transferência</span>
                <span className="font-bold text-right">R$ {inf.transferencia || '0,00'}</span>
              </div>
              {check.seguro && (
                <div className="flex justify-between pt-[2px]">
                  <span className="opacity-70 font-medium uppercase text-[9px]">Seguro PF</span>
                  <span className="font-bold text-right text-gray-300">R$ {inf.seguro}</span>
                </div>
              )}
            </div>

            {/* Rodapé Interno com Contato */}
            <div className="w-[140px] flex flex-col gap-2">
              <div className="flex-1 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-white/60 flex flex-col justify-center items-center text-center">
                <span className="text-[9px] font-bold uppercase text-gray-500 mb-1">Vencimento</span>
                <span className="text-sm font-black text-gray-800">{inf.vencimento}</span>
              </div>
              <div className="flex-1 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-white/60 flex flex-col justify-center items-center text-center">
                <span className="text-[9px] font-bold uppercase text-gray-500 mb-1">Contato</span>
                <span className="text-xs font-black text-gray-800">{inf.contato}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

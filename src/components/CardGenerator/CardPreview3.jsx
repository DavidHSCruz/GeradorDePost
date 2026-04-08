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

        {/* Fundo Principal */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bg})`, filter: `hue-rotate(${hueBg}deg)` }} />

        {/* Header Centralizado */}
        <div className="absolute top-[20px] left-[20px] right-[20px] flex flex-col items-center z-20">
          <div className="bg-vermelho text-white px-3 py-[6px] rounded-full text-[9px] font-medium uppercase tracking-[0.2em] shadow-md flex items-center gap-2 mb-2 opacity-90">
            {tipoIcon && <img src={tipoIcon} className="w-[12px]" alt="icon" />}
            {inf.consorcio || 'Consórcio'}
          </div>
          <h1 className="text-[26px] font-black text-gray-900 drop-shadow-md bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-white/50 text-center leading-none uppercase">
            {inf.descricao || 'DESCRIÇÃO'}
          </h1>
        </div>

        {/* Círculo Central com Imagem de Fundo */}
        <div className="absolute top-[110px] left-[50%] -translate-x-1/2 w-[240px] h-[240px] rounded-full border-[6px] border-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] overflow-hidden z-10">
          <div className="w-full h-full bg-cover bg-center mix-blend-overlay opacity-90" style={{ backgroundImage: `url(${selectedIMG.fundo})`, filter: `hue-rotate(${-hueBg}deg)` }} />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Item Image (Cutout) */}
        {selectedIMG.item && (
          <img src={selectedIMG.item} alt="Item" className="absolute top-[160px] left-[50%] -translate-x-1/2 w-[360px] drop-shadow-[0_20px_20px_rgba(0,0,0,0.6)] z-20 object-contain" style={{ filter: `hue-rotate(${-hueBg}deg)` }} />
        )}

        {/* Badges Flutuantes */}
        <div className="absolute top-[140px] left-[15px] bg-vermelho text-white px-4 py-[10px] rounded-2xl shadow-xl z-30 transform -rotate-3 border-2 border-white">
          <p className="text-[10px] font-bold uppercase text-center opacity-90 tracking-wider">Crédito</p>
          <div className="flex items-end justify-center mt-1">
            <span className="text-xs font-bold mb-[2px]">R$</span>
            <span className="text-[28px] font-black leading-none">{inf.credito || '00'}</span>
            <span className="text-[10px] font-black mb-[2px] ml-[2px]">{milhar === 'mi' ? (inf.credito === '1' ? 'MI' : 'MI') : 'MIL'}</span>
          </div>
        </div>

        <div className="absolute top-[180px] right-[15px] bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-[10px] rounded-2xl shadow-xl z-30 transform rotate-3 border border-white/60">
          <p className="text-[10px] font-bold uppercase text-center text-gray-500 tracking-wider">Prazo</p>
          <p className="text-[28px] font-black text-center text-vermelho leading-none mt-1">{inf.prazo || '0'}</p>
          <p className="text-[9px] font-bold uppercase text-center text-gray-500 mt-1">meses</p>
        </div>

        {/* Painel Inferior */}
        <div className="absolute bottom-[45px] left-[50%] -translate-x-1/2 w-[472px] bg-gray-900/90 backdrop-blur-md rounded-3xl p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.15)] z-20 flex border border-white/20 text-white">
          <div className="w-[45%] pr-4 border-r border-white/20 flex flex-col justify-center items-center text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Parcela {check.valorParcelaFlex ? 'Flex' : 'Integral'}</p>
            <div className="flex items-start text-vermelho mt-1">
              <span className="text-sm font-bold mt-[6px] mr-1 text-white">R$</span>
              <span className="text-[2.5rem] font-black leading-none text-white">{parcInteira}</span>
              <span className="text-lg font-bold mt-[6px] text-white">,{parcCentavos || '00'}</span>
            </div>
            {check.valorParcelaFlex && (
              <p className="text-[9px] font-medium text-gray-400 mt-2 bg-white/10 px-2 py-1 rounded-full">Int: R$ {inf.valorParcelaInt}</p>
            )}
          </div>
          <div className="w-[55%] pl-4 grid grid-cols-2 gap-[4px] text-[10px]">
            <div className="bg-white/10 p-[4px] rounded-lg flex flex-col justify-center border border-white/5">
              <span className="text-gray-400 font-bold uppercase text-[8px]">Entrada</span>
              <span className="font-black text-white text-[11px] mt-[2px]">R$ {inf.entrada}</span>
            </div>
            <div className="bg-white/10 p-[4px] rounded-lg flex flex-col justify-center border border-white/5">
              <span className="text-gray-400 font-bold uppercase text-[8px]">Lance/Pago</span>
              <span className="font-black text-white text-[11px] mt-[2px]">R$ {inf.valorPago}</span>
            </div>
            <div className="bg-white/10 p-[4px] rounded-lg flex justify-between items-center border border-white/5 col-span-2">
              <span className="text-gray-400 font-bold uppercase text-[8px]">Transferência</span>
              <span className="font-black text-white text-[11px] mt-[2px]">R$ {inf.transferencia || '0,00'}</span>
            </div>
            <div className="bg-white/10 p-[4px] rounded-lg flex flex-col justify-center col-span-2 border border-white/5">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-bold uppercase text-[8px]">+ {inf.maisParcelasNum || '0'} parcelas de</span>
                <span className="font-black text-white text-[11px]">R$ {inf.maisParcelasValor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-[12px] w-full px-[25px] flex justify-between items-center z-30">
          <img src={logo} alt="Logo" className="w-[100px] drop-shadow-md bg-white p-2 rounded-xl shadow-md border border-white/40" style={{ filter: `hue-rotate(${-hueBg}deg)` }} />
          <div className="text-[9px] text-gray-800 font-bold bg-white/95 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm border border-white/50">
            Venc: {inf.vencimento} | Tel: {inf.contato}
          </div>
        </div>

      </div>
    </section>
  );
};

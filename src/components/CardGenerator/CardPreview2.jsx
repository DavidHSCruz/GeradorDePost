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

        {/* Fundo Imagem Direito - Estilo Split */}
        <div className="absolute top-[20px] right-[20px] w-[240px] h-[280px] rounded-3xl overflow-hidden shadow-xl border-4 border-white/40">
          <div className="w-full h-full bg-cover bg-center mix-blend-overlay opacity-90" style={{ backgroundImage: `url(${selectedIMG.fundo})`, filter: `hue-rotate(${-hueBg}deg)` }} />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Item Image (Cutout) */}
        {selectedIMG.item && (
          <img src={selectedIMG.item} alt="Item" className="absolute top-[130px] right-[-10px] w-[340px] drop-shadow-2xl z-10 object-contain" style={{ filter: `hue-rotate(${-hueBg}deg)` }} />
        )}

        {/* Header - Logo e Título à Esquerda */}
        <div className="absolute top-[30px] left-[20px] w-[220px] z-20">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-vermelho w-[35px] h-[35px] rounded-lg flex items-center justify-center shadow-md">
              {tipoIcon && <img src={tipoIcon} className="w-[70%]" alt="icon" />}
            </div>
            <h2 className="text-[9px] font-medium text-gray-500 uppercase tracking-widest bg-white/95 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm border border-white/50 opacity-80">{inf.consorcio || 'Consórcio'}</h2>
          </div>
          <h1 className="text-[28px] font-black text-gray-900 leading-tight drop-shadow-md bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-white/50 uppercase">
            {inf.descricao || 'DESCRIÇÃO'}
          </h1>
        </div>

        {/* Crédito */}
        <div className="absolute top-[170px] left-[20px] bg-vermelho text-white rounded-2xl p-4 shadow-xl w-[220px] z-20 border border-red-400">
          <p className="text-[10px] font-bold uppercase opacity-90 tracking-wider">Crédito de</p>
          <div className="flex items-end mt-1">
            <span className="text-sm font-bold mb-1">R$</span>
            <span className="text-4xl font-black leading-none">{inf.credito || '00'}</span>
            <span className="text-[10px] font-bold mb-1 ml-1">{milhar === 'mi' ? (inf.credito === '1' ? 'MILHÃO' : 'MILHÕES') : milhar.toUpperCase()}</span>
          </div>
        </div>

        {/* Parcela */}
        <div className="absolute top-[260px] left-[20px] bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl w-[220px] border border-white/60 z-20">
          <p className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">Parcela {check.valorParcelaFlex ? 'Flex' : 'Integral'}</p>
          <div className="flex items-start text-vermelho mt-1">
            <span className="text-sm font-bold mt-1 mr-1">R$</span>
            <span className="text-4xl font-black leading-none tracking-tighter">{parcInteira}</span>
            <span className="text-lg font-bold mt-1">,{parcCentavos || '00'}</span>
          </div>
          {check.valorParcelaFlex && (
            <p className="text-[10px] text-gray-500 font-medium mt-1">Integral: R$ {inf.valorParcelaInt}</p>
          )}
        </div>

        {/* Barra de Detalhes Inferior */}
        <div className="absolute bottom-[50px] left-[20px] w-[472px] h-[75px] bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-xl flex items-center px-4 text-white z-20 border border-white/10">
          <div className="w-1/4 flex flex-col justify-center border-r border-white/20 pr-2">
            <span className="text-[9px] uppercase opacity-70 font-bold">Prazo</span>
            <span className="text-2xl font-black leading-none mt-1">{inf.prazo || '0'} <span className="text-[10px] font-normal opacity-70">m</span></span>
          </div>
          <div className="w-1/4 flex flex-col justify-center border-r border-white/20 px-3">
            <span className="text-[9px] uppercase opacity-70 font-bold">Entrada</span>
            <span className="text-sm font-bold mt-[2px]">R$ {inf.entrada}</span>
            <span className="text-[8px] uppercase opacity-70 mt-1">Transferência</span>
            <span className="text-[10px] font-bold">R$ {inf.transferencia || '0,00'}</span>
          </div>
          <div className="w-1/4 flex flex-col justify-center border-r border-white/20 px-3">
            <span className="text-[9px] uppercase opacity-70 font-bold">Lance/Pago</span>
            <span className="text-sm font-bold mt-[2px]">R$ {inf.valorPago}</span>
          </div>
          <div className="w-1/4 flex flex-col justify-center pl-3 gap-1">
            {check.upgrade && <div className="flex justify-between text-[9px]"><span className="opacity-70">Upgrade</span><span className="font-bold">{inf.upgrade}k</span></div>}
            {check.seguro && <div className="flex justify-between text-[9px]"><span className="opacity-70">Seguro</span><span className="font-bold">{inf.seguro}</span></div>}
            {check.maisParcelasDe && <div className="flex justify-between text-[9px]"><span className="opacity-70">+{inf.maisParcelasNum}x</span><span className="font-bold">R$ {inf.maisParcelasValor}</span></div>}
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-[15px] left-[20px] right-[20px] flex justify-between items-center z-30">
          <div className="text-gray-800 bg-white/95 backdrop-blur-sm px-3 py-[6px] rounded-lg text-[10px] font-bold shadow-sm">
            Venc: {inf.vencimento} | Tel: {inf.contato}
          </div>
          <img src={logo} alt="Logo" className="w-[110px] drop-shadow-md bg-white p-2 rounded-xl shadow-md border border-white/40" style={{ filter: `hue-rotate(${-hueBg}deg)` }} />
        </div>

      </div>
    </section>
  );
};

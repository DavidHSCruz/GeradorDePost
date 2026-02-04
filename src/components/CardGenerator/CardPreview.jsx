import bg from '../../assets/imagens/bg.jpg'
import logo from '../../assets/imagens/LOGO.png'
import { Informacao } from "../Informacao"

export const CardPreview = ({
  nodeRef,
  inf,
  selectedIMG,
  tipos,
  color,
  check,
  milhar = "mil", // Default value as logic to change it was missing in original
}) => {

  const hueBg = color !== 'selecione' && color[inf.color] || 0

  return (
    <section className="scale-50 md:scale-75 lg:scale-100 mt-[-120px] md:mt-[-50px] lg:mt-0">
      <div ref={nodeRef} className="w-[512px] overflow-hidden font-roboto">
        <div
          className="aspect-square bg-cover bg-center relative"
          style={{ 
            backgroundImage: `url(${bg})`,
            filter: `hue-rotate(${hueBg}deg)`
          }}
        >
          {/* LOGO */}
          <img
            src={logo}
            alt="Logo"
            className="w-[100px] absolute bottom-0 right-0"
            style={{ filter: `hue-rotate(${-hueBg}deg)` }}
          />
          {/* FUNDO IMG */}
          <div
            className="w-[215px] h-[300px] bg-cinza bg-cover bg-center absolute top-[71px] right-[-10px] rounded-l-[25px] shadow-padrao"
            style={{ 
              backgroundImage: `url(${selectedIMG.fundo})`,
              filter: `hue-rotate(${-hueBg}deg)`
            }}
          />

          {/* ITEM IMG */}
          {selectedIMG.item && (
            <img
              src={selectedIMG.item}
              alt="Logo"
              className="w-[370px] absolute top-[240px] right-[-60px] z-10"
              style={{ filter: `hue-rotate(${-hueBg}deg)`}}
            />
          )}

          {/* TITULO */}
          <div className="absolute top-[21px] left-[37px] flex items-center gap-3">
            <div className="bg-vermelho w-[50px] aspect-square p-[6px] rounded-[5px] shadow-padrao">
              {Object.entries(tipos).find((key) => key[0] === inf.tipo.replace('ç', 'c')) && (
                <img
                  src={
                    Object.entries(tipos).find((key) => key[0] === inf.tipo.replace('ç', 'c'))[1]
                  }
                  alt={
                    Object.entries(tipos).find((key) => key[0] === inf.tipo.replace('ç', 'c'))[1]
                  }
                  className="w-full relative top-[4px] opacity-70"
                />
              )}
            </div>

            <div className="pt-1">
              <h1 className="text-xl leading-5 font-bold text-preto">
                {inf.descricao.toUpperCase() || "Digite uma descrição"}
              </h1>
              <h2 className="text-base text-preto capitalize">
                {inf.consorcio || "Nome do consórcio"}
              </h2>
            </div>
          </div>
          <div className="w-1/2 absolute top-[126px] left-[15px] flex gap-5">

            {/* PRAZO */}
            <div className="absolute left-[36px] text-preto flex items-end gap-1">
              <div className="flex flex-col items-end">
                <p>Prazo de</p>
                <p className="text-[2rem] leading-6 font-bold text-vermelho relative left-[2px]">
                  {inf.prazo || "0"}
                </p>
              </div>
              <p className="relative top-2">meses</p>
            </div>

            <div className='flex flex-row-reverse h-max items-start justify-end gap-2 absolute top-[95px] bg-cinza shadow-padrao rounded-[10px] py-2 pr-5'>
              <div className="flex-col">
                <div className="self-end w-max absolute top-[-32px]">

                  {/* ENTRADA */}
                  <Informacao
                    titulo="Entrada de"
                    valor={`R$ ${inf.entrada || "0,00"}`}
                  />

                  {/* TRANSFERÊNCIA */}
                  <Informacao
                    className="text-[8px]"
                    titulo="Transferência"
                    valor={`R$ ${inf.transferencia || "0,00"}`}
                  />
                </div>

                {/* VALOR PAGO */}
                <Informacao
                  className="self-end"
                  titulo="Valor pago"
                  valor={`R$ ${inf.valorPago || "0,00"}`}
                />
                <div className="flex gap-1 text-[12px] items-end text-preto mt-[-10px] ">

                  {/* PARCELA FLEX */}
                  <p className="opacity-50">{`Parcela${check.valorParcelaFlex ? " flex" : ""}`}</p>
                  <div className="flex text-vermelho gap-[2px]">
                    <p className="text-[11px] self-end">R$</p>
                    <p className="text-[32px] font-bold relative top-2">
                      {check.valorParcelaFlex
                        ? inf.valorParcelaFlex.split(",")[0] || "0"
                        : inf.valorParcelaInt.split(",")[0] || "0"}
                    </p>
                    <p className="text-[15px] font-black self-start relative top-[15px]">{`,${check.valorParcelaFlex ? inf.valorParcelaFlex.split(",")[1] || "00" : inf.valorParcelaInt.split(",")[1] || "00"}`}</p>
                  </div>
                </div>

                {/* PARCELA INTEGRAL */}
                {check.valorParcelaFlex && (
                  <Informacao
                    titulo="Parcela integral"
                    valor={`R$ ${inf.valorParcelaInt || "0,00"}`}
                  />
                )}

                {/* + PARCELAS DE */}
                {check.maisParcelasDe && (
                  <Informacao
                    className="text-[8px]"
                    titulo={`+ ${inf.maisParcelasNum || "0"} parcelas de`}
                    valor={`R$ ${inf.maisParcelasValor || "0,00"}`}
                  />
                )}

                {/* SEGURO */}
                {check.seguro && (
                  <Informacao
                    className="text-[8px]"
                    titulo="+ Seguro de vida pf"
                    valor={`R$ ${inf.seguro || "0,00"}`}
                  />
                )}

              </div>

              {/* CRÉDITO */}
              <div className="flex flex-col items-end">
                <div className="bg-vermelho text-cinza mt-[-40px] flex flex-col items-center rounded-[10px] p-2 shadow-padrao">
                  <p className="text-[8px] absolute">Crédito de</p>
                  <div className="flex gap-[2px]">
                    <p className="text-[8px] self-end">R$</p>
                    <p className="text-[24px] font-bold relative top-[7px]">
                      {inf.credito || "00,00"}
                    </p>
                    <p className="text-[10px] font-black self-end relative top-[1px]">
                      {milhar === "mi"
                        ? inf.credito === "1"
                          ? "MILHÃO"
                          : "MILHÕES"
                        : milhar.toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col w-full h-full">

                  {/* UPGRADE */}
                  <div className={`self-end flex flex-col items-end w-max px-2 py-1 ${!check.upgrade && 'hidden'}`}>
                      <p className="text-[10px] opacity-50">Upgrade para</p>
                      <div className="flex items-end gap-[2px] relative top-[-6px] opacity-75">
                        <p className="text-[8px]">R$</p>
                        <p className="text-[20px] relative top-[5px] font-bold">{inf.upgrade || "00,00"}</p>
                        <p className="text-[10px] font-black">MIL</p>
                      </div>
                  </div>

                  {/* VENCIMENTO */}
                  <Informacao
                    className="absolute bottom-2 text-[8px] pl-2"
                    titulo="Vencimento"
                    valor={inf.vencimento || "00/00/0000"}
                  />
                </div>
              </div>
                {/* CONTATO */}
                <Informacao
                  className="absolute bottom-[-25px] text-[12px]"
                  titulo="Contato"
                  valor={inf.contato || "(00) 00000-0000"}
                />
            </div>


          </div>
        </div>
      </div>
    </section>
  );
};

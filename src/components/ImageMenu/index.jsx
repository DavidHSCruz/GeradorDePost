/* eslint-disable react/prop-types */
import { useState } from "react"

export const ImageMenu = ({ selected, setSelected, tipo: t }) => {
  const [opened, setOpened] = useState(false)
  const tipo = t + 's'
  const produtosList = {
    sem: [''],
    carros: ['BYD', 'Corolla', 'Jeep', 'Onix', 'Prisma'],
    motos: ['honda', 'kawasaki']
  }
  const fundoList = ['', 'carro1', 'carro2', 'carro3', 'carro4', 'moto1', 'moto2', 'moto3', 'casa1', 'casa2', 'casa3', 'casa4']
  
  const filtroProdutosList = () => {
    if (t !== 'casa') {
      return { sem: produtosList.sem, [tipo]: produtosList[tipo] || [] }
    }
    return {}
  }
  const filtroFundoList = fundoList.filter(item => item.startsWith(t))
  
  const [selectItem, setSelectItem] = useState('')

  return (
    <>
      {opened &&
        <div className="fixed top-0 left-0 w-full h-full bg-preto bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-cinza p-5 rounded-lg shadow-padrao max-h-[80vh]">
            <div className="flex justify-between bg-cinza pb-4">
              <h2 className="text-preto font-bold py-2">Imagens</h2>
              <button 
                  className="bg-preto bg-opacity-75 text-cinza font-bold py-2 px-4 rounded-[10px] hover:brightness-110 transition-all"
                  onClick={() => setOpened(!opened)}
              >Fechar</button>
            </div>
            <section className="mb-5 overflow-y-auto max-h-[60vh]">
              {Object.entries(filtroProdutosList()).map(([tipo, list], i) => {
                
                return (
                  <div key={i} className="mb-5">
                    <h3 className="text-preto mb-2 capitalize">{tipo}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">

                      {list.map((item, i) => (
                          <button 
                            key={i} 
                            className={`flex flex-col items-center border-2 rounded-[10px] border-opacity-50 bg-preto bg-opacity-10 hover:border-opacity-20 hover:border-preto transition-all
                              ${selectItem === item && 'border-vermelho bg-vermelho'}`
                            }
                            onClick={() => {
                              setSelectItem(item)
                              setSelected({
                                ...selected,
                                item: item ? `/imagens/produtos/${tipo}/${item.toLowerCase()}.png` : '' 
                              })
                            }}
                          >
                            <img src={`/imagens/produtos/${tipo}/${item.toLowerCase()}.png`} alt={item}
                              className="h-16 object-cover mb-2" />
                            <p className="text-preto text-[10px]">{item}</p>
                          </button>
                        )
                      )}

                    </div>
                  </div>
                )
              })}
              <div className="mb-5">
                  <h3 className="text-preto mb-2 capitalize">fundo</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">

                    {filtroFundoList.map((item, i) => (
                        <button 
                          key={i} 
                          className={`flex flex-col items-center border-2 rounded-[10px] border-opacity-50 bg-preto bg-opacity-10 hover:border-opacity-20 hover:border-preto transition-all
                            ${selectItem === item && 'border-vermelho bg-vermelho'}`
                          }
                          onClick={() => {
                            setSelectItem(item)
                            setSelected({
                              ...selected,
                              fundo: item ? `/imagens/fundo/${item.toLowerCase()}.png` : '' 
                            })
                          }}
                        >
                          <img src={`/imagens/fundo/${item.toLowerCase()}.png`} alt={item}
                            className="h-16 object-cover mb-2" />
                          <p className="text-preto text-[10px]">{item}</p>
                        </button>
                      )
                    )}
                  </div>
              </div>
            </section>
          </div>
        </div>
      }
      <button 
          className="bg-preto bg-opacity-75 text-cinza font-bold mt-4 py-2 px-4 rounded-[10px] hover:brightness-110 transition-all mb-5 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setOpened(!opened)}
          disabled={t === 'selecione'}
      >Selecionar Imagens</button>
    </>
  )
}

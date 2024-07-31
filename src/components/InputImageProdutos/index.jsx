import { useEffect } from "react"

export const InputImageProdutos = ({ quantidade, setSeletor1, setSeletor2, setSeletor3 }) => {
    let renders = []
    const tipos = {
        carros: ['BYD', 'Corolla', 'Jeep', 'Onix', 'Prisma'],
        motos: ['honda', 'kawasaki1', 'kawasaki2', 'suzuki'],
        caminhonetes: ['Canyon', 'Duster', 'Ranger'],
        imoveis: ['casa1', 'casa2', 'edifício']
    }
    useEffect(() => {
        setSeletor1('')
        setSeletor2('')
        setSeletor3('')
    }, [quantidade])

    for (let i = 1; i <= quantidade; i++) {
        let set
        switch(i) {
            case 1: set = setSeletor1; break
            case 2: set = setSeletor2; break
            case 3: set = setSeletor3; break
        }
        renders.push(
            <select key={i} onInput={e => set(e.target.value)}>
                {/* <optgroup label='Caminhonetes'>
                    { tipos.caminhonetes.map((carro, index) => (<option key={index} value={carro}>{carro}</option>)) }
                </optgroup> */}
                <option>Selecione...</option>
                <optgroup label='Carros'>
                    { tipos.carros.map((carro, index) => (
                        <option 
                            key={index} 
                            value={`/imagens/produtos/carros/${carro.toLowerCase()}.png`} 
                        >{carro}</option>))
                    }
                </optgroup>
                <optgroup label='Motos'>
                    { tipos.motos.map((carro, index) => (
                        <option 
                            key={index} 
                            value={`/imagens/produtos/motos/${carro.toLowerCase()}.png`}
                        >{carro}</option>)) 
                    }
                </optgroup>
                <optgroup label='Imóveis'>
                    { tipos.imoveis.map((carro, index) => (
                        <option 
                            key={index} 
                            value={`/imagens/produtos/imoveis/${carro.toLowerCase()}.png`}
                        >{carro}</option>)) 
                    }
                </optgroup>
            </select>
        )
    }
    
    return (
        <>
            {renders}
        </>
    );
}

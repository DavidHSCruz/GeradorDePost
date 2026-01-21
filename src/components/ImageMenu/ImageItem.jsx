import { useState } from "react"

export const ImageItem = ({ item, imagePath, isSelected, onSelect }) => {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <button 
            className={`flex flex-col items-center border-2 rounded-[10px] border-opacity-50 bg-preto bg-opacity-10 hover:border-opacity-20 hover:border-preto transition-all
              ${isSelected ? 'border-vermelho bg-vermelho' : ''}`
            }
            style={{ display: isVisible ? 'flex' : 'none' }}
            onClick={() => onSelect(item, imagePath)}
        >
            <img 
                src={imagePath}
                onLoad={() => setIsVisible(true)}
                onError={() => setIsVisible(false)}
                alt={item}
                className="h-16 object-cover mb-2" 
            />
            <p className="text-preto text-[10px]">{item}</p>
        </button>
    )
}

/* eslint-disable react/prop-types */
export const Informacao = ({titulo, valor, className}) => {
  return (
    <div className={`flex gap-1 text-[10px] text-preto ${className}`}>
        <p className="opacity-50">{titulo}</p>
        <p className="font-black opacity-75">{valor}</p>
    </div>
  )
}

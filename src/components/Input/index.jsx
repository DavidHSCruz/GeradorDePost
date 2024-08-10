
export const Input = ({ children, classLabel, value, setValue, placeholder, tipo = 'text' }) => {
    function reescreveData(e) {
        const data = e.target.value
        const [ano, mes, dia] = data.split('-')
        setValue(`${dia}/${mes}/${ano}`)
    }
    
    return (
        <label className={classLabel}>
            <p>{children}{children && ':'}</p>
            <input
                className="w-full border-b-2"
                type={tipo}
                placeholder={placeholder}
                onChange={(e) => { tipo !== 'date' ? setValue(e.target.value.replace(/[^\d.,]/g, '')) : reescreveData(e) }}
                value={value}
            />
        </label>
    )
}

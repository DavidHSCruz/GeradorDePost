
export const Input = ({ children, classLabel, value, setValue, placeholder, tipo = 'text', maxlength }) => {
    function reescreveData(e) {
        const data = e.target.value
        const [ano, mes, dia] = data.split('-')
        setValue(`${dia}/${mes}/${ano}`)
    }
    function reescreveContato(e) {
        let data = e.target.value.replace(/[^\d.,]/g, '')
        if (data.length <= 2) {
            data = data.replace(/(\d{2})/, '($1) ');
          } else if (data.length <= 7) {
            data = data.replace(/(\d{2})(\d{5})/, '($1) $2-');
          } else {
            data = data.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
          }
        setValue(data)
    }

    function setarValor(e) {
        switch (tipo) {
            case 'date':
                reescreveData(e)
                break;
            case 'contato':
                reescreveContato(e)
                break;
            default:
                setValue(e.target.value.replace(/[^\d.,]/g, ''))
                break;
        }
    }
    
    return (
        <label className={classLabel}>
            <p>{children}{children && ':'}</p>
            <input
                className="w-full border-b-2"
                type={tipo}
                placeholder={placeholder}
                onChange={(e) => { setarValor(e) }}
                value={value}
                maxlength={maxlength}
            />
        </label>
    )
}

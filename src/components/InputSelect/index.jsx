export const InputSelect = ({ children, descricoes, value, setValue }) => {
    return (
        <label>
            <p>{children}:</p>
            <select className="w-full border-b-2" value={value} onInput={(e) => setValue(e.target.value)}>
                <option value='Selecione uma opção...'>Selecione uma opção...</option>
                {descricoes.map((d, index) => <option key={index} value={d}>{d}</option>)
                }
            </select>
        </label>
    );
}
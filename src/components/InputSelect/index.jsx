export const InputSelect = ({ children, descricoes, value, setValue }) => {
    return (
        <label>
            <p>{children}:</p>
            <select className="w-full border-b-2" value={value} onInput={e => setValue(e.target.value)}>
                <option>Selecione uma opção...</option>
                {descricoes.map((d, i) => <option key={i} value={d}>{d}</option>)
                }
            </select>
        </label>
    );
}
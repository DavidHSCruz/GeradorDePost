
export const InputText = ({ children, classLabel, value, setValue, placeholder }) => {
    return (
        <label className={classLabel}>
            <p>{ children }{children && ':'}</p>
            <input
                className="w-full border-b-2"
                type="text"
                placeholder={placeholder}
                onChange={(e) => { setValue(e.target.value.replace(/[^\d.,]/g, '')) }}
                value={ value }
            />
        </label>
    )
}

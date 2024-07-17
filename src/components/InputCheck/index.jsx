export const InputCheck = ({ children, value, setValue }) => {
    return (
        <label className="flex gap-2 my-2">
            <p>{children}</p>
            <input
                type="checkbox"
                onChange={() =>
                    value ? setValue(false) : setValue(true)
                }
        />
        </label>
    );
}
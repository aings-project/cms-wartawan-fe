export default function InputText({ id, type, placeholder, value, onInputChange }) {

    return (
        <div className="flex flex-col content-start self-stretch place-items-start">
            <input
                id={id}
                type={type}
                className="
                    self-stretch font-body
                    block p-3 w-full text-lg text-gray-900 bg-gray-50 rounded-md border border-gray-300 
                    focus:border-2 focus:border-blue-500"
                placeholder={placeholder}
                value={value}
                onChange={onInputChange}>
            </input>
        </div>
    );
}
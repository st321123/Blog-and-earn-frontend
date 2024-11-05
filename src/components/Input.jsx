export function InputBox({type,placeholder,label, onChange,required ,value,name}){
    return (<div className="text-slate-500 text-md pt-1 px-4 pb-4">
        <div className="flex justify-left text-black font-medium">
        {label}
        </div>
        <input value={value} name={name} required = {required} onChange = {onChange} type={type} placeholder= {placeholder} className="w-full px-2 py-1 border rounded border-slate-200" />
    </div>)
}
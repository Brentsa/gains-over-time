import { ChangeEvent } from "react";

interface Props {
    className: string,
    id: string, 
    name: string,
    value: string | number,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    disabled?: boolean
    label?: string,
    placeholder?: string, 
    type?: string,
    min?: number,
    max?: number,
    required?: boolean,
    autofocus?: boolean,
    customClassName?: string,
    autoComplete?: string
    step?: string
}

export default function FormInput(props: Props){

    const {className, id, name, value, onChange} = props;

    const inputClasses = "appearance-none shadow-inner rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-1 focus:ring-violet-400 focus:border-violet-400 disabled:text-gray-400 focus:z-20 z-10 sm:text-sm";

    return (
        <div className={className}>
            <label htmlFor={id} className="text-sm">
                {props?.label}
            </label>
            <input
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className={props?.customClassName ?? inputClasses}
                placeholder={props?.placeholder}
                type={props?.type}
                min={props?.min}
                max={props?.max}
                required={props?.required}
                disabled={props?.disabled}
                autoFocus={props?.autofocus}
                autoComplete={props?.autoComplete}
                step={props?.step}
            />
        </div>
    );
}
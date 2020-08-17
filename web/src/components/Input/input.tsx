import React, { InputHTMLAttributes } from 'react'

import './inputST.css'

interface Inputprops extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
    label: string;
}


const Input: React.FC<Inputprops> = ({name, label, ...rest}) => {

    return (
        <div className="input-block">
            <label htmlFor={name}> {label} </label>
            <input type="text" id={name} {...rest} />
        </div>
    )
}


export default Input
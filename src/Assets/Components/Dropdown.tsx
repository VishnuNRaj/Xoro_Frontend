import React, { useState } from 'react';
interface dropDownProps {
    options: {
        value: number,
        label: string,
    }[];
    onSelect: Function;
    Label: string;
}

const Dropdown: React.FC<dropDownProps> = ({ Label, options, onSelect }) => {
    const [select, setSelect] = useState('')
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelect(selectedValue);
        onSelect(selectedValue);
    };

    return (
        <select className='text-white bg-black font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center border-2 border-white mt-3' value={select} onChange={handleChange}>
            <option className='z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700' value="">{Label}</option>
            {options && options.map((option) => (
                <option className='py-2 text-sm text-gray-700 dark:text-gray-200' key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;

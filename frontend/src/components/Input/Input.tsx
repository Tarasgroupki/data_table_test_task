import React from "react";
import {useEffect, useState} from "react";

interface CustomInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    validationRegex?: RegExp; // Optional prop to pass a custom regex
    placeholder?: string;
    name?: string;
    type?: string;
    className?: string;
}

const Input: React.FC<CustomInputProps> =
    ({
         value,
         onChange,
         validationRegex = /.*/,
         placeholder = "E-mailadres",
         name = "email",
         type = "text",
         className = "",
     }) => {
    const [error, setError] = useState("");

    useEffect(() => {
        if (value && !validationRegex.test(value)) {
            setError("Please enter a valid email address.");
        } else {
            setError("");
        }
    }, [value, validationRegex]);

    return (
        <div className={className}>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`border rounded-md w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    error ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                }`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default Input;
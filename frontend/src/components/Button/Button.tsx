import React from "react";

interface ButtonProps {
    text: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; // Change to MouseEvent for button click
    name?: string;
    type?: "button" | "submit";
    className?: string;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> =
    ({
       text,
       onClick,
       name,
       type = "button",
       className = "",
       disabled = false,
   }) => {
    return (
        <button
            type={type}
            name={name}
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 rounded-md transition duration-300 ease-in-out 
                        ${disabled
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'} 
                        ${className}`}
        >
            {text}
        </button>
    );
};

export default Button;
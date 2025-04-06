import React from "react";

function Input({
  placeholder,
  type,
  name,
  id,
  value,
  onChange,
}: {
  placeholder: string;
  type: string;
  name: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="text-black border border-[#cccccc] rounded-lg p-3 shadow-sm outline-none text-sm"
    />
  );
}

export default Input;

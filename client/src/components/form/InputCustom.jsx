import React from "react";

function InputCustom({
  label,
  type,
  id,
  placeholder = "",
  HandleChange,
  required,
  value = null,
}) {

  return (
    <div>
      <label className="block mb-2 text-base font-medium text-gray-900 ">
        {label}
      </label>
      {value && value[id] ? (
        <input
          type={type}
          id={id}
          value={type === "date" && value[id] ? value[id].slice(0, 10) : value[id]}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:outline-none focus:ring-4 focus:border-indigo-400  focus:ring-indigo-100 block w-full p-2.5 `}
          placeholder={placeholder}
          required={required}
          onChange={HandleChange}
        />
      ) : (
        <input
          type={type}
          id={id}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:outline-none focus:ring-4 focus:border-indigo-400  focus:ring-indigo-100 block w-full p-2.5 `}
          placeholder={placeholder}
          required={required}
          onChange={HandleChange}
        />
      )}
    </div>
  );
}

export default InputCustom;

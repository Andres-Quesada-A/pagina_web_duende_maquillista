import React from "react";

function SelectCustom({
  label,
  id,
  HandleChange,
  required,
  options,
  value = null,
}) {
  return (
    <div>
      <label className="block mb-2 text-base font-medium text-gray-900 ">
        {label}
      </label>
      <select
        id={id}
        onChange={HandleChange}
        required={required}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 block w-full p-2.5 "
      >
        {value && value[id]
          ? options.map((item, index) => (
              <option
                key={index}
                value={item.value}
                selected={value[id] == item.value}
              >
                {item.label}
              </option>
            ))
          : options.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
      </select>
    </div>
  );
}

export default SelectCustom;

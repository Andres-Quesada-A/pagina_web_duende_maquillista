import React from "react";

function TextareaCustom({
  label,
  id,
  placeholder = "",
  HandleChange,
  required,
  Height,
  data,
}) {
  return (
    <div>
      <label className="block mb-2 text-base font-medium text-gray-900 ">
        {label}
      </label>
      {data && data[id] ? (
        <textarea
          id={id}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 block w-full ${
            Height
              ? "max-h-[300px] min-h-[300px]"
              : "max-h-[120px] min-h-[120px]"
          } p-2.5 resize-none `}
          placeholder={placeholder}
          required={required}
          onChange={HandleChange}
          value={data[id] ?? ""}
        />
      ) : (
        <textarea
          id={id}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 block w-full ${
            Height
              ? "max-h-[300px] min-h-[300px]"
              : "max-h-[120px] min-h-[120px]"
          } p-2.5 resize-none `}
          placeholder={placeholder}
          required={required}
          onChange={HandleChange}
        />
      )}
    </div>
  );
}

export default TextareaCustom;

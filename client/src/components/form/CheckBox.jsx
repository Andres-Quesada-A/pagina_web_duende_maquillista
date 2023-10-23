import React from "react";

function CheckBox({ label, id, HandleChange, data }) {
  return (
    <div className="flex">
      {data && data[id] ? (
        <input
          type="checkbox"
          id={id}
          checked={data[id] ?? false}
          className="cursor-pointer bg-gray-50 border-blue-300 rounded-xl min-h-[16px] max-h-[16px] min-w-[16px] max-w-[16px]"
          onChange={HandleChange}
        />
      ) : (
        <input
          type="checkbox"
          id={id}
          className="cursor-pointer bg-gray-50 border-blue-300 rounded-xl min-h-[16px] max-h-[16px] min-w-[16px] max-w-[16px]"
          onChange={HandleChange}
        />
      )}

      <label className="mb-2 pl-2 text-base font-medium text-gray-900" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

export default CheckBox;

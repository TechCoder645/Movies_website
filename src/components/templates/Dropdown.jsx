import React from "react";

const Dropdown = ({ title, options, func }) => {
  return (
    <div className="select relative inline-block min-w-[120px]">
      <select
        name="format"
        id="format"
        onChange={func}
        placeholder={title}
        className="w-full p-2 bg-zinc-800 rounded-md appearance-none cursor-pointer pr-8 text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#6556CD]"
      >
        <option value="" disabled selected>
          {title}
        </option>

        {options.map((option, i) => (
          <option key={i} value={option} className="bg-zinc-800 text-zinc-400">
            {option.toUpperCase()}
          </option>
        ))}
      </select>
      <span className="dropdown-icon absolute right-2 top-1/2 transform -translate-y-1/2 text-zinc-400 pointer-events-none">
        ▼
      </span>
    </div>
  );
};

export default Dropdown;

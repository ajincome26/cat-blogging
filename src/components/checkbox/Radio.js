import React from "react";
import { useController } from "react-hook-form";
import { BsCheck } from "react-icons/bs";

const RadioHook = ({ children, title, control, checked, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: props.value,
  });
  return (
    <label className="cursor-pointer radio-custom">
      <input
        type="radio"
        className="hidden"
        checked={checked}
        {...field}
        {...props}
      />
      <div className="flex items-center gap-3">
        <div
          className={`w-[25px] h-[25px] ${
            checked ? "bg-secondary" : "bg-white"
          } rounded-full cursor-pointer transition-all ease-linear duration-200`}
        >
          {checked && (
            <div className="flex items-center justify-center w-full h-full">
              <BsCheck color="white" size={20} />
            </div>
          )}
        </div>
        <span className="">{title}</span>
      </div>
    </label>
  );
};

export default RadioHook;

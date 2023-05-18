import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Input from "./Input";

const InputTogglePassword = ({ control }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  if (!control) return null;
  return (
    <Input
      name="password"
      type={togglePassword ? "text" : "password"}
      placeholder="Enter your password"
      control={control}
    >
      {togglePassword ? (
        <AiOutlineEyeInvisible
          className="icon"
          onClick={() => setTogglePassword((prev) => !prev)}
        />
      ) : (
        <AiOutlineEye
          className="icon"
          onClick={() => setTogglePassword((prev) => !prev)}
        />
      )}
    </Input>
  );
};

export default InputTogglePassword;

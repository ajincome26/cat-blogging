import { Button } from "components/button";
import { Field } from "components/field";
import { Input, InputTogglePassword } from "components/input";
import { Label } from "components/label";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthenPage from "./AuthenPage";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase-app/firebase-config";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "contexts/auth-context";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Please enter valid email address")
      .required("Please enter your email address"),
    password: yup
      .string()
      .min(8, "Your password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Your password must have at least 1 uppercase, 1 lowercase, 1 number and 1 special character",
        }
      )
      .required("Please enter your password"),
  })
  .required();

const SignInPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const errorArray = Object.values(errors);
  useEffect(() => {
    toast.error(errorArray.length > 0 && errorArray[0].message, {
      pauseOnHover: false,
      delay: 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const { userInfo } = useAuth();
  useEffect(() => {
    document.title = "Login Page";
    if (userInfo?.email) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignIn = async (values) => {
    if (!isValid) return;
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast.success("Login Successfully");
      navigate("/");
    } catch (error) {
      if (error.message.includes("wrong-password"))
        toast.error("It seems your password was wrong");
      if (error.message.includes("user-not-found"))
        toast.error("Your email is invalid");
    }
  };
  return (
    <AuthenPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignIn)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor={"email"}>Email Address</Label>
          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            control={control}
          />
        </Field>
        <Field>
          <Label htmlFor={"password"}>Password</Label>
          <InputTogglePassword control={control} />
        </Field>
        <Button
          type="submit"
          width="225px"
          height="48px"
          margin="30px auto 0"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign In
        </Button>
        <div className="swap-account">
          Don't have an account yet?
          <Link to="/sign-up" className="swap-link">
            Register here
          </Link>
        </div>
      </form>
    </AuthenPage>
  );
};

export default SignInPage;

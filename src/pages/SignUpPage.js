import { Input, InputTogglePassword } from "components/input";
import { Label } from "components/label";
import React from "react";
import { useForm } from "react-hook-form";
import { Field } from "components/field";
import { Button } from "components/button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { auth, db } from "firebase-app/firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import AuthenPage from "./AuthenPage";
import slugify from "slugify";
import { userRole, userStatus } from "utils/constants";

const schema = yup
  .object({
    fullname: yup.string().required("Please enter your fullname"),
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

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const errorArray = Object.values(errors);
  useEffect(() => {
    toast.error(errorArray.length > 0 && errorArray[0].message, {
      pauseOnHover: false,
      delay: 0,
    });
  }, [errorArray, errors]);

  useEffect(() => {
    document.title = "Register Page";
  }, []);

  const handleSignUp = async (values) => {
    if (!isValid) return;
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      await updateProfile(auth.currentUser, {
        displayName: values.fullname,
        photoURL:
          "https://us.123rf.com/450wm/tanyadanuta/tanyadanuta1910/tanyadanuta191000003/148019275-hand-drawn-modern-man-avatar-profile-icon-or-portrait-icon-user-flat-avatar-icon-sign-profile.jpg?ver=6",
      });
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        slug: slugify(values.fullname, { lower: true }),
        avatar:
          "https://us.123rf.com/450wm/tanyadanuta/tanyadanuta1910/tanyadanuta191000003/148019275-hand-drawn-modern-man-avatar-profile-icon-or-portrait-icon-user-flat-avatar-icon-sign-profile.jpg?ver=6",
        status: userStatus.ACTIVE,
        role: userRole.USER,
        createdAt: serverTimestamp(),
      });
      toast.success("Register Successfully !", { pauseOnHover: false });
      navigate("/sign-in");
    } catch (error) {
      if (error.message.includes("auth/email-already-in-use"))
        toast.error("Email already in use");
    }
  };

  return (
    <AuthenPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignUp)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor={"fullname"}>Fullname</Label>
          <Input
            name="fullname"
            placeholder="Enter your fullname"
            control={control}
          />
        </Field>
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
          Sign Up
        </Button>
        <div className="swap-account">
          Have already an account?
          <Link to="/sign-in" className="swap-link">
            Login here
          </Link>
        </div>
      </form>
    </AuthenPage>
  );
};

export default SignUpPage;

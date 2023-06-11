import useFirebaseImage from "hooks/useFirebaseImage";
import slugify from "slugify";
import React, { useEffect } from "react";
import ImageUpload from "components/image/ImageUpload";
import CategoryHeading from "module/category/CategoryHeading";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { userRole, userStatus } from "utils/constants";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Radio } from "components/checkbox";
import { Label } from "components/label";
import { Input } from "components/input";
import { Field } from "components/field";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Button } from "components/button";
import { auth, db } from "firebase-app/firebase-config";
import { Textarea } from "components/textarea";

const schema = yup
  .object({
    fullname: yup.string().required("Please enter your fullname"),
    username: yup.string().required("Please enter your username"),
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
    textarea: yup.string().required("Please enter your textarea"),
  })
  .required();

const UserAddNew = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      avatar: "",
      fullname: "",
      username: "",
      email: "",
      password: "",
      status: userStatus.ACTIVE,
      role: userRole.USER,
      textarea: "",
      createdAt: new Date(),
    },
    resolver: yupResolver(schema),
  });

  const watchStatus = watch("status");
  const watchRole = watch("role");
  const {
    progress,
    url,
    resetImageField,
    handleSelectImages,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues);

  useEffect(() => {
    document.title = "Cat Create User";
  }, []);

  const errorArray = Object.values(errors);
  useEffect(() => {
    toast.error(errorArray.length > 0 && errorArray[0].message, {
      pauseOnHover: false,
      delay: 0,
    });
  }, [errorArray, errors]);

  const handleNewUser = async (values) => {
    if (!isValid) return;
    const cloneValues = { ...values };
    cloneValues.status = Number(cloneValues.status);
    cloneValues.role = Number(cloneValues.role);
    try {
      await createUserWithEmailAndPassword(
        auth,
        cloneValues.email,
        cloneValues.password
      );
      await updateProfile(auth.currentUser, {
        displayName: cloneValues.username,
        photoURL: url,
      });
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        avatar: url,
        fullname: cloneValues.fullname,
        username: slugify(cloneValues.username, { lower: true }),
        email: cloneValues.email,
        password: cloneValues.password,
        status: Number(cloneValues.status),
        role: Number(cloneValues.role),
        textarea: cloneValues.textarea,
        createdAt: serverTimestamp(),
      });
      toast.success("Create User Successfully");
      navigate("/manage/profile");
    } catch (error) {
      toast.error(error.message);
    } finally {
      reset({
        avatar: "",
        fullname: "",
        username: "",
        email: "",
        password: "",
        status: userStatus.ACTIVE,
        role: userRole.USER,
        textarea: "",
        createdAt: new Date(),
      });
      resetImageField();
    }
  };
  return (
    <form onSubmit={handleSubmit(handleNewUser)}>
      <CategoryHeading title="New User" desc="Add new user to system" />
      {/* Image */}
      <div className="w-[250px] h-[250px] rounded-full mx-auto overflow-hidden mt-[2rem]">
        <Field>
          <ImageUpload
            onChange={handleSelectImages}
            progress={progress}
            url={url}
            className="h-[250px]"
            handleDeleteImage={handleDeleteImage}
          />
        </Field>
      </div>
      <div className="grid-field">
        {/* Full Name */}
        <Field>
          <Label htmlFor={"fullname"}>Full Name</Label>
          <Input
            name="fullname"
            placeholder="Enter your fullname"
            bgColor="#ccd0d7"
            control={control}
          />
        </Field>
        {/* User Name */}
        <Field>
          <Label htmlFor={"username"}>User Name</Label>
          <Input
            name="username"
            placeholder="Enter your username"
            bgColor="#ccd0d7"
            control={control}
          />
        </Field>
        {/* Email */}
        <Field>
          <Label htmlFor={"email"}>Email</Label>
          <Input
            name="email"
            placeholder="Enter your email address"
            bgColor="#ccd0d7"
            control={control}
          />
        </Field>
        {/* Password */}
        <Field>
          <Label htmlFor={"password"}>Password</Label>
          <Input
            name="password"
            placeholder="Enter your password"
            bgColor="#ccd0d7"
            control={control}
          />
        </Field>
        {/* Status */}
        <Field>
          <Label>Status</Label>
          <div className="flex flex-wrap items-center gap-10">
            <Radio
              control={control}
              name="status"
              value={userStatus.ACTIVE}
              checked={Number(watchStatus) === userStatus.ACTIVE}
              title="Active"
            ></Radio>
            <Radio
              control={control}
              name="status"
              value={userStatus.PENDING}
              checked={Number(watchStatus) === userStatus.PENDING}
              title="Pending"
            ></Radio>
            <Radio
              control={control}
              name="status"
              value={userStatus.BAN}
              checked={Number(watchStatus) === userStatus.BAN}
              title="Banned"
            ></Radio>
          </div>
        </Field>
        {/* Roles */}
        <Field>
          <Label>Role</Label>
          <div className="flex flex-wrap items-center gap-10">
            <Radio
              control={control}
              name="role"
              value={userRole.ADMIN}
              checked={Number(watchRole) === userRole.ADMIN}
              title="Admin"
            ></Radio>
            <Radio
              control={control}
              name="role"
              value={userRole.MOD}
              checked={Number(watchRole) === userRole.MOD}
              title="Moderator"
            ></Radio>
            <Radio
              control={control}
              name="role"
              value={userRole.USER}
              checked={Number(watchRole) === userRole.USER}
              title="User"
            ></Radio>
          </div>
        </Field>
        {/* Desc */}
        <Field>
          <Label>Description</Label>
          <Textarea
            name="textarea"
            placeholder="Enter your description"
            bgColor="#ccd0d7"
            control={control}
          />
        </Field>
      </div>
      <Button
        type="submit"
        width="200px"
        height="48px"
        margin="30px auto 0"
        padding="12px 30px"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        Add New User
      </Button>
    </form>
  );
};

export default UserAddNew;

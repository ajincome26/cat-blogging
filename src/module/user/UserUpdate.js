import useFirebaseImage from "hooks/useFirebaseImage";
import slugify from "slugify";
import React from "react";
import ImageUpload from "components/image/ImageUpload";
import CategoryHeading from "module/category/CategoryHeading";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { userRole, userStatus } from "utils/constants";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Radio } from "components/checkbox";
import { Label } from "components/label";
import { Input } from "components/input";
import { Field } from "components/field";
import { db } from "firebase-app/firebase-config";
import { Button } from "components/button";
import { Textarea } from "components/textarea";
import { doc, getDoc, updateDoc } from "firebase/firestore";

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

const UserUpdate = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const userId = params.get("id");
  const {
    control,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const errorArray = Object.values(errors);
  useEffect(() => {
    toast.error(errorArray.length > 0 && errorArray[0].message, {
      pauseOnHover: false,
      delay: 0,
    });
  }, [errorArray, errors]);
  const watchStatus = watch("status");
  const watchRole = watch("role");

  // IMAGE
  const imageUrl = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName = imageRegex ? imageRegex[1] : "";

  const callback = async () => {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
      avatar: "",
    });
  };

  const { url, setURL, progress, handleSelectImages, handleDeleteImage } =
    useFirebaseImage(getValues, setValue, imageName, callback);

  useEffect(() => {
    setURL(imageUrl);
  }, [imageUrl, setURL]);

  // --------------------- //
  useEffect(() => {
    async function getUserById() {
      const docRef = doc(db, "users", userId);
      const user = await getDoc(docRef);
      reset(user.data());
    }
    getUserById();
  }, [reset, userId]);
  if (!userId) return null;

  const handleUpdateUser = async (values) => {
    if (!isValid) return;
    const docRef = doc(db, "users", userId);
    try {
      await updateDoc(docRef, {
        ...values,
        avatar: url,
        username: slugify(values.username || values.fullname, { lower: true }),
      });
      toast.success("Update user successfully");
      navigate("/manage/profile");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleUpdateUser)}>
      <CategoryHeading title="Update User" desc={`Your user id: ${userId}`} />
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
          <div className="flex items-center gap-10">
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
          <div className="flex items-center gap-10">
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
        Update User
      </Button>
    </form>
  );
};

export default UserUpdate;

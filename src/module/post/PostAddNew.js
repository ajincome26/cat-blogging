import useFirebaseImage from "hooks/useFirebaseImage";
import styled from "styled-components";
import slugify from "slugify";
import React, { useState } from "react";
import ImageUpload from "components/image/ImageUpload";
import CategoryHeading from "module/category/CategoryHeading";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAuth } from "contexts/auth-context";
import { Toggle } from "components/toggle";
import { toast } from "react-toastify";
import { Radio } from "components/checkbox";
import { listStatus } from "utils/constants";
import { Label } from "components/label";
import { Input } from "components/input";
import { Field } from "components/field";
import { Dropdown, List, Option, Select } from "components/dropdown";
import { db } from "firebase-app/firebase-config";
import { Button } from "components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

const PostAddNewStyle = styled.div`
  width: 100%;
  .post {
    padding: 2rem;
  }
  @media (min-width: 375px) {
    .post {
      padding: 0;
    }
  }
  @media (min-width: 768px) {
    .post {
      padding: 1rem;
    }
  }
`;

const schema = yup
  .object({
    title: yup.string().required("Please enter your title"),
    slug: yup.string().required("Please enter your slug"),
  })
  .required();

const PostAddNew = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      hot: false,
      category: {},
      user: {},
      status: 2,
    },
    resolver: yupResolver(schema),
  });
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const {
    progress,
    url,
    resetImageField,
    handleSelectImages,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues);
  const { userInfo } = useAuth();

  useEffect(() => {
    document.title = "Cat Add Post";
  }, []);

  const errorArray = Object.values(errors);
  useEffect(() => {
    toast.error(errorArray.length > 0 && errorArray[0].message, {
      pauseOnHover: false,
      delay: 0,
    });
  }, [errorArray, errors]);

  useEffect(() => {
    const colRef = collection(db, "categories");
    const q = query(colRef, where("status", "==", 1));
    const result = [];
    onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
        setCategories(result);
      });
    });
  }, []);

  const handleClickOption = async (e) => {
    setValue("category", {
      id: e.target.dataset?.id,
      name: e.target.dataset?.name,
      slug: e.target.dataset?.slug,
      status: e.target.dataset?.status,
    });
    setCategory(e.target.textContent);
  };

  useEffect(() => {
    async function getUserByEmail() {
      if (!userInfo) return;
      const colRef = collection(db, "users");
      const q = query(colRef, where("email", "==", userInfo?.email));
      const querySnaps = await getDocs(q);
      querySnaps.forEach((doc) => {
        setValue("user", {
          id: doc.id,
          ...doc.data(),
        });
      });
    }
    getUserByEmail();
  }, [setValue, userInfo, userInfo?.email]);

  const handleNewPost = async (values) => {
    const cloneValues = { ...values };
    cloneValues.slug = slugify(values.slug || values.title, { lower: true });
    cloneValues.status = Number(values.status);
    const colRef = collection(db, "posts");
    try {
      await addDoc(colRef, {
        ...cloneValues,
        url,
        createdAt: serverTimestamp(),
      });
      toast.success("Create Post Successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      reset({
        title: "",
        slug: "",
        hot: false,
        status: 2,
        url: "",
        category: {},
        user: {},
      });
      resetImageField();
      setCategory("");
    }
  };

  return (
    <PostAddNewStyle>
      <form className="post" onSubmit={handleSubmit(handleNewPost)}>
        <CategoryHeading title="Add New Post" desc="Create your post" />
        <div className="grid-field">
          {/* Title */}
          <Field>
            <Label htmlFor={"title"}>Title</Label>
            <Input
              name="title"
              placeholder="Enter your title"
              bgColor="#ccd0d7"
              control={control}
            />
          </Field>
          {/* Slug */}
          <Field>
            <Label htmlFor={"slug"}>Slug</Label>
            <Input
              name="slug"
              placeholder="Enter your slug"
              bgColor="#ccd0d7"
              control={control}
            />
          </Field>
          {/* Feature Post */}
          <Field>
            <Label>Feature Post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
          {/* Status */}
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-10 min-[375px]:flex-wrap">
              <Radio
                control={control}
                name="status"
                value={listStatus.APPROVED}
                checked={Number(watchStatus) === listStatus.APPROVED}
                title="Approved"
              ></Radio>
              <Radio
                control={control}
                name="status"
                value={listStatus.PENDING}
                checked={Number(watchStatus) === listStatus.PENDING}
                title="Pending"
              ></Radio>
              <Radio
                control={control}
                name="status"
                value={listStatus.REJECT}
                checked={Number(watchStatus) === listStatus.REJECT}
                title="Rejected"
              ></Radio>
            </div>
          </Field>
          {/* Image */}
          <Field>
            <Label>Image</Label>
            <ImageUpload
              onChange={handleSelectImages}
              progress={progress}
              url={url}
              className="h-[250px]"
              handleDeleteImage={handleDeleteImage}
            />
          </Field>
          {/* Category */}
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Select label="Select your category" />
              <List setValue={setValue} name="category">
                {categories.map((item) => (
                  <Option
                    key={item.id}
                    handleClickOption={handleClickOption}
                    item={item}
                  />
                ))}
              </List>
            </Dropdown>
            {category !== "Select your job" && category !== "" && (
              <span className="px-4 py-2 text-sm text-green-600 bg-green-300 rounded-md">
                {category}
              </span>
            )}
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
          Create Post
        </Button>
      </form>
    </PostAddNewStyle>
  );
};

export default PostAddNew;

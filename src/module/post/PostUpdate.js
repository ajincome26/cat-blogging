import useFirebaseImage from "hooks/useFirebaseImage";
import slugify from "slugify";
import React, { useState } from "react";
import ImageUpload from "components/image/ImageUpload";
import CategoryHeading from "module/category/CategoryHeading";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
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
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import axios from "axios";
import { imgbbAPI } from "config/imgbbAPI";

Quill.register("modules/imageUploader", ImageUploader);

const schema = yup
  .object({
    title: yup.string().required("Please enter your title"),
    slug: yup.string().required("Please enter your slug"),
  })
  .required();

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["link", "image"],
  ],
  imageUploader: {
    upload: async (file) => {
      const bodyFormData = new FormData();
      bodyFormData.append("image", file);
      const response = await axios({
        method: "POST",
        url: imgbbAPI,
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.data.url;
    },
  },
};

const PostUpdate = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const postId = params.get("id");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState("");
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { isSubmitting, isValid, errors },
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

  useEffect(() => {
    document.title = "Cat Update Post";
  }, []);

  const errorArray = Object.values(errors);
  useEffect(() => {
    toast.error(errorArray.length > 0 && errorArray[0].message, {
      pauseOnHover: false,
      delay: 0,
    });
  }, [errorArray, errors]);

  // IMAGE + CATEGORY
  const imageUrl = getValues("url");
  const imageName = getValues("image-name");
  const categoryInfo = getValues("category");
  const callback = async () => {
    const docRef = doc(db, "posts", postId);
    await updateDoc(docRef, {
      url: "",
    });
  };
  const { progress, url, setURL, handleSelectImages, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, imageName, callback);
  useEffect(() => {
    setURL(imageUrl);
    setCategory(categoryInfo.name);
  }, [categoryInfo, imageUrl, setURL]);

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

  // reset to field
  useEffect(() => {
    async function getPostById() {
      const docRef = doc(db, "posts", postId);
      const post = await getDoc(docRef);
      reset(post.data());
      setContent(post.data()?.content || "");
    }
    getPostById();
  }, [postId, reset]);

  const handleUpdatePost = async (values) => {
    if (!isValid) return;
    const cloneValues = { ...values };
    cloneValues.slug = slugify(values.slug || values.title, { lower: true });
    cloneValues.status = Number(values.status);
    const docRef = doc(db, "posts", postId);

    try {
      await updateDoc(docRef, {
        ...cloneValues,
        url,
        content,
      });

      toast.success("Update post successfully");
      navigate("/manage/posts");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <form className="post" onSubmit={handleSubmit(handleUpdatePost)}>
      <CategoryHeading title="Post Update" desc={`Your post id: ${postId}`} />
      <div className="grid-field">
        {/* Title */}
        <Field>
          <Label htmlFor={"title"}>Title</Label>
          <Input
            name="title"
            placeholder="Enter your title"
            bgColor="#ccd0d7"
            control={control}
            required
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
          <div className="flex items-center gap-10">
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
              {category || "loading..."}
            </span>
          )}
        </Field>
      </div>
      <div className="mt-[1rem] w-full">
        <Field>
          <Label>Content</Label>
          <ReactQuill
            theme="snow"
            modules={modules}
            value={content}
            onChange={setContent}
            className="w-full entry-content"
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
        Update Post
      </Button>
    </form>
  );
};

export default PostUpdate;

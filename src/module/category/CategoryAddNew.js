import slugify from "slugify";
import React from "react";
import CategoryHeading from "./CategoryHeading";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Radio } from "components/checkbox";
import { listStatusCate } from "utils/constants";
import { Label } from "components/label";
import { Input } from "components/input";
import { Field } from "components/field";
import { db } from "firebase-app/firebase-config";
import { Button } from "components/button";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useEffect } from "react";

const CategoryAddNew = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
      createdAt: new Date(),
    },
  });
  const watchStatus = watch("status");

  useEffect(() => {
    document.title = "Cat Create Category";
  }, []);

  const handleNewCategory = async (values) => {
    if (!isValid) return;
    const cloneValues = { ...values };
    cloneValues.slug = slugify(values.slug || values.name, { lower: true });
    cloneValues.status = Number(cloneValues.status);
    const colRef = collection(db, "categories");
    try {
      await addDoc(colRef, {
        ...cloneValues,
        createdAt: serverTimestamp(),
      });
      toast.success("Create Category Successfully");
      navigate("/manage/categories");
    } catch (error) {
      toast.error(error.message);
    } finally {
      reset({
        name: "",
        slug: "",
        status: 1,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(handleNewCategory)}>
      <CategoryHeading title="New Category" desc="Add new category" />
      <div className="grid-field">
        {/* Name */}
        <Field>
          <Label htmlFor={"name"}>Name</Label>
          <Input
            name="name"
            placeholder="Enter your category name"
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
        {/* Status */}
        <Field>
          <Label>Status</Label>
          <div className="flex items-center gap-10">
            <Radio
              control={control}
              name="status"
              value={listStatusCate.APPROVED}
              checked={Number(watchStatus) === listStatusCate.APPROVED}
              title="Approved"
            ></Radio>
            <Radio
              control={control}
              name="status"
              value={listStatusCate.UNAPPROVED}
              checked={Number(watchStatus) === listStatusCate.UNAPPROVED}
              title="Unapproved"
            ></Radio>
          </div>
        </Field>
      </div>
      <Button
        type="submit"
        width="220px"
        height="48px"
        margin="30px auto 0"
        padding="12px 25px"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        Add New Category
      </Button>
    </form>
  );
};

export default CategoryAddNew;

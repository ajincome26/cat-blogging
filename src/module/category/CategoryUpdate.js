import slugify from "slugify";
import React from "react";
import CategoryHeading from "./CategoryHeading";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Radio } from "components/checkbox";
import { listStatusCate } from "utils/constants";
import { Label } from "components/label";
import { Input } from "components/input";
import { Field } from "components/field";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { Button } from "components/button";

const CategoryUpdate = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const categoryId = params.get("id");
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      createdAt: new Date(),
    },
  });
  const watchStatus = watch("status");
  useEffect(() => {
    async function getCategoryById() {
      const docRef = doc(db, "categories", categoryId);
      const category = await getDoc(docRef);
      reset(category.data());
    }
    getCategoryById();
  }, [categoryId, reset]);
  if (!categoryId) return null;

  const handleUpdateCategory = async (values) => {
    try {
      await updateDoc(doc(db, "categories", categoryId), {
        name: values.name,
        slug: slugify(values.slug || values.name, { lower: true }),
        status: values.status,
      });
      toast.success("Update category successfully");
      navigate("/manage/categories");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleUpdateCategory)}>
      <CategoryHeading
        title="Update Category"
        desc={`Your category id: ${categoryId}`}
      />
      <div className="grid-field">
        {/* Name */}
        <Field>
          <Label htmlFor={"name"}>Name</Label>
          <Input name="name" bgColor="#ccd0d7" control={control} required />
        </Field>
        {/* Slug */}
        <Field>
          <Label htmlFor={"slug"}>Slug</Label>
          <Input name="slug" bgColor="#ccd0d7" control={control} />
        </Field>
        {/* Status */}
        <Field>
          <Label>Status</Label>
          <div className="flex flex-wrap items-center gap-10">
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
        width="200px"
        height="48px"
        margin="30px auto 0"
        padding="12px 30px"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        Update Category
      </Button>
    </form>
  );
};

export default CategoryUpdate;

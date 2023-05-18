import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "components/button";
import { Field } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { Textarea } from "components/textarea";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { MdWavingHand } from "react-icons/md";
import { HiArrowUpRight } from "react-icons/hi2";
import { useEffect } from "react";

const schema = yup
  .object({
    name: yup.string().required("Please enter your name"),
    email: yup
      .string()
      .email("Please enter valid email address")
      .required("Please enter your email address"),
    message: yup.string().required("Please enter your message"),
  })
  .required();

const ContactPage = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    resolver: yupResolver(schema),
  });

  const errorArray = Object.values(errors);
  useEffect(() => {
    toast.error(errorArray.length > 0 && errorArray[0].message, {
      pauseOnHover: false,
      delay: 0,
    });
  }, [errorArray, errors]);

  const handleSendMessage = async (values) => {
    if (!isValid) return;
    try {
      toast.success("Send Message Successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      reset({
        name: "",
        email: "",
        message: "",
      });
    }
  };
  return (
    <div className="mt-12 mx-auto max-w-[1000px] shadow-xl p-8">
      <div className="text-4xl font-medium text-primary">
        <div>Love to here from you,</div>
        <div className="flex items-center gap-2">
          <span>Get in touch</span>
          <MdWavingHand color="#f5bf39" />
        </div>
      </div>
      <form onSubmit={handleSubmit(handleSendMessage)}>
        <div className="grid-field">
          <Field>
            <Label htmlFor={"name"}>Your Name</Label>
            <Input
              name="name"
              placeholder="Enter your name"
              bgColor="#ccd0d7"
              control={control}
            />
          </Field>
          <Field>
            <Label htmlFor={"email"}>Your Email</Label>
            <Input
              name="email"
              placeholder="Enter your email address"
              bgColor="#ccd0d7"
              control={control}
            />
          </Field>
        </div>
        <Field>
          <Label>Your Message</Label>
          <Textarea
            name="message"
            placeholder="Describe your message"
            bgColor="#ccd0d7"
            control={control}
          />
        </Field>
        <Button
          type="submit"
          width="200px"
          height="48px"
          margin="30px auto 0"
          padding="12px 30px"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          <div className="flex gap-2">
            Send Now
            <HiArrowUpRight fontSize={20} />
          </div>
        </Button>
      </form>
    </div>
  );
};

export default ContactPage;

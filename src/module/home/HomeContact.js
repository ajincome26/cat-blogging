import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { icons } from "utils/icons";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Field } from "components/field";
import { Label } from "components/label";
import { Input } from "components/input";
import { Textarea } from "components/textarea";
import { Button } from "components/button";
import { HiArrowUpRight } from "react-icons/hi2";

const { AiOutlineInstagram, AiFillGithub, FaFacebookF, AiOutlineTwitter } =
  icons;
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
const HomeContact = () => {
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
    <div>
      {/* h-[600px] */}
      <div className="relative w-full h-[800px] md:h-[700px] xl:h-[600px] shadow-2xl overlay">
        <img
          srcSet="./contact-svg.svg"
          alt="banner-item"
          className="object-cover object-top w-full h-full"
        />
        {/* top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[70%] h-[80%]*/}
        <div className="absolute top-0 left-0 flex flex-col w-full h-full overflow-hidden shadow-md rounded-xl xl:top-[50%] xl:left-[50%] xl:translate-x-[-50%] xl:translate-y-[-50%] xl:w-[70%] xl:h-[80%] xl:flex-row">
          {/* h-full */}
          <div className="relative h-[200px] xl:h-full basis-1/3">
            <div className="absolute inset-0 bg-gradient-to-t from-[#2c3e50]"></div>
            <img
              src="https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80"
              alt=""
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-0 flex flex-col gap-2 p-5 text-white">
              <Link
                to="/"
                onClick={() => {
                  document.body.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="text-xl font-medium tracking-widest uppercase"
              >
                Cat Blogging
              </Link>
              <span className="text-lg text-teal-400">
                Feel free to explore and enjoy your favorite themes
              </span>
              <div className="flex items-center gap-3 text-xl">
                <a
                  href="https://www.instagram.com/jh.tu2606/"
                  className="p-[10px] border hover:bg-third transition-all duration-200 ease-in-out"
                >
                  <AiOutlineInstagram />
                </a>
                <a
                  href="https://twitter.com/cr7egend_2606"
                  className="p-[10px] border hover:bg-third transition-all duration-200 ease-in-out"
                >
                  <AiOutlineTwitter />
                </a>
                <a
                  href="https://github.com/ajincome26"
                  className="p-[10px] border hover:bg-third transition-all duration-200 ease-in-out"
                >
                  <AiFillGithub />
                </a>
                <a
                  href="https://www.facebook.com/ajincome.7"
                  className="p-[10px] border hover:bg-third transition-all duration-200 ease-in-out"
                >
                  <FaFacebookF />
                </a>
              </div>
            </div>
          </div>
          <div className="relative h-full p-5 basis-2/3 bg-slate-200">
            <div className="flex flex-col gap-3 text-teal-800">
              <h2 className="text-2xl font-medium uppercase">Get in touch</h2>
              <p className="text-grayDark">
                24/7 We will answer your questions and problems
              </p>
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
                height="45px"
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
        </div>
      </div>
    </div>
  );
};

export default HomeContact;

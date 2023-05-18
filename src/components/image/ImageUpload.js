import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { Triangle } from "react-loader-spinner";
import styled from "styled-components";

const ImageUploadStyle = styled.label`
  width: 100%;
  padding: ${(props) => (props.url ? "0px" : "3rem 2rem")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${(props) => props.theme.grayField};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  input {
    display: none;
  }
`;

const ImageUpload = (props) => {
  const {
    className,
    progress = 0,
    url,
    handleDeleteImage = () => {},
    ...rest
  } = props;
  return (
    <ImageUploadStyle className={`${className} group`} url={url}>
      {/* Hiện ảnh đã upload */}
      {url && (
        <>
          <img src={url} alt="" className="object-cover w-full h-full" />
          <div
            className="absolute z-10 invisible p-5 text-red-500 transition-all duration-200 ease-linear bg-white rounded-full shadow-lg opacity-0 hover:bg-red-500 hover:text-white group-hover:opacity-100 group-hover:visible"
            onClick={handleDeleteImage}
          >
            <RiDeleteBinLine size={20} />
          </div>
        </>
      )}

      {/* Ban đầu và cũng là lúc ta RESET image upload */}
      {!url && progress === 0 && (
        <>
          <img srcSet="/img-upload.png 6x" alt="" />
          <span className="font-semibold text-primary">Choose Photo</span>
        </>
      )}

      {/* Khi đang upload */}
      {progress > 0 && !url && (
        <Triangle
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      )}

      <input type="file" name="image" onChange={() => {}} {...rest} />

      {/* Hiển thị thanh bar progress */}
      {!url && (
        <div
          className={`absolute bg-green-500 h-[5px] bottom-0 left-0 rounded-[10px] transition-all duration-200 ease-linear`}
          style={{
            width: `${progress}%`,
          }}
        ></div>
      )}
    </ImageUploadStyle>
  );
};

export default ImageUpload;

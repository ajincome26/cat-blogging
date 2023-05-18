import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useState } from "react";

export default function useFirebaseImage(
  setValue,
  getValues,
  imageName = null,
  callback = () => {}
) {
  const storage = getStorage();
  const [progress, setProgress] = useState();
  const [url, setURL] = useState();

  const handleUploadImages = (file) => {
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Nothing at all");
        }
      },
      (error) => {
        console.log("Upload Error");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          setURL(downloadURL);
        });
      }
    );
  };

  const handleSelectImages = (e) => {
    e.stopPropagation();
    const file = e.target.files[0];
    if (!file) return;
    setValue("image_name", file.name);
    handleUploadImages(file);
  };

  const handleDeleteImage = (e) => {
    e.preventDefault();
    const imageRef = ref(
      storage,
      "images/" + (imageName || getValues("image_name"))
    );
    deleteObject(imageRef)
      .then(() => {
        setURL("");
        setProgress(0);
        callback && callback();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function resetImageField() {
    setURL("");
    setProgress(0);
  }

  return {
    progress,
    url,
    setURL,
    resetImageField,
    handleSelectImages,
    handleDeleteImage,
  };
}

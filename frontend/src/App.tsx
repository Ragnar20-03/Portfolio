import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    axios
      .post(
        "http://localhost:5100/api/auth/login",
        {
          email: "roshanpp20@gmail.com",
          password: "roshan",
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("response from server is : ", res);
      })
      .catch((err) => {
        console.log("error is : ", err);
      });

    // axios
    //   .get("http://localhost:5100/api/user/details", {
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     console.log("response is : ", res);
    //   });
  });
  return (
    <>
      <h1>Choose file</h1>
      <input
        type="file"
        name="file"
        id=""
        onChange={(e) => {
          const formData = new FormData();
          // Append the selected file to the FormData
          e.target.files && e.target.files.length > 0
            ? formData.append("file", e.target.files[0])
            : // Send the file to the backend via Axios
              console.log("hii");

          axios
            .put("http://localhost:5100/api/user/updateAvatar", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              withCredentials: true,
            })
            .then((response) => {
              // Handle the response after a successful upload
              console.log("Image uploaded successfully:", response.data);
            })
            .catch((error) => {
              // Handle any errors during the upload
              console.error("Error uploading image:", error);
            });
        }}
      />
    </>
  );
}

export default App;

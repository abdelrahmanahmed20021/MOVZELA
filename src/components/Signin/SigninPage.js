import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { toast } from "react-toastify";
import { auth, createNewUsers } from "../../../firebase-init";
import "./SigninPage.css";

export default function SigninPage() {

  const [loaderState,setLoaderState] = useState(false);

  const [userFile,setUserFile] = useState();


  const message = (mess) => {
    toast.warn(mess, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }


  const HandelUpload = (e) => {
    setUserFile(e.target.files[0])
  }

  const ApepndNewUser = (e) => {
    e.preventDefault();
    const [input_1,input_2,input_3,input_4,input_5] = e.target;
    const regexEmailPattern = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
  
    if(input_1.value === ""){
      message("Please enter your name not less than 5 characters");
    }else if(input_2.value === "" || !regexEmailPattern.test(input_2.value)){
      message("Please enter valid email @example.com");
    }else if(input_3.value === "" || input_4.value === ""){
      message("Please enter your password not less than 8 characters");
    }else if(input_3.value.length < 8 || input_4.value.length < 8 ){
      message("Please enter your password not less than 8 characters ");
    }else if(input_3.value !== input_4.value ){
      message("Check your password confirmation");
    }else if(input_5.value === ""){
      message("Please upload your amazing photo");
    }else{
      setLoaderState(true);
      createNewUsers(auth,input_2.value,input_3.value,userFile).then((e) => {
         if(e == "auth/email-already-in-use"){
            message("This is User Exist !");
            input_1.value = "";
            input_2.value = "";
            input_3.value = "";
            input_4.value = "";
            input_5.value = "";
            setLoaderState(false);
         }
      })
    }
  }


  return (
    <div className="form-container">
      <form onSubmit={ApepndNewUser}>
      <div style={{display:loaderState ? "block" : "none"}}>
      <PropagateLoader	
        height="80"
        width="80"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor = '#F4442E'
        barColor = '#51E5FF'
      />
      </div>
        <div className="logo">
          <img src="./assets/Logo.png" alt="" />
          <p>MO<strong>V</strong>ZEL<strong>A</strong></p>
        </div>
        <input type="text" placeholder="Enter Your Name" />
        <input type="email" placeholder="Enter Your Email" />
        <input type="password" placeholder="Enter Your Password" />
        <input type="password" placeholder="Confirm Password" />
        <label htmlFor="file"><img width={40} height={40} src="./assets/upload.png" alt="" /></label>
        <input onChange={HandelUpload} accept="/image/*" type="file" id="file"  hidden/>
        <button>Sign in</button>
        <p className="singin-link">
        <Link to="/login"><span>Create account</span></Link>
      </p>
      </form>
    </div>
  );
}

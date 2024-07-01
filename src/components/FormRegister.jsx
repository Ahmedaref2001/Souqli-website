import React, { useState } from "react";
import formRegisterstyle from "../stylee/formRegisterstyle.module.css";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import logo from "../images/logo1.png";
//import icon
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { CiUnlock } from "react-icons/ci";
import { BsPersonFill } from "react-icons/bs";
//function component
function FormRegister({
  login,
  setLogin,
  loginImg,
  singup,
  setSingup,
  singupImg,
  hindelLoginProces,
  hindelSignUpProces
}) {
  //State to store data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmetionPassword, setConfirmetionPassword] = useState("");
  const [remember, setRemember] = useState(false);
  //State to store show and hidden passwords
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  //State to store error massege for each input filld
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  // hindel click on submit button
  function handleSubmit(e) {
    e.preventDefault();
    let vailedEmail = true,
      vailedPassword = true,
      vailedConfirmPassword = true,
      vailedName=true;
    //password and email pattern
    let emailRegx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let passwordRegx =
      /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
    //check on name value
    if (name === ""&&singup) {
      setNameError("this field is required");
      vailedName = false;
    } else {
      setNameError("");
      vailedName = true;
    }
    //check on email value
    if (email === "" || emailRegx.test(email) === false) {
      setEmailError("Invalid email address!");
      vailedEmail = false;
    } else {
      setEmailError("");
      vailedEmail = true;
    }
    //check on password value
    if (password === "" || passwordRegx.test(password) === false) {
      setPasswordError(
        "Invalid password must contain character like [A,a,9,$]"
      );
      vailedPassword = false;
    } else {
      setPasswordError("");
      vailedPassword = true;
    }
    //check on confirm Password value
    if (singup && (confirmetionPassword === "" || confirmetionPassword !== password)) {
      setConfirmPasswordError("It must be identical to the password");
      vailedConfirmPassword = false;
    } else {
      setConfirmPasswordError("");
      vailedConfirmPassword = true;
    }

    //hindel login or singup process
    if (vailedEmail && vailedPassword && vailedConfirmPassword && vailedName) {
      //login process
      if (login) {

        // hindel remember

        
        hindelLoginProces({ email, password })
      } //singup process
      else {
        hindelSignUpProces({ email, password, confirmetionPassword,name })
      }
    }
  }

  return (
    <div className={formRegisterstyle.reusapleForm}>
      <Container className={formRegisterstyle.container}>
        <Row className={formRegisterstyle.row}>
          <Col lg={5} md={6} sm={10}>
            <div className={formRegisterstyle.boxImg}>
              {login && (
                <img
                  src={loginImg}
                  alt="login img"
                  className={formRegisterstyle.img}
                ></img>
              )}
              {singup && (
                <img
                  src={singupImg}
                  alt="singup img"
                  className={formRegisterstyle.img}
                ></img>
              )}
            </div>
          </Col>
          <Col lg={5} md={6} sm={10}>
            <div className={formRegisterstyle.registerBox}>
              <h2>{login === true ? "login" : "sginup"}</h2>
              <h4>
                {login === true
                  ? "Welcome to souqly go to shopping"
                  : "Welcome to souqly Create account"}
              </h4>
              <form>
              {/*start name filde */}
                {singup&&<div className={formRegisterstyle.inputFilld}>
                <label htmlFor="name">Name <span className={formRegisterstyle.requerd}>*</span>
                </label>
                
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  onFocus={()=>{setNameError("")}}
                />
               <BsPersonFill className={formRegisterstyle.inputIcon} />
                 {/* hindel error massege */}
                {nameError && (
                    <small className="errormasege">
                      {nameError}
                    </small>
                  )}
              </div>}
              {/*end name filde */}


                {/* emil filld */}
                <div className={formRegisterstyle.inputFilld}>
                  <label htmlFor="email">
                    Email <span className={formRegisterstyle.requerd}>*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email/userName"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    onFocus={() => setEmailError("")}
                  />
                  <MdEmail className={formRegisterstyle.inputIcon} />
                  {emailError && (
                    <small className="errormasege">
                      {emailError}
                    </small>
                  )}
                </div>


                {/* password filld */}
                <div className={formRegisterstyle.inputFilld}>
                  <label htmlFor="password">
                    password{" "}
                    <span className={formRegisterstyle.requerd}>*</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    onFocus={() => setPasswordError("")}
                  />
                  {showPassword ? (
                    <CiUnlock
                      className={formRegisterstyle.inputIcon}
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  ) : (
                    <CiLock
                      className={formRegisterstyle.inputIcon}
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  )}
                  {passwordError && (
                    <small className="errormasege">
                      {passwordError}
                    </small>
                  )}
                </div>
                {/* Confirm password filld */}
                {singup && (
                  <div className={formRegisterstyle.inputFilld}>
                    <label htmlFor="confirmPassword">
                      Confirm password{" "}
                      <span className={formRegisterstyle.requerd}>*</span>
                    </label>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      id="confirmPassword"
                      value={confirmetionPassword}
                      onChange={(e) => {
                        setConfirmetionPassword(e.target.value);
                      }}
                      onFocus={() => setConfirmPasswordError("")}
                    />{
                      showConfirmPassword? <CiUnlock
                      className={formRegisterstyle.inputIcon}
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      />: <CiLock
                      className={formRegisterstyle.inputIcon}
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    />
                    }
                   
                    {confirmPasswordError && (
                      <small className="errormasege">
                        {confirmPasswordError}
                      </small>
                    )}
                  </div>
                )}
                {/* Remember checkbox */}
                {login && (
                  <div className={formRegisterstyle.checkboxFilld}>
                    <div className={formRegisterstyle.checkbox}>
                      <input
                        type="checkbox"
                        id="check"
                        checked={remember}
                        onChange={() => {
                          setRemember((prev) => !prev);
                        }}
                      />
                      <label htmlFor="check">Remember me</label>
                    </div>
                    <span>Forget password?</span>
                  </div>
                )}
                {/* Button Register*/}
                <div className={formRegisterstyle.inputFilld}>
                  <input
                    type="button"
                    value={login === true ? "Login" : "Sgin Up"}
                    onClick={handleSubmit}
                  />
                </div>
              </form>

              <div className={formRegisterstyle.otherOptins}>
                <div className={formRegisterstyle.socialsAccounts}>
                  <span>
                    <FaGoogle />
                  </span>
                  <span>
                    <FaFacebook />
                  </span>
                  <span>
                    <FaGithub />
                  </span>
                </div>

                {login === true ? (
                  <h4>
                    Create account ?{" "}
                    <Link
                      to="/Signup"
                      onClick={() => {
                        setLogin(false);
                      }}
                      className={formRegisterstyle.link}
                    >
                      Sgin Up
                    </Link>
                  </h4>
                ) : (
                  <h4>
                    I'm have already account ?{" "}
                    <Link
                      to="/Login"
                      onClick={() => {
                        setSingup(false);
                      }}
                      className={formRegisterstyle.link}
                    >
                      Login
                    </Link>
                  </h4>
                )}
                <img
                  src={logo}
                  alt="logo"
                  className={formRegisterstyle.logo}
                ></img>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default FormRegister;

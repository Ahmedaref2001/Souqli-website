import React, { useState ,useEffect} from "react";
import sellerAccountInfostyle from "../stylee/sellerAccountInfostyle.module.css";
import { RiImageAddLine } from "react-icons/ri";
import { Button, Row } from "react-bootstrap";
import { TbEdit } from "react-icons/tb";
import { BsPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { IoLocation } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { CiUnlock } from "react-icons/ci";
import PupUp from "./PupUp";
import Loader from '../components/Loader'
import UploadImgPopUp from "./UploadImgPopUp";
import ShowImg from "./ShowImg";
import axios from "axios";


export const SellerAccountInfo = ({saveUpdate,setSaveUpdate,setChangeImg}) => {
//state to loadind
  const[loadind,setLoadind]=useState(false)
  
  let vendorId=JSON.parse(localStorage.getItem("userInfo")).id


  //get userInfo from localStorage
  const [userAccountInfo, setUserAccountInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  //State to store data
  const [name, setName] = useState(
    userAccountInfo && userAccountInfo.name ? userAccountInfo.name : ""
  );
  const [email, setEmail] = useState(
    userAccountInfo && userAccountInfo.email ? userAccountInfo.email : ""
  );
  const [password, setPassword] = useState(
    userAccountInfo && userAccountInfo.password ? userAccountInfo.password : ""
  );
  const [confirmPassword, setConfirmPassword] = useState(
    userAccountInfo && userAccountInfo.password ? userAccountInfo.password : ""
  );
  const [location, setLocation] = useState(
    userAccountInfo && userAccountInfo.location ? userAccountInfo.location : ""
  );
  const [phone, setPhone] = useState(
    userAccountInfo && userAccountInfo.phone ? userAccountInfo.phone : ""
  );
  const [gender, setGender] = useState(
    userAccountInfo && userAccountInfo.gender ? userAccountInfo.gender : ""
  );
  const [imageUrl, setImageUrl] = useState(
    userAccountInfo && userAccountInfo.imageUrl ? userAccountInfo.imageUrl : ""
  );
  const [age, setAge] = useState(
    userAccountInfo && userAccountInfo.age ? userAccountInfo.age : ""
  );

  //save change state
  const [changeSuccess, setChangeSuccess] = useState(false);
  //upload img popup state
  const [uploadImgPopUp, setUploadImgPopUp] = useState(false);
  //hindel show img
  const [showImg, setShowImg] = useState(false);
  //State to store show and hidden passwords
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //State to store error massege for each input filld
  const [nameError, setNameError] = useState("");
  // const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  //hindel Save Change
  function hindelSaveChange() {
    let vailedName = true,
      vailedPassword = true,
      vailedConfirmPassword = true,
      vailedgender = true,
      vailedLocation = true,
      vailedPhone = true,
      vailedAge = true;

    //password pattern
    let passwordRegx =
      /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
    //check on name value
    if (name === "") {
      setNameError("this field is required");
      vailedName = false;
    } else {
      setNameError("");
      vailedName = true;
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
    if (confirmPassword === "" || confirmPassword !== password) {
      setConfirmPasswordError("It must be identical to the password");
      vailedConfirmPassword = false;
    } else {
      setConfirmPasswordError("");
      vailedConfirmPassword = true;
    }
    //check on gender value
    if (gender === "") {
      setGenderError("you must choose gender");
      vailedgender = false;
    } else {
      setGenderError("");
      vailedgender = true;
    }
    //check on age value
    if (age === "") {
      setAgeError("this field is required");
      vailedAge = false;
    } else {
      setAgeError("");
      vailedAge = true;
    }
    //check on location value
    if (location === "") {
      setLocationError("you must identify your location");
      vailedLocation = false;
    } else {
      setLocationError("");
      vailedLocation = true;
    }
    //check on phone value
    if (phone === ""||phone.length<11) {
      setPhoneError("you must identify your phone number");
      vailedPhone = false;
    } else {
      setPhoneError("");
      vailedPhone = true;
    }

    //hindel change data
    if (
      vailedName &&
      vailedPassword &&
      vailedConfirmPassword &&
      vailedgender &&
      vailedLocation &&
      vailedPhone &&
      vailedAge
    ) {
      
      let userInfo = { name, password, gender, location, phone, age };
      setLoadind(true)
        axios.put(`https://souqlysystemsite.runasp.net/api/Vendor/Account/update-profile-details/${vendorId}` , userInfo).then((response)=>{
          localStorage.setItem("userInfo",JSON.stringify(response.data));
          setLoadind(false)
          setChangeSuccess(true);
        }).catch((error)=>{
          console.log(error)
          setLoadind(false)
        })
    }
  }
  //hindel hiden popup
  function hidePoupUp() {
    setChangeSuccess(false);
  }


  //hindle Save Img change
  function hindleSaveImg(imgForm,imgRender){
   

    setImageUrl(imgRender)
      const formData = new FormData();

      formData.append('image', imgForm);

      setLoadind(true)

      axios.put(`https://souqlysystemsite.runasp.net/api/Vendor/Account/update-profile-image/${vendorId}` , formData)
      .then((response)=>{

        console.log(response)

        let userInfo=JSON.parse(localStorage.getItem("userInfo"))
        userInfo.imageUrl=response.data.imageUrl
        setImageUrl(response.data.imageUrl)
        localStorage.setItem("userInfo",JSON.stringify(userInfo))

          //hindel change sellerImg
          setChangeImg(true)
setLoadind(false)
          setChangeSuccess(true);
      }).catch((error)=>{
        console.log(error)
        setLoadind(false)
      })
    setUploadImgPopUp(false)
   }




  useEffect(() => {
    if (saveUpdate) {
      hindelSaveChange();
      setSaveUpdate(false);
    }
    
  }, [saveUpdate]);

  return (
    <>
    {loadind&&<Loader/>}
      {changeSuccess && <PupUp hidePoupUp={hidePoupUp} />}
      {uploadImgPopUp && (
        <UploadImgPopUp
          setUploadImgPopUp={setUploadImgPopUp}
          hindleSaveImg={hindleSaveImg}
        />
      )}
      {showImg && <ShowImg setShowImg={setShowImg} imgUrl={imageUrl} />}

      <div className={sellerAccountInfostyle.sellerInfo}>
        <h2 className={sellerAccountInfostyle.title}>Account info</h2>

        {/* user imge */}
        <Row className={sellerAccountInfostyle.row}>
          <div className={sellerAccountInfostyle.imgBox}>
            <img src={imageUrl} alt="seller img" onClick={() => setShowImg(true)} />
            <p>{name}</p>
            <Button
              className={sellerAccountInfostyle.uplodadImg}
              onClick={() => { setUploadImgPopUp(true); }} >
              <RiImageAddLine className={sellerAccountInfostyle.uplodadImgIcon}/> Upload
            </Button>
          </div>
        </Row>

{/* {form regester} */}
        <form className={sellerAccountInfostyle.form}>
              {/*start name filde */}
              <div className={sellerAccountInfostyle.filde}>
                <label htmlFor="name">Name :</label>
                <BsPersonFill className={sellerAccountInfostyle.fildeIcon} />
                <input
                  type="text"
                  id="name"
                  placeholder="Buyer Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  onFocus={()=>{setNameError("")}}
                />
                <TbEdit className={sellerAccountInfostyle.editIcon} />
                 {/* hindel error massege */}
                {nameError && (
                    <small className="errormasege">
                      {nameError}
                    </small>
                  )}
              </div>
              {/*end name filde */}


              {/*start email filde */}
              <div className={sellerAccountInfostyle.filde}>
                <label htmlFor="email">Email :</label>
                <MdEmail className={sellerAccountInfostyle.fildeIcon} />
                <input
                  type="email"
                  id="email"
                  placeholder="Buyer Email"
                  value={email}
                  readOnly
                />
              </div>
              {/*end email filde */}

              {/*start password filde */}
              <div className={sellerAccountInfostyle.filde}>
                <label htmlFor="password">Password :</label>
                {showPassword ? (
                  <CiUnlock
                    className={sellerAccountInfostyle.fildeIcon}
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                ) : (
                  <CiLock
                    className={sellerAccountInfostyle.fildeIcon}
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                )}
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Buyer Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onFocus={() => setPasswordError("")}
                />
                <TbEdit className={sellerAccountInfostyle.editIcon} />
                 {/* hindel error massege */}
                {passwordError && (
                    <small className="errormasege">
                      {passwordError}
                    </small>
                  )}
              </div>
              {/*end password filde */}

              {/*start Confirm password filde */}
              <div className={sellerAccountInfostyle.filde}>
                <label htmlFor="ConfirmPassword">Confirm Password :</label>
                {showConfirmPassword ? (
                  <CiUnlock
                    className={sellerAccountInfostyle.fildeIcon}
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  />
                ) : (
                  <CiLock
                    className={sellerAccountInfostyle.fildeIcon}
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  />
                )}
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="ConfirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  onFocus={() => setConfirmPasswordError("")}
                />
                <TbEdit className={sellerAccountInfostyle.editIcon} />
                 {/* hindel error massege */}
                {confirmPasswordError && (
                    <small className="errormasege">
                      {confirmPasswordError}
                    </small>
                  )}
              </div>
              {/*end Confirm password filde */}


              {/*start age filde */}
              <div className={sellerAccountInfostyle.filde}>
                <label htmlFor="age">Age :</label>
                <BsPersonFill className={sellerAccountInfostyle.fildeIcon} />
                <input
                  type="number"
                  id="age"
                  placeholder="Buyer Age"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value&&Math.abs(e.target.value));
                  }}
                  onFocus={()=>{setAgeError("")}}
                />
                <TbEdit className={sellerAccountInfostyle.editIcon} />
                 {/* hindel error massege */}
                {ageError && (
                    <small className="errormasege">
                      {ageError}
                    </small>
                  )}
              </div>
              {/*end age filde */}



              {/*start Location filde */}
              <div className={sellerAccountInfostyle.filde}>
                <label htmlFor="Location">Location :</label>
                <IoLocation className={sellerAccountInfostyle.fildeIcon} />
                <input
                  type="text"
                  id="Location"
                  placeholder="Buyer Location"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  onFocus={()=>{setLocationError("")}}
                />
                <TbEdit className={sellerAccountInfostyle.editIcon} />
                 {/* hindel error massege */}
                {locationError && (
                    <small className="errormasege">
                      {locationError}
                    </small>
                  )}
              </div>
              {/*end Location filde */}

              {/*start Phone filde */}
              <div className={sellerAccountInfostyle.filde}>
                <label htmlFor="Phone">Phone :</label>
                <FaPhoneAlt className={sellerAccountInfostyle.fildeIcon} />
                <input
                  type="text"
                  id="Phone"
                  placeholder="Buyer Phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  onFocus={()=>{setPhoneError("")}}
                />
                <TbEdit className={sellerAccountInfostyle.editIcon} />
                {/* hindel error massege */}
                {phoneError && (
                    <small className="errormasege">
                      {phoneError}
                    </small>
                  )}
              </div>
              {/*end Phone filde */}



              {/*start Gender filde */}
              <div className={sellerAccountInfostyle.radiofilde}>
               <div>
               <label>Gender :</label>
                <span>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    onChange={(e) => {
                      setGender(e.target.value);
                      setGenderError("")
                    }}
                    checked={gender === "male" ? true : false}
                  />
                  <label htmlFor="male">Male</label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    onChange={(e) => {
                      setGender(e.target.value);
                      setGenderError("")
                    }}
                    checked={gender === "female" ? true : false}
                  />
                  <label htmlFor="female">Female</label>
                </span>
               </div>
                 {/* hindel error massege */}
                {genderError && (
                    <small className="errormasege">
                      {genderError}
                    </small>
                  )}
              </div>
              {/*end Gender filde */}
            </form>

      </div>
    </>
  );
};
export default SellerAccountInfo;

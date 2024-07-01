import React, { useState } from "react";
import FormRegister from "../components/FormRegister";
import PupUp from "../components/PupUp";
import Failedpopup from "../components/Failedpopup"
import loginImg from "../images/group (1).png";
import axios from "axios";
import Loader from '../components/Loader'
export const Login = ({setIsvedorOrNot,setUserData}) => {
  const[loadind,setLoadind]=useState(false)

  const [login, setLogin] = useState(true);
  const [showPupUp, setShowPupUp] = useState(false);
  const [showFailedpopup, setShowFailedpopup] = useState(false);
  const [isvendor, setIsvedor] = useState(false);

  function hindelLoginProces(info) {
    setLoadind(true)
    axios
      .post("https://souqlysystemsite.runasp.net/api/account/login", info)
      .then((response) => {
        //user is vendor or not
        setIsvedor(response.data.isvendor)
        setIsvedorOrNot(response.data.isvendor)
        localStorage.setItem("isvendor",response.data.isvendor)

        localStorage.setItem("userInfo",JSON.stringify(response.data.user))
        setUserData(response.data.user)
        localStorage.setItem("userToken",JSON.stringify(response.data.token))
        setLoadind(false)
        setShowPupUp(true)
      })
      .catch(() => {
        setLoadind(false)
        setShowFailedpopup(true)
      });
   
  }

  function hidePoupUp() {
    setShowPupUp(false);
  }
  return (
    <>
     {loadind&&<Loader/>}
     
      <FormRegister
        login={login}
        setLogin={setLogin}
        loginImg={loginImg}
        hindelLoginProces={hindelLoginProces}
      />
      {showPupUp && <PupUp page={isvendor?"/MyProductsPage":"/"} hidePoupUp={hidePoupUp} />}
      {showFailedpopup&& <Failedpopup setShowFailedpopup={setShowFailedpopup}/>}
    </>
  );
};
export default Login;

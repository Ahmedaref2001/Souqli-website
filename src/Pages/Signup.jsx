import React,{useState} from 'react'
import FormRegister from '../components/FormRegister'
import PupUp from '../components/PupUp'
import singupImg from '../images/group.png'
import axios from "axios";
import Failedpopup from "../components/Failedpopup"
import Loader from '../components/Loader'
export const Signup = () => {
  const[loadind,setLoadind]=useState(false)

  const [singup,setSingup]=useState(true)
  const [showPupUp,setShowPupUp]=useState(false)
  const [showFailedpopup, setShowFailedpopup] = useState(false);

  function hindelSignUpProces(info){
    setLoadind(true)
    axios.post("https://souqlysystemsite.runasp.net/api/account/register", info)
    .then((response) => {
      setLoadind(false)
      setShowPupUp(true)
    }).catch(()=>{
      setLoadind(false)
      setShowFailedpopup(true)
    })
  }
  function hidePoupUp(){
    setShowPupUp(false)
  }
  return (
    <>
    {loadind&&<Loader/>}
    <FormRegister singup={singup} setSingup={setSingup} singupImg={singupImg} hindelSignUpProces={hindelSignUpProces}/>
    {showPupUp&&<PupUp page={"/Login"} hidePoupUp={hidePoupUp}/>}
    {showFailedpopup&& <Failedpopup setShowFailedpopup={setShowFailedpopup}/>}
    </>
    
  )

}
export default Signup;
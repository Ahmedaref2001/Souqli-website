import React,{useState} from 'react'
import shoppingInfostyle from '../stylee/shoppingInfostyle.module.css'
import { Button } from 'react-bootstrap';
import { MdKeyboardArrowRight } from "react-icons/md";
import axios from "axios"
import PupUp from "./PupUp";
import Loader from '../components/Loader'
export const ShoppingInfo = ({checkOutStep,setCheckOutStep}) => {

  const[loadind,setLoadind]=useState(false)

  const[saveSuccessfully,setSveSuccessfully]=useState(false)

 //get userInfo from localStorage
 const [userAccountInfo, setUserAccountInfo] = useState(
  JSON.parse(localStorage.getItem("userInfo"))
);
  // console.log(userAccountInfo)
//State to store data
const [name, setName] = useState(
  userAccountInfo&&userAccountInfo.name ? userAccountInfo.name : ""
);
const [email, setEmail] = useState(
  userAccountInfo&&userAccountInfo.email ? userAccountInfo.email : ""
);
const [location, setLocation] = useState(
  userAccountInfo&&userAccountInfo.location ? userAccountInfo.location : ""
);
const [phone, setPhone] = useState(
  userAccountInfo&&userAccountInfo.phone ? userAccountInfo.phone : ""
);
const [gender, setGender] = useState(
  userAccountInfo&&userAccountInfo.gender ? userAccountInfo.gender : ""
);
const [age, setAge] = useState(
  userAccountInfo&&userAccountInfo.age ? userAccountInfo.age : ""
);



function hindelPayment() {

  setLoadind(true);

  let orders = JSON.parse(localStorage.getItem("orders")) || []; 

  let orderItems = []; 

  Promise.all(
    orders.map((ele) =>
      axios.get(`https://souqlysystemsite.runasp.net/api/Home/AddToCartInfo/${ele.proId}`)
        .then((response) => {
          let proData = response.data;
          if (ele.quantity <= proData.productUnit.quantity) {
            orderItems.push({ productUnitID: ele.productUnitID, quantity: ele.quantity });
          }
        })
        .catch((error) => {
          console.log(error);
        })
    )
  )
    .then(() => {

      axios.post(`https://souqlysystemsite.runasp.net/api/Home/Make-Order/${userAccountInfo.id}`, orderItems)
        .then((response) => {
          localStorage.removeItem("orders");
          setCheckOutStep(2);
          setSveSuccessfully(true)
        })
        .catch((error) => {
          console.log(error);
          setSveSuccessfully(true)
        })
        .finally(() => {
          setLoadind(false);
          setSveSuccessfully(true)
        });
    })
    .catch((error) => {
      console.log(error);
      setLoadind(false); 
      setSveSuccessfully(true)
    });
}


function hidePoupUp(){
  setSveSuccessfully(false)
}




  return (
    <>
    {loadind&&<Loader/>}
    {saveSuccessfully && <PupUp page="/" hidePoupUp={hidePoupUp} />}

    <div className={shoppingInfostyle.ShoppingInfoBox}>
        <p className={shoppingInfostyle.step}>Checkout Step {checkOutStep}/2</p>
        <h4>Shopping Info</h4>
        <form>
              {/*start name filde */}
              <div className={shoppingInfostyle.filde}>
                <label htmlFor="name">Name </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Buyer Name"
                  value={name}
                  readOnly
                />
              </div>
              {/*end name filde */}


              {/*start email filde */}
              <div className={shoppingInfostyle.filde}>
                <label htmlFor="email">Email </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Buyer Email"
                  value={email}
                  readOnly
                />
              </div>
              {/*end email filde */}

             

           

              {/*start Gender filde */}
              <div className={shoppingInfostyle.radiofilde}>
               <div>
               <label>Gender </label>
                <span>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={gender === "male" ? true : false}
                    readOnly
                  />
                  <label htmlFor="male">Male</label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={gender === "female" ? true : false}
                    readOnly
                  />
                  <label htmlFor="female">Female</label>
                </span>
               </div>
                
              </div>
              {/*end Gender filde */}


              {/*start age filde */}
              <div className={shoppingInfostyle.filde}>
                <label htmlFor="age">Age </label>
                
                <input
                  type="number"
                  id="age"
                  placeholder="Buyer Age"
                  value={age}
                  readOnly
                />
               
              </div>
              {/*end age filde */}

              {/*start Location filde */}
              <div className={shoppingInfostyle.filde}>
                <label htmlFor="Location">Location </label>
                
                <input
                  type="text"
                  id="Location"
                  placeholder="Buyer Location"
                  value={location}
                  readOnly
                />
                
              </div>
              {/*end Location filde */}

              {/*start Phone filde */}
              <div className={shoppingInfostyle.filde}>
                <label htmlFor="Phone">Phone </label>
                <input
                  type="text"
                  id="Phone"
                  placeholder="Buyer Phone"
                  value={phone}
                  readOnly
                />
              </div>
              {/*end Phone filde */}
            </form>
            <Button className={shoppingInfostyle.button} onClick={hindelPayment}>Continue to Payment<MdKeyboardArrowRight className={shoppingInfostyle.arrowRight}/></Button>
    </div>
    </>
   
  )
}
export default ShoppingInfo
import React,{useEffect, useState} from "react";
import orderTablestyle from "../stylee/orderTablestyle.module.css";
import { FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import PupUp from "./PupUp";
import axios from "axios"
import Loader from '../components/Loader'
export const OrderTable = ({checkOutStep}) => {
    const[loadind,setLoadind]=useState(false)


    const{id}=useParams()
    const Navigate=useNavigate()

    const [orders, setOrders] = useState(JSON.parse(localStorage.getItem("orders"))?JSON.parse(localStorage.getItem("orders")):[]);
    let userId = JSON.parse(localStorage.getItem("userInfo"))?JSON.parse(localStorage.getItem("userInfo")).id:null;

    const[saveSuccessfully,setSveSuccessfully]=useState(false)

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");


    const [type, setType] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const[productUnitID,setProductUnitID]=useState("")

    const [availableQuantity, setAvailableQuantity] = useState(0);


  // Error messages for inputs
  const [quantityError, setQuantityError] = useState("");

useEffect(()=>{
    if(id){
        setLoadind(true)
        axios.get(`https://souqlysystemsite.runasp.net/api/Home/AddToCartInfo/${id}`).then((response)=>{
            let proData=response.data
            console.log(proData)
            setName(proData.name)
            setCategory(proData.category)
            setImageUrl(proData.imageUrl)
            setType(proData.productUnit.type)
            setUnitPrice(proData.productUnit.unitPrice)
            setTotalPrice((proData.productUnit.unitPrice)*quantity)

            setProductUnitID(proData.productUnit.id)

            setAvailableQuantity(proData.productUnit.quantity)

            setLoadind(false)
            
        }).catch((error)=>{
            console.log(error)
            setLoadind(false)
        })
    }
    setOrders(JSON.parse(localStorage.getItem("orders"))?JSON.parse(localStorage.getItem("orders")):[])
   
},[checkOutStep])

// Function to handle saving product information
const handleSaveData = () => {
    let vailedQuantity = false


  //check on numberOfProduct value
  if (quantity <=0||quantity>availableQuantity) {
    setQuantityError("value not vaild");
    vailedQuantity= false;
  } else {
    setQuantityError("");
    vailedQuantity = true;
  }

  //hindel submit data
  if (vailedQuantity) {
    
    let order={id:(new Date().getTime()),name,imageUrl,category,unitPrice,quantity,totalPrice,type,proId:+id,userId,productUnitID}

    let allOrder=JSON.parse(localStorage.getItem("orders"))?JSON.parse(localStorage.getItem("orders")):[]
    allOrder.push(order)
    setOrders(allOrder)
    localStorage.setItem("orders",JSON.stringify(allOrder))

    setType("")
    setQuantity("")
    setSveSuccessfully(true)
   
  }
};

function hindelRemoveorder(id){
    let allOrder=JSON.parse(localStorage.getItem("orders"))
    let allOrderBeforRemove=allOrder.filter((ele)=>{
        return ele.id!==id
    })
    setOrders(allOrderBeforRemove)
    localStorage.setItem("orders",JSON.stringify(allOrderBeforRemove))
}

function hidePoupUp(){
    setSveSuccessfully(false)
}

  return (
    <>
    {loadind&&<Loader/>}
    {saveSuccessfully && <PupUp page={`/DiscoverProducts/${category}`} hidePoupUp={hidePoupUp} />}

     <div className={orderTablestyle.cartContent}>
      <h4>Shopping Cart</h4>
      <div className={orderTablestyle.table}>
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Type</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total Price</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    orders.map((ele)=>{
                       return <tr key={ele.id}>
                            <td className={orderTablestyle.imgAndName}>
                                <img src={ele.imageUrl[0]} alt="img" onClick={()=>{Navigate(`/DiscoverProducts/${ele.category}/${ele.proId}`)}}/>
                                <div className={orderTablestyle.nameAndCategory}>
                                    <p>{ele.name}</p>
                                    <p>{ele.category}</p>
                                    
                                </div>
                            </td>
                            <td>
                            <input type="text" id="type" value={ele.type} readOnly/>
                            </td>
                            <td>
                                <input type="number" id="NumOfUnits" value={ele.quantity} readOnly/>
                            </td>
                            <td>
                                <input type="number" id="UnitPrice" value={ele.unitPrice} readOnly/>
                            </td>
                            <td>
                                <input type="number" id="UnitPrice" value={ele.totalPrice} readOnly/>
                            </td>
                            <td>
                                <IoCloseSharp className={orderTablestyle.icon} onClick={()=>{hindelRemoveorder(ele.id)}}/>
                            </td>
                        </tr>
                    })
                }
                

                {
                    id&&<tr>
                    <td className={orderTablestyle.imgAndName}>
                        <img src={imageUrl[0]} alt="img"/>
                        <div className={orderTablestyle.nameAndCategory}>
                            <p>{name}</p>
                            <p>{category}</p>
                            <p>Available:{availableQuantity}</p>
                        </div>
                    </td>
                    <td>
                        <input type="text" id="type" value={type} readOnly/>
                    </td>
                    
                    <td>
                        <input type="number" id="NumOfUnits" value={quantity} onChange={(e)=>{setQuantity(e.target.value);setTotalPrice(e.target.value>0?unitPrice*(e.target.value):0)}} onFocus={()=>setQuantityError("")}/>
                        {quantityError && (
                        <small className="errormasege">
                        {quantityError}
                        </small>
                    )}
                    </td>
                    
                    <td>
                        <input type="number" id="UnitPrice" readOnly value={unitPrice}/>
                    </td>
                    <td>
                        <input type="number" id="totalPrice" readOnly value={quantity>0?unitPrice*quantity:0}/>
                    </td>
                    
                    <td>
                        <FaCheck className={orderTablestyle.icon} onClick={handleSaveData}/>
                    </td>
                </tr>
                }
            </tbody>
        </table>
      </div>
    </div>
    </>
   
  );
};
export default OrderTable;

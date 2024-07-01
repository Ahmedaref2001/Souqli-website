import React, { useEffect, useState } from "react";
import productInfostyle from "../stylee/productInfostyle.module.css";
import UploadImgPopUp from "./UploadImgPopUp";
import PupUp from "./PupUp";
import Loader from "./Loader";
import { RiImageAddLine } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { useParams } from 'react-router';
export const ProductInfo = ({ publishData, setPublishData }) => {

  let { id } = useParams();
  const[isEdit,setIsEdit]=useState(false)

  const[loadind,setLoadind]=useState(false)

  const vendorID=JSON.parse(localStorage.getItem("userInfo")).id // VendorID

  // Base product information
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [hindelOtherCategory, setHindelOtherCategory] = useState(false);
  const [allCategory, setAllCategory] = useState([]);

  // Product unit information
  const [type, setType] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [numberOfProductInUnit, setNumberOfProductInUnit] = useState("");
  const [quantity, setQuantity] = useState("");

  // Category-specific fields
  const [price, setPrice] = useState("");
  const [model, setModel] = useState("");
  const [status, setStatus] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");
  const [storage, setStorage] = useState("");
  const [ram, setRam] = useState("");

  // Product images
  const [productImges, setProductImges] = useState([null, null, null]);
  const [imageUrl, setImageUrl] = useState([]);
  const [currentImg, setCurrentImg] = useState(-1);
  const [viewImg, setViewImg] = useState("");

  // Error messages for inputs
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [productImgError, setProductImgError] = useState("");

  // Validation errors for specific categories
  const [priceError, setPriceError] = useState("");
  const [modelError, setModelError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [colorError, setColorError] = useState("");
  const [sizeError, setSizeError] = useState("");
  const [materialError, setMaterialError] = useState("");
  const [storageError, setStorageError] = useState("");
  const [ramError, setRamError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [unitPriceError, setUnitPriceError] = useState("");
  const [numberOfProductInUnitError, setNumberOfProductInUnitError] = useState("");
  const [quantityError, setQuantityError] = useState("");

  // Success state for data saving
  const [saveDataSuccess, setSaveDataSuccess] = useState(false);

  // Upload image popup state
  const [uploadImgPopUp, setUploadImgPopUp] = useState(false);




  // Function to handle category selection
  const handleCategory = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    if (selectedCategory === "Other") {
      setHindelOtherCategory(true);
      setCategory("");
    }
  };




  // Function to send data to the database
  const sendData = (productData, productUnit) => {

    const formData=new FormData()
    Object.keys(productUnit).forEach((ele)=>{
      formData.append(`productUnit.${ele}`,productUnit[ele])
    })

    Object.keys(productData).forEach((ele) => {
      if (ele === "imageUrl") {
        for (let i = 0; i < productData.imageUrl.length; i++) {
          if (productData.imageUrl[i] && typeof productData.imageUrl[i] === 'string') {
            formData.append('imageUrl', productData.imageUrl[i]);
          } else if (productData.imageUrl[i]) {
            
            formData.append('imageFiles', productData.imageUrl[i]);
          }
        }
      } else {
        formData.append(`${ele}`, productData[ele]);
      }
    });

    setLoadind(true)
    //make request
    if(id){
       setIsEdit(true)
      axios.put(`https://souqlysystemsite.runasp.net/api/Vendor/update-product/${id}`,formData).then((response)=>{
        console.log(response)
        setLoadind(false)
        setSaveDataSuccess(true);
      }).catch((error)=>{
        setLoadind(false)
        console.log(error)
      })
     
      
    }else{
      axios.post(`https://souqlysystemsite.runasp.net/api/Vendor/add-product?vendorId=${vendorID}`, formData)
      .then(response => {
        console.log(response);
        setLoadind(false)
        setSaveDataSuccess(true);
      })
      .catch(error => {
        setLoadind(false)
        console.error("Error saving data:", error);
      });
    }
    
  };




  // Function to handle saving product information
  const handleSaveData = () => {
      let vailedname = false,
      vailedDescription = false,
      vailedCategory = false,
      vailedProductImg = false,
      vailedModel = false,
      vailedPrice = false,
      vailedStatus = false,
      vailedColor = false,
      vailedSize = false,
      vailedMaterial= false,
      vailedStorage = false,
      vailedRam = false,
      vailedType = false,
      vailedQuantity= false,
      vailedNumberOfProductInUnit = false,
      vailedUnitPrice = false



    //check on name value
    if (name === "") {
      setNameError("this field is required or value not vaild");
      vailedname = false;
    } else {
      setNameError("");
      vailedname = true;
    }

    //check on description value
    if (description === "") {
      setDescriptionError("this field is required or value not vaild");
      vailedDescription = false;
    } else {
      setDescriptionError("");
      vailedDescription = true;
    }

    //check on category value
    if (category === "") {
      setCategoryError("this field is required or value not vaild");
      vailedCategory = false;
    } else {
      setCategoryError("");
      vailedCategory = true;
    }

    //check on imges value
    if (viewImg === "") {
      setProductImgError("You must upload a picture");
      vailedProductImg = false;
    } else {
      setProductImgError("");
      vailedProductImg = true;
    }
    //remove null from imageUrl
    

//car Category
    //check on model value
    if (model <=1970) {
      setModelError("this field is required or value not vaild");
      vailedModel = false;
    } else {
      setModelError("");
      vailedModel = true;
    }
    //check on price value
    if (price <=0) {
      setPriceError("this field is required or value not vaild");
      vailedPrice = false;
    } else {
      setPriceError("");
      vailedPrice = true;
    }
     //check on color value
    if (color ==="") {
      setColorError("this field is required or value not vaild");
      vailedColor = false;
    } else {
      setColorError("");
      vailedColor = true;
    }
     //check on status value
     if (status ==="") {
      setStatusError("this field is required or value not vaild");
      vailedStatus = false;
    } else {
      setStatusError("");
      vailedStatus = true;
    }


    //Sports Shoe category
     //check on size value
     if (size === "") {
      setSizeError("this field is required or value not vaild");
      vailedSize = false;
    } else {
      setSizeError("");
      vailedSize = true;
    }
    //check on material value
    if (material === "") {
      setMaterialError("this field is required or value not vaild");
      vailedMaterial= false;
    } else {
      setMaterialError("");
      vailedMaterial = true;
    }


    //phone category
     //check on storege value
     if (storage <=8) {
      setStorageError("this field is required or value not vaild");
      vailedStorage = false;
    } else {
      setStorageError("");
      vailedStorage = true;
    }
    //check on ram value
    if (ram <2) {
      setRamError("this field is required or value not vaild");
      vailedRam= false;
    } else {
      setRamError("");
      vailedRam = true;
    }


//product unit 
    //check on type value
    if (type ==="") {
      setTypeError("this field is required or value not vaild");
      vailedType= false;
    } else {
      setTypeError("");
      vailedType = true;
    }

    //check on unitPrice value
    if (unitPrice <=0) {
      setUnitPriceError("this field is required or value not vaild");
      vailedUnitPrice= false;
    } else {
      setUnitPriceError("");
      vailedUnitPrice = true;
    }

    //check on numberOfProductInUnit value
    if (numberOfProductInUnit <=0) {
      setNumberOfProductInUnitError("this field is required or value not vaild");
      vailedNumberOfProductInUnit= false;
    } else {
      setNumberOfProductInUnitError("");
      vailedNumberOfProductInUnit = true;
    }

    //check on quantity value
    if (quantity <=0) {
      setQuantityError("this field is required or value not vaild");
      vailedQuantity= false;
    } else {
      setQuantityError("");
      vailedQuantity = true;
    }


    //hindel submit data
    if (
      vailedname &&
      vailedCategory &&
      vailedPrice&&
      vailedDescription &&
      vailedProductImg&&
      vailedQuantity &&
      vailedNumberOfProductInUnit &&
      vailedUnitPrice &&
      vailedType
    ) {
      
      //car category
      if(vailedColor&&vailedModel&&vailedStatus&&category==="Car"){
        let prodcutData = { name, category, description, imageUrl,model,price,color,status };

        let prodcutUnit = { type,quantity,numberOfProductInUnit,unitPrice };

        sendData(prodcutData,prodcutUnit)

        setUnitPrice("")
        setNumberOfProductInUnit("")
        setQuantity("")
        setType("")
        setColor("")
        setModel("")
        setPrice("")
        setHindelOtherCategory(false)
        setStatus("")
        setName("");
        setCategory("");
        setDescription("");
        setProductImges([null, null, null]);
        setImageUrl([]);
        setViewImg("");

        
        
      }


      //Sports Shoe category
      else if(vailedSize&&vailedMaterial&&category==="Sports Shoe"){
        let prodcutData = { name, category, description, imageUrl,price,size,material };

        let prodcutUnit = { type,quantity,numberOfProductInUnit,unitPrice };
        
        sendData(prodcutData,prodcutUnit)

        setUnitPrice("")
        setNumberOfProductInUnit("")
        setQuantity("")
        setType("")
        setPrice("")
        setSize("")
        setMaterial("")
        setHindelOtherCategory(false)
        setName("");
        setCategory("");
        setDescription("");
        setProductImges([null, null, null]);
        setImageUrl([]);
        setViewImg("");
       
      }


      //Phone category
      else if(vailedColor&&vailedStorage&&vailedRam&&category==="Phone"){
        let prodcutData = { name, category, description, imageUrl,price,color,storage,ram };

        let prodcutUnit = { type,quantity,numberOfProductInUnit,unitPrice };
        
        sendData(prodcutData,prodcutUnit)

        setUnitPrice("")
        setNumberOfProductInUnit("")
        setQuantity("")
        setType("")
        setPrice("")
        setColor("")
        setRam("")
        setStorage("")
        setHindelOtherCategory(false)
        setName("");
        setCategory("");
        setDescription("");
        setProductImges([null, null, null]);
        setImageUrl([]);
        setViewImg("");
       
      }



       //Man clothes and Female clothes Category
       else if(vailedSize&&vailedMaterial&&vailedColor&&(category==="Man clothes"||category==="Female clothes")){
        let prodcutData = { name, category, description, imageUrl,price,size,material,color };

        let prodcutUnit = { type,quantity,numberOfProductInUnit,unitPrice };
        
        sendData(prodcutData,prodcutUnit)

        setUnitPrice("")
        setNumberOfProductInUnit("")
        setQuantity("")
        setType("")
        setPrice("")
        setSize("")
        setColor("")
        setMaterial("")
        setName("");
        setHindelOtherCategory(false)
        setCategory("");
        setDescription("");
        setProductImges([null, null, null]);
        setImageUrl([]);
        setViewImg("");
        
      }


       //Electrical devices Category
       else if(vailedColor&&category==="Electrical devices"){
        let prodcutData = { name, category, description, imageUrl,price,color };

        let prodcutUnit = { type,quantity,numberOfProductInUnit,unitPrice };
        
        sendData(prodcutData,prodcutUnit)

        setUnitPrice("")
        setNumberOfProductInUnit("")
        setQuantity("")
        setType("")
        setPrice("")
        setColor("")
        setName("");
        setHindelOtherCategory(false)
        setCategory("");
        setDescription("");
        setProductImges([null, null, null]);
        setImageUrl([]);
        setViewImg("");
        
      }


//other category
      else if(category!=="Electrical devices"&&category!=="Man clothes"&&category!=="Female clothes"&&category!=="Phone"&&category!=="Sports Shoe"&&category!=="Car"){
        let prodcutData = { price,name, category, description, imageUrl };

        let prodcutUnit = { type,quantity,numberOfProductInUnit,unitPrice };
        
        sendData(prodcutData,prodcutUnit)

        setUnitPrice("")
        setNumberOfProductInUnit("")
        setQuantity("")
        setType("")
        setName("");
        setPrice("")
        setCategory("");
        setHindelOtherCategory(false)
        setDescription("");
        setProductImges([null, null, null]);
        setImageUrl([]);
        setViewImg("");
       
      }
    }
  };








  // Function to handle image upload
  const handleSaveImg = (imgForm, imgReder) => {
    let updatedImages = [...productImges];
    updatedImages[currentImg] = imgReder;
    setProductImges(updatedImages);

    let updatedUrls = [...imageUrl];
    updatedUrls[currentImg] = imgForm;
    setImageUrl(updatedUrls);

    if (viewImg === "") {
      setViewImg(updatedImages[0] === null ? imgReder : updatedImages[0]);
    }

    setUploadImgPopUp(false);
  };

  // Function to handle image removal
  const handleRemoveImg = (index) => {
    let numImages = 0;
    let updatedImages = [...productImges];
    updatedImages[index] = null;
    setProductImges(updatedImages);

    let updatedUrls = [...imageUrl];
    updatedUrls[index] = "";
    setImageUrl(updatedUrls);

    for (let i = 0; i < updatedImages.length; i++) {
      if (updatedImages[i] !== null) {
        setViewImg(updatedImages[i]);
        numImages = 1;
        break
      }
    }
    if (numImages === 0) {
      setViewImg("");
    }
  };


  //hindel hiden popup
  function hidePoupUp() {
    setSaveDataSuccess(false);
  }

//hindel display datat of product
function hindelShowDataBeforEdit(proData){
  setName(proData.name)
  setDescription(proData.description)
  setPrice(proData.price)
  setCategory(proData.category)

  setType(proData.productUnit?proData.productUnit.type:"")
  setQuantity(proData.productUnit?proData.productUnit.quantity:"")
  setNumberOfProductInUnit(proData.productUnit?proData.productUnit.numberOfProductInUnit:"")
  setUnitPrice(proData.productUnit?proData.productUnit.unitPrice:"")

  setModel(proData.model?proData.model:"")
  setStatus(proData.status?proData.status:"")
  setColor(proData.color?proData.color:"")
  setSize(proData.size?proData.size:"")
  setMaterial(proData.material?proData.material:"")
  setStorage(proData.storage?proData.storage:"")
  setRam(proData.ram?proData.ram:"")


  let arrayOfImges=[]
  for(let i=0;i<3;i++){
    if(proData.imageUrl[i]){
      arrayOfImges.push(proData.imageUrl[i])
    }else{
      arrayOfImges.push(null)
    }

  }
  setProductImges(arrayOfImges)

  setImageUrl(proData.imageUrl)
  if(proData.imageUrl[0]){
    setViewImg(proData.imageUrl[0])
  }
  

 
}

//hindel fetch ptoduct data
function hindelFetchProductData(){
  setLoadind(true)
    axios.get(`https://souqlysystemsite.runasp.net/api/Vendor/productdetails/${id}`).then((response)=>{
      console.log(response.data)
      setLoadind(false)
     hindelShowDataBeforEdit(response.data)
    }).catch((error)=>{
      setLoadind(false)
      console.log(error)
    })
}




useEffect(() => {
  setLoadind(true)
  if(id&&!isEdit){
    hindelFetchProductData()
  }

  axios.get(`https://souqlysystemsite.runasp.net/api/Vendor/select-category`).then((response)=>{
    setAllCategory(response.data)
    setLoadind(false)
}).catch((error)=>{
  setLoadind(false)
    console.log(error)
})

  if (publishData) {
    handleSaveData();
    setPublishData(false);
  }
}, [publishData]);



  return (
    <>
    {loadind&&<Loader/>}

      {saveDataSuccess && <PupUp page={"/MyProductsPage"} hidePoupUp={hidePoupUp} />}

      {uploadImgPopUp && (
        <UploadImgPopUp
          setUploadImgPopUp={setUploadImgPopUp}
          hindleSaveImg={handleSaveImg}
        />
      )}


      <div className={productInfostyle.productInfo}>


        
        <h2 className={productInfostyle.title}>Base information</h2>
        <div className={productInfostyle.ProductFields}>
{/* Base information */}
          <div className={productInfostyle.box}>
            <div className={productInfostyle.fildeInput}>
              <label htmlFor="name">Name :</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter name of product"
                onChange={(e) => setName(e.target.value)}
                onFocus={() => {
                  setNameError("");
                }}
                value={name}
              />
              {/* hindel error massege */}
              {nameError && (
                <small className="errormasege">{nameError}</small>
              )}
            </div>
            <div className={productInfostyle.fildeInput}>
              <label htmlFor="description">Description :</label>
              <textarea
                placeholder="Enter description of product"
                name="description"
                id="description"
                onChange={(e) => setDescription(e.target.value)}
                onFocus={() => {
                  setDescriptionError("");
                }}
                value={description}
              ></textarea>
              {/* hindel error massege */}
              {descriptionError && (
                <small className="errormasege">{descriptionError}</small>
              )}
            </div>


            <div className={productInfostyle.fildeInput}>
                    <label htmlFor="Price">Price :</label>
                    <input type="number" name="Price" id="Price" placeholder="price"
                    onChange={(e) => setPrice(e.target.value)}
                    onFocus={() => {
                      setPriceError("");
                    }}
                    value={price}
                    />
                  </div>
                   {/* hindel error massege */}
                    {priceError && (
                      <small className="errormasege">{priceError}</small>
                    )}


            <div className={productInfostyle.fildeInput}>
              <label htmlFor="Category">Category :</label>
              <select
                id="Category"
                onChange={(e) => {handleCategory(e)}}
                onFocus={() => {
                  setCategoryError("");
                }}
                value={category}
              >
                <option value="">Select Category</option>
                {
                  allCategory.map((ele)=>{
                    return <option value={ele.name} key={ele.id}>{ele.name}</option>
                  })
                }
                <option value={"Other"}>Other</option>
              </select>
              {/* hindel error massege */}
              {categoryError &&!hindelOtherCategory&& (
                <small className="errormasege">{categoryError}</small>
              )}
            </div>



{/* other  Category*/}
            {
              hindelOtherCategory&&<div className={productInfostyle.fildeInput}>
              <input
                type="text"
                name="otherCategory"
                id="otherCategory"
                placeholder="Enter Category of product"
                onChange={(e) => setCategory(e.target.value)}
                onFocus={() => {
                  setCategoryError("");
                }}
                value={category}
              />
              {/* hindel error massege */}
              {categoryError && (
                <small className="errormasege">{categoryError}</small>
              )}
            </div>
            }
            
          </div>
          


{/* Product unit */}
<div className={productInfostyle.box}>
              <h5 className={productInfostyle.title}>Product unit</h5>


              <div className={productInfostyle.fildeInput}>
              <label htmlFor="type">Type :</label>
              <select
                id="type"
                onChange={(e) => {setType(e.target.value)}}
                onFocus={() => {
                  setTypeError("");
                }}
                value={type}
              >
                <option value="">Select Type</option>
                <option value="box">Box</option>
                <option value="piece">Piece</option>
              </select>
              {/* hindel error massege */}
              {typeError&& (
                <small className="errormasege">{typeError}</small>
              )}
            </div>


            <div className={productInfostyle.fildeInput}>
              <label htmlFor="unitPrice">Unit Price :</label>
              <input
                type="number"
                name="unitPrice"
                id="unitPrice"
                placeholder="Enter unit price for this product"
                onChange={(e) => setUnitPrice(e.target.value)}
                onFocus={() => {
                  setUnitPriceError("");
                }}
                value={unitPrice}
              />
              {/* hindel error massege */}
              {unitPriceError && (
                <small className="errormasege">{unitPriceError}</small>
              )}
            </div>
           

            <div className={productInfostyle.fildeInput}>
                  <label htmlFor="numberOfProductInUnit">Unit Num :</label>
                  <input type="number" name="numberOfProductInUnit" id="numberOfProductInUnit" placeholder="Unit Num"
                  onChange={(e) => setNumberOfProductInUnit(e.target.value)}
                  onFocus={() => {
                    setNumberOfProductInUnitError("");
                  }}
                  value={numberOfProductInUnit}
                  />
            </div>
                {/* hindel error massege */}
                {numberOfProductInUnitError && (
                  <small className="errormasege">{numberOfProductInUnitError}</small>
                )}



            <div className={productInfostyle.fildeInput}>
                  <label htmlFor="quantity">Available Quantity :</label>
                  <input type="number" name="quantity" id="quantity" placeholder="Available Quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                  onFocus={() => {
                    setQuantityError("");
                  }}
                  value={quantity}
                  />
            </div>
                {/* hindel error massege */}
                {quantityError && (
                  <small className="errormasege">{quantityError}</small>
                )}
            
          </div>



          {/* More Info */}
          {
            ["Car","Sports Shoe","Phone","Man clothes","Female clothes","Electrical devices"].indexOf(category)!==-1&&<div className={productInfostyle.box}>
            <h6 className={productInfostyle.title}>More Info</h6>
              {
                //Car Category
                category==="Car"?
                <>
                  <div className={productInfostyle.fildeInput}>
                    <label htmlFor="Model">Model :</label>
                    <input type="number" name="Model" id="Model" placeholder="Model"
                     onChange={(e) => setModel(e.target.value)}
                     onFocus={() => {
                       setModelError("");
                     }}
                     value={model}
                    />
                  </div>
                  {/* hindel error massege */}
                  {modelError && (
                      <small className="errormasege">{modelError}</small>
                    )}


                  <div className={productInfostyle.fildeInput}>
                    <label htmlFor="Status">Status :</label>
                    <input type="text" name="Status" id="Status" placeholder="Status"
                     onChange={(e) => setStatus(e.target.value)}
                     onFocus={() => {
                       setStatusError("");
                     }}
                     value={status}
                    />
                  </div>
                   {/* hindel error massege */}
                   {statusError && (
                      <small className="errormasege">{statusError}</small>
                    )}


                  <div className={productInfostyle.fildeInput}>
                    <label htmlFor="Color">Color :</label>
                    <input type="text" name="Color" id="Color" placeholder="Color"
                     onChange={(e) => setColor(e.target.value)}
                     onFocus={() => {
                       setColorError("");
                     }}
                     value={color}
                    />
                  </div>
                   {/* hindel error massege */}
                   {colorError && (
                      <small className="errormasege">{colorError}</small>
                    )}
                </>


                //Sports Shoe Category
                :category==="Sports Shoe"?
                <>
                  
                  <div className={productInfostyle.fildeInput}>
                    <label htmlFor="Size">Size :</label>

                    <input type="number" id="Size"
                    name="Size"
                    placeholder="Enter Size"
                    onChange={(e) => setSize(e.target.value)}
                    onFocus={() => {
                      setSizeError("");
                    }}
                    value={size}
                    />
                  </div>
                 {/* hindel error massege */}
                 {sizeError && (
                      <small className="errormasege">{sizeError}</small>
                    )}

                 


                 <div className={productInfostyle.fildeInput}>
                    <label htmlFor="Material">Material :</label>
                    <input type="text" name="Material" id="Material" placeholder="Material"
                    onChange={(e) => setMaterial(e.target.value)}
                    onFocus={() => {
                      setMaterialError("");
                    }}
                    value={material}
                    />
                  </div>
                   {/* hindel error massege */}
                    {materialError && (
                      <small className="errormasege">{materialError}</small>
                    )}

                </>
                
                //Sports Shoe Category
                :category==="Phone"?
                <>

                  <div className={productInfostyle.fildeInput}>
                    <label htmlFor="Color">Color :</label>
                    <input type="text" name="Color" id="Color" placeholder="Color"
                     onChange={(e) => setColor(e.target.value)}
                     onFocus={() => {
                       setColorError("");
                     }}
                     value={color}
                    />
                  </div>
                   {/* hindel error massege */}
                   {colorError && (
                      <small className="errormasege">{colorError}</small>
                    )}



                 <div className={productInfostyle.fildeInput}>
                    <label htmlFor="Storage">Storage :</label>
                    <input type="number" name="Storage" id="Storage" placeholder="Storage"
                    onChange={(e) => setStorage(e.target.value)}
                    onFocus={() => {
                      setStorageError("");
                    }}
                    value={storage}
                    />
                  </div>
                   {/* hindel error massege */}
                    {storageError && (
                      <small className="errormasege">{storageError}</small>
                    )}
                 


                 <div className={productInfostyle.fildeInput}>
                    <label htmlFor="Ram">Ram :</label>
                    <input type="number" name="Ram" id="Ram" placeholder="Ram"
                    onChange={(e) => setRam(e.target.value)}
                    onFocus={() => {
                      setRamError("");
                    }}
                    value={ram}
                    />
                  </div>
                   {/* hindel error massege */}
                    {ramError && (
                      <small className="errormasege">{ramError}</small>
                    )}

                </>


                //Man clothes and Female clothes Category
                :category==="Female clothes"||category==="Man clothes"?
                <>

                  <div className={productInfostyle.fildeInput}>
                    <label htmlFor="Size">Size :</label>
                    <select id="Size"
                    onChange={(e) => setSize(e.target.value)}
                    onFocus={() => {
                      setSizeError("");
                    }}
                    value={size}
                    >
                      <option value="">Select Size</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                    </select>
                   
                  </div>
                 {/* hindel error massege */}
                 {sizeError && (
                      <small className="errormasege">{sizeError}</small>
                    )}
                 


                 <div className={productInfostyle.fildeInput}>
                    <label htmlFor="Material">Material :</label>
                    <input type="text" name="Material" id="Material" placeholder="Material"
                    onChange={(e) => setMaterial(e.target.value)}
                    onFocus={() => {
                      setMaterialError("");
                    }}
                    value={material}
                    />
                  </div>
                   {/* hindel error massege */}
                    {materialError && (
                      <small className="errormasege">{materialError}</small>
                    )}


                  <div className={productInfostyle.fildeInput}>
                    <label htmlFor="Color">Color :</label>
                    <input type="text" name="Color" id="Color" placeholder="Color"
                     onChange={(e) => setColor(e.target.value)}
                     onFocus={() => {
                       setColorError("");
                     }}
                     value={color}
                    />
                  </div>
                   {/* hindel error massege */}
                   {colorError && (
                      <small className="errormasege">{colorError}</small>
                    )}

                </>


                  // Electrical devices Category
                :category==="Electrical devices"?
                <>

                  <div className={productInfostyle.fildeInput}>
                    <label htmlFor="Color">Color :</label>
                    <input type="text" name="Color" id="Color" placeholder="Color"
                      onChange={(e) => setColor(e.target.value)}
                      onFocus={() => {
                        setColorError("");
                      }}
                      value={color}
                    />
                  </div>
                    {/* hindel error massege */}
                    {colorError && (
                      <small className="errormasege">{colorError}</small>
                    )}

                </>
                :null
              }
              </div>}


              
            
              



              {/* Picture */}
              <div className={productInfostyle.box}>
            <p className={productInfostyle.title}>Picture :</p>
            <div className={productInfostyle.imges}>
              {productImges.map((ele, index) => {
                if (ele === null) {
                  return (
                    <div className={productInfostyle.uplodadImg} key={index}>
                      <span
                        onClick={() => {
                          setUploadImgPopUp(true);
                          setCurrentImg(index);
                          setProductImgError("");
                        }}
                      >
                        <RiImageAddLine className={productInfostyle.addIcon} />
                      </span>
                    </div>
                  );
                } else {
                  return (
                    <div className={productInfostyle.img} key={index}>
                      <CiCircleRemove
                        className={productInfostyle.removeIcon}
                        onClick={() => {
                          handleRemoveImg(index);
                        }}
                      />
                      <img src={ele} alt="img" />
                    </div>
                  );
                }
              })}
            </div>
            {/* hindel error massege */}
            {productImgError && (
              <small className="errormasege">{productImgError}</small>
            )}
          </div>



          {/* Preview */}
          {viewImg && (
            <div className={productInfostyle.box}>
              <h2 className={productInfostyle.title}>Preview</h2>
              <Row>
                <Col lg={3}>
                  <div className={productInfostyle.imgesOfProduct}>
                    {productImges.map(
                      (ele, index) =>
                        ele && (
                          <img
                            src={ele}
                            alt="img"
                            key={index}
                            onClick={() => {
                              setViewImg(ele);
                            }}
                          />
                        )
                    )}
                  </div>
                </Col>

                <Col lg={9}>
                  <div className={productInfostyle.displayImg}>
                    <img src={viewImg} alt="img" />
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default ProductInfo;

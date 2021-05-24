import { Button, Input } from 'antd'
import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router'
import { app } from '../../../base'
import { usePaystackPayment } from 'react-paystack';






const MakePayment = () => {
  const {id} = useParams()
  const [amount, setAmount] = useState("")



  const paymentUpdate = async() => {
    await app.firestore().collection("post").doc(id).update({
      amountRaise: parseInt(amount),
      // totalAmount: amountRaise
    })
  }


  // you can call this function anything
const onSuccess = (reference) => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log(reference);
  paymentUpdate()
};

// you can call this function anything
const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log('closed')
}

const config = {
  reference: (new Date()).getTime(),
  email: "user@example.com",
  amount: amount,
  publicKey: 'pk_test_d632bf4b9aa1e74745eb158cec8034961dc13b18',
};
    const initializePayment = usePaystackPayment(config);
    return (
      <div>
        <div
        style={{
          margin:"10px",
          fontWeight:"bold"
        }}
        >Amount Entered: {
          amount === "" ? 0 : parseInt(amount) / 100
        }</div>
<Input  
        placeholder="How much would you love to Donate"
        style={{
          marginBottom:"10px"
        }}
        value={amount}
        onChange={(e)=>{
          setAmount(e.target.value)
        }}
       />

          <Button 
          type="primary"
          danger
          style={{
            margin:"10px, 10px",
            width:"100%",

          }}
          onClick={() => {
              initializePayment(onSuccess, onClose)
          }}>Donate</Button>
      </div>
    );
};




const PostDetail = () => {
  const {id} = useParams()
  const [post, setPost] = useState([])
  
  
    const viewPost = async() => {
      await app.firestore().collection("post").doc(id).get()
      .then((user)=>(
        setPost(user.data())
      ))
    }
  
    useEffect(()=>{
      viewPost()
    }, [])
  
  

  return (
    <div
    style={{
      display:"flex",
      flexWrap:"wrap",
      justifyContent:"center",
      marginTop:"30px"
    }}
    >
      <div>
      
        <img
          src={post && post.coverImage}
          style={{
            width:"100%",
            height:"300px",
            objectFit:"cover",
            marginTop:"10px"
          }}
        />
        <div
        style={{
          padding:"10px 10px",


        }}
        >
          {post && post.detail}
        </div>
        <div
        style={{
          display:"flex",
          justifyContent:"space-between"
        }}
        >
        <div
         style={{
           marginTop:"20px",
           fontWeight:"bold",

         }}
         >Amount to Raise:  #{post && post.amount} </div>

        <div
         >Amount to Raised so far:  #{post && post.amountRaise/100 }</div>
        </div>
         <div
         style={{
           marginTop:"22px",
           fontWeight:"bold",
           display:"flex",
           justifyContent:"center",
           width:"100%",
           fontSize:"20px"

         }}
         >Amount to Left:  # {post.amount -  (post && ( post.amountRaise + post.totalAmount)/100)   }</div>
         <div

         >Total Amount Raise:  #{post && ( post.amountRaise + post.totalAmount)/100 }</div>

<br/>
<br/>
<MakePayment />
      </div>
     
     <div>
      
     </div>
    
    </div>
  )
}

export default PostDetail

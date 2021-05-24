import { Input } from 'antd'
import React,{useState, useEffect} from 'react'
import {app} from "../../../base"
import firebase from "firebase"
import { useContext } from 'react'
import { AuthContext } from '../../Redux/reducers/AuthState'

const Post = () => {
  const {currentUser} = useContext(AuthContext)
  const [title, setTitle] = useState('')
  const [brife, setBrife] = useState('')
  const [detail, setDetail] = useState('')
  const [amountRaise, setAmountRaise] = useState('')
  const [amountLeft, setAmountLeft] = useState('')
  const [amount, setAmount] = useState('')
  const [coverImage, setCoverImage] = useState(null)


  const uploadImage = async(e) => {
    const file = e.target.files[0]
    const storageRef = app.storage().ref()
    const fileRef = storageRef.child(file.name)
    await fileRef.put(file)
    setCoverImage( await fileRef.getDownloadURL())
  }

  const makePost = async() => {
  const newUser = await app.auth().currentUser
    if(newUser){
      await app.firestore().collection("post").doc().set({
        createdBy: newUser.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        amount,
        amountLeft,
        amountRaise, 
        detail, 
        brife,
        coverImage,
        title

        
      })
    }
  }


  return (
    <div
    style={{
      display:"flex",
      flexWrap:"wrap",
      justifyContent:"center",
      marginTop:"20px"
    }}
    >
      <div>Post Screen</div>
      <div>
        <Input
          placeholder="title"
        />
      </div>
    </div>
  )
}

export default Post

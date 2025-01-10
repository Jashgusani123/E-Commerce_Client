import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useState } from "react"
import toast from "react-hot-toast"
import { FcGoogle } from "react-icons/fc"
import { auth } from "../FireBase"
import { useLoginMutation } from "../Redux/api/UserAPI"
import { MessageResponse } from "../Types/api"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const [Gender, setGender] = useState("")
    const [DOB, setDOB] = useState("")
    const [login] = useLoginMutation()
    const navigate = useNavigate()
    const loginHandler = async()=>{
        try{
            const provider = new GoogleAuthProvider();
            const {user} = await signInWithPopup(auth, provider)

           const res = await login({
                name:user.displayName!,
                email:user.email!,
                photo:user.photoURL!,
                gender:Gender,
                role:"user",
                dob:DOB,
                _id:user.uid
            })

            if("data" in res && res.data){
                navigate("/")
                toast.success(res.data.message)
            }else{
                const error = res.error as FetchBaseQueryError;
                const message = error.data as MessageResponse;
                toast.error(message.message)
            }

        }catch(error){
            toast.error("SignIn Faild")
        }
    }

  return (
        <div className="login">
            <main>
                <h1 className="heading">Login</h1>
                <div >
                    <label htmlFor="gender">Gender</label>
                    <select name="gender" id="gender" value={Gender} onChange={(e)=>setGender(e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div >
                    <label htmlFor="gender">Date of Birth</label>
                    <input type="date" value={DOB} onChange={(e)=>setDOB(e.target.value)}/>
                </div>
                <div>
                    <p>Already Signed In Once</p>
                    <button onClick={loginHandler}>
                        <FcGoogle /> <span>Sign In With Google</span>
                    </button>
                </div>
            </main>
        </div>
  )
}

export default Login
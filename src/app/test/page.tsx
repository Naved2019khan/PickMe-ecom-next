"use client"
import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export default function TestPage() {
  

  const [token,setToken] = useState()

  useEffect(()=>{
    const fetctMe = async () =>{
      try {
        const response = await axios.post(BASE_URL+ "/auth/login",{
          email : "naved2019khan@gmail.com",
          password: "naved_admin"
        })
        // console.log(response.data)
        setToken(response.data.accessToken)
      } catch (error) {
        setToken(null)
      }
    }

    fetctMe()
  },[])


  useLayoutEffect(()=>{
    const authInterceptor = axios.interceptors.request.use((config)=>{
      config.headers.Authorization = token ?  `Bearer ${token}` :  config.headers.Authorization
      return config
    })

    return () => {
      axios.interceptors.request.eject(authInterceptor)
    }
  },[token])


  useLayoutEffect(()=>{
    const refreshInterceptor = axios.interceptors.response.use((config)=>{
      
    })
  },[])

  return <h1>{BASE_URL}</h1>;
}

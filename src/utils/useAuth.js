import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import jwtDecode from "jwt-decode"

const useAuth = () => {
    const [loginUser, setLoginUser] = useState("")

    const navigate = useNavigate()
    
    useEffect(() => {
        const token = localStorage.getItem("token")

        if (!token) {
            navigate("/user/login")
        }
    
        try {
            const decoded = jwtDecode(token)
            setLoginUser(decoded.email)
        } catch (error) {
            navigate("/user/login")
        }

    }, [navigate])

    return loginUser
}


export default useAuth
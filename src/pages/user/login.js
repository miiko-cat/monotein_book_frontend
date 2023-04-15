import { useState } from "react"

const Login = () => {
    const [loginUser, setLoginUser] = useState({
        email: "",
        password: ""
    })
    
    const handleChange = (e) => {
        setLoginUser({
            ...loginUser,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("https://monotein-book-5x2p.onrender.com//user/login", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginUser)
            })

            const jsonResponse = await response.json()
            localStorage.setItem("token", jsonResponse.token)

            alert(jsonResponse.message)
        } catch (error) {
            alert("ログイン失敗")
        }
    }

    return (
        <div>
            <h1 className="page-title">ログインページ</h1>
            <form onSubmit={handleSubmit}>
                <input value={loginUser.email} onChange={handleChange}
                    type="email" name="email" placeholder="メールアドレス" required />
                <input value={loginUser.password} onChange={handleChange}
                    type="password" name="password" placeholder="パスワード" required />
                <button>ログイン</button>
            </form>
        </div>
    )
}


export default Login
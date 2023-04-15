import { useState } from "react"

const Register = () => {
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await fetch("https://monotein-book-5x2p.onrender.com/user/register", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            })

            const jsonResponse = await response.json()
            alert(jsonResponse.message)
        } catch (error) {
            alert("ユーザー登録失敗")
        }
    }

    return (
        <div>
            <h1 className="page-title">登録ページ</h1>
            <form onSubmit={handleSubmit}>
                <input value={newUser.name} onChange={handleChange}
                    type="text" name="name" placeholder="名前" required />
                <input value={newUser.email} onChange={handleChange}
                    type="email" name="email" placeholder="メールアドレス" required />
                <input value={newUser.password} onChange={handleChange}
                    type="password" name="password" placeholder="パスワード" required />
                <button>登録</button>
            </form>
        </div>
    )
}

export default Register
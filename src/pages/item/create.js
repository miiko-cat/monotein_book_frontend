import { useState } from "react"
import useAuth from "../../utils/useAuth"

const CreateItem = () => {
    const[createItem, setCreateItem] = useState({
        title: "",
        price: "",
        image: "",
        description: "",
    })

    const handleChange = async (e) => {
        setCreateItem({
            ...createItem,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("https://monotein-book-5x2p.onrender.com/item/create", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(createItem)
            })

            const jsonData = await response.json()
            alert(jsonData.message)
        } catch (error) {
            alert("アイテム作成失敗")
        }
    }

    const loginUser = useAuth()
    
    if(loginUser) {
        return (
            <div>
                <h1 className="page-title">アイテム作成</h1>
                <form onSubmit={handleSubmit}>
                    <input value={createItem.title} onChange={handleChange} 
                        type="text" name="title" placeholder="アイテム名" required />
                    <input value={createItem.price} onChange={handleChange} 
                        type="number" name="price" placeholder="価格" required />
                    <input value={createItem.image} onChange={handleChange} 
                        type="text" name="image" placeholder="画像" required />
                    <textarea value={createItem.description} onChange={handleChange} 
                        type="text" name="description" rows="15" placeholder="商品説明" required />
                    <button>作成</button>
                </form>
            </div>
        )
    }
}

export default CreateItem
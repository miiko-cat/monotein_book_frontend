import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useAuth from "../../utils/useAuth"

const UpdateItem = () => {
    const params = useParams()

    const [editItem, setEditItem] = useState({
        title: "",
        price: "",
        image: "",
        description: "",
        email: "",
    })

    const handleChange = async (e) => {
        setEditItem({
            ...editItem,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        const getSingleItem = async () => {
            const response = await fetch(`https://monotein-book-5x2p.onrender.com/item/${params.id}`)
            const jsonResponse = await response.json()

            setEditItem({
                ...editItem,
                title: jsonResponse.singleItem.title,
                price: jsonResponse.singleItem.price,
                image: jsonResponse.singleItem.image,
                description: jsonResponse.singleItem.description,
                email: jsonResponse.singleItem.email,
            })
        }

        getSingleItem()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`https://monotein-book-5x2p.onrender.com/item/update/${params.id}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(editItem)
            })

            const jsonData = await response.json()
            alert(jsonData.message)
        } catch (error) {
            alert("アイテム編集失敗")
        }
    }

    const loginUser = useAuth()
    console.log(loginUser, editItem.email)

    if (loginUser === editItem.email) {
        return (
            <div>
                <h1 className="page-title">アイテム編集</h1>
                <form onSubmit={handleSubmit}>
                    <input value={editItem.title} onChange={handleChange}
                        type="text" name="title" placeholder="アイテム名" required />
                    <input value={editItem.price} onChange={handleChange}
                        type="number" name="price" placeholder="価格" required />
                    <input value={editItem.image} onChange={handleChange}
                        type="text" name="image" placeholder="画像" required />
                    <textarea value={editItem.description} onChange={handleChange}
                        type="text" name="description" rows="15" placeholder="商品説明" required />
                    <button>編集</button>
                </form>
            </div>
        )
    }
    else {
        return <h1>権限がありません</h1>
    }

}

export default UpdateItem
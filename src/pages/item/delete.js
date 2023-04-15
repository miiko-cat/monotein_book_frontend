import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useAuth from "../../utils/useAuth"

const DeleteItem = () => {
    const params = useParams()

    const [deleteItem, setDeleteItem] = useState({
        teditItemitle: "",
        price: "",
        image: "",
        description: "",
        email: "",
    })

    useEffect(() => {
        const getSingleItem = async () => {
            const response = await fetch(`https://monotein-book-5x2p.onrender.com//item/${params.id}`)
            const jsonResponse = await response.json()
    
            setDeleteItem({
                ...deleteItem,
                title: jsonResponse.singleItem.title,
                price: jsonResponse.singleItem.price,
                image: jsonResponse.singleItem.image,
                description: jsonResponse.singleItem.description,
                email: jsonResponse.singleItem.email
            })
        }

        getSingleItem()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`https://monotein-book-5x2p.onrender.com//item/delete/${params.id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })

            const jsonData = await response.json()
            alert(jsonData.message)
        } catch (error) {
            alert("アイテム削除失敗")
        }
    }

    const loginUser = useAuth()

    if (loginUser === deleteItem.email) {
        return (
            <div className="delete-page">
                <h1 className="page-title">アイテム削除</h1>
                <form onSubmit={handleSubmit}>
                    <h2>{deleteItem.title}</h2>
                    {deleteItem.image && 
                        <img src={require(`../../images${deleteItem.image}`)} alt="item" />
                    }
                    <h3>¥{deleteItem.price}</h3>
                    <p>{deleteItem.description}</p>
                    <button>削除</button>
                </form>
            </div>
        )
    }
    else {
        return <h1>権限がありません</h1>
    }
}

export default DeleteItem
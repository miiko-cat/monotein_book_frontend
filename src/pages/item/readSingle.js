import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import useAuth from "../../utils/useAuth"

const ReadSingle = () => {
    const params = useParams()

    const [singleItem, setSingleItem] = useState({
        title: "",
        price: "",
        image: "",
        description: "",
        email: "",
    })

    useEffect(() => {
        const getSingleItem = async () => {
            const response = await fetch(`https://monotein-book-5x2p.onrender.com/item/${params.id}`)
            const jsonResponse = await response.json()
    
            setSingleItem({
                ...singleItem,
                title: jsonResponse.singleItem.title,
                price: jsonResponse.singleItem.price,
                image: jsonResponse.singleItem.image,
                description: jsonResponse.singleItem.description,
                email: jsonResponse.singleItem.email,
            })
        }

        getSingleItem()
    }, [params.id, singleItem])

    const loginUser = useAuth()

    return (
        <div className="grid-container-si">
            <div>
                {singleItem.image && 
                    <img src={require(`../../images${singleItem.image}`)} alt="item" />}
            </div>
            <div>
                <h1>{singleItem.title}</h1>
                <h2>¥{singleItem.price}</h2>
                <hr />
                <p>{singleItem.description}</p>
                {loginUser === singleItem.email && 
                    <div>
                        <Link to={`/item/update/${params.id}`}>アイテム編集</Link>
                        <Link to={`/item/delete/${params.id}`}>アイテム削除</Link>
                    </div>
                }
            </div>
        </div>
    )
}

export default ReadSingle
import React, { useState, useEffect } from "react"
import ReactDom from "react-dom/client"
import { trpc } from "./index"

const App = () => {
    const [books,setBooks] = useState([])

    useEffect(() => {
        fetchData()
    },[])

    const fetchData= async () => {
        const BookList = await trpc.library.bookList.query()
        setBooks(BookList)
    }

    return(
        <div>
            <table>
                <thead>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </thead>
                <tbody>
                    {books.map((book) =>(
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.price}</td>
                            <td>{book.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

ReactDom.createRoot(document.getElementById("app") as HTMLElement).render(<App/>)
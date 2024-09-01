import { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../services/api';
import { Link } from 'react-router-dom';
interface Book {
    id: string;
    name: string;
    description: string;
    price: number;
    autor: string;
}
function BookList() {
    const [Books, setBooks] = useState<Book[]>([]);
    useEffect(() => {
        loadBook();
    }, []);
    const loadBook = async () => {
        const response = await getBooks();
        setBooks(response.data);
    };
    const handleDelete = async (id: string) => {
        await deleteBook(id);
        loadBook();
    };
    return (
        <div className='container'>
            <h1>Book List</h1>
            <Link to="/add">Add Book</Link>
            <ul>
                {Books.map((Book) => (
                    <li key={Book.id}>
                        {Book.name} - ${Book.price} - {Book.autor} 
                        <Link to={`/edit/${Book.id}`}>Edit</Link>
                        <button onClick={() => handleDelete(Book.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default BookList;
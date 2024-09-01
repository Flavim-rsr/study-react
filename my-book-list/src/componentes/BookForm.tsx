import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBook, getBookById, updateBook } from '../services/api';
interface Book {
    name: string;
    description: string;
    price: number;
    autor: string;
}
function BookForm() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [Book, setBook] = useState<Book>({
        name: '',
        description: '',
        price: 0,
        autor: '',
    });
    useEffect(() => {
        if (id) {
            loadBook();
        }
    }, [id]);
    const loadBook = async () => {
        try {
            const response = await getBookById(id as string);
            setBook(response.data);
        } catch (error) {
            console.error("Error loading Book data", error);
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBook({
            ...Book,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (id) {
                await updateBook(id, Book);
            } else {
                await createBook(Book);
            }
            navigate('/');
        } catch (error) {
            console.error("Error saving Book", error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div >
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={Book.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    value={Book.description}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Price</label>
                <input
                    type="number"
                    name="price"
                    value={Book.price}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Autor</label>
                <input
                    type="text"
                    name="autor"
                    value={Book.autor}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Save</button>
        </form>
    );
}
export default BookForm;
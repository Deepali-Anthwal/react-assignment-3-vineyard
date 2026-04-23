import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const BookCard = ({ book }) => {
  const info = book.volumeInfo;
  return (
    <div className="book-card">
      <img 
        src={info.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192'} 
        alt={info.title} 
        style={{ width: '100px' }}
      />
      <h4>{info.title}</h4>
      <Link to={`/books/${book.id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
};

const Navbar = () => (
  <nav className="navbar">
    <Link className="nav-link" to="/">Search Books</Link>
    <Link className="nav-link" to="/favorites">My Favorites</Link>
  </nav>
);

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('sci-fi');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBooks = () => {
    setLoading(true);
    setError('');
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then(res => {
        setBooks(res.data.items || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching data.');
        setLoading(false);
      });
  };

  useEffect(() => { fetchBooks(); }, []);

  return (
    <div className="container">
      <div className="search-section">
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search Sci-Fi..."
        />
        <button onClick={fetchBooks}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}

      <div className="book-grid">
        {books.map(b => <BookCard key={b.id} book={b} />)}
      </div>
    </div>
  );
};

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [favs, setFavs] = useState(JSON.parse(localStorage.getItem('myFavs') || '[]'));

  useEffect(() => {
    axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then(res => setBook(res.data));
  }, [id]);

  const toggleFav = () => {
    let updated;
    if (favs.includes(id)) {
      updated = favs.filter(item => item !== id);
    } else {
      updated = [...favs, id];
    }
    setFavs(updated);
    localStorage.setItem('myFavs', JSON.stringify(updated));
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="detail-box">
        <Link to="/">Back</Link>
        <h2>{book.volumeInfo.title}</h2>
        <p><b>Author:</b> {book.volumeInfo.authors?.join(', ')}</p>
        <img src={book.volumeInfo.imageLinks?.thumbnail} alt="cover" />
        <p>{book.volumeInfo.description?.replace(/<[^>]*>?/gm, '')}</p>
        <button onClick={toggleFav}>
          {favs.includes(id) ? 'Remove Favorite' : 'Add to Favorite'}
        </button>
      </div>
    </div>
  );
};

const Favorites = () => {
  const [list, setList] = useState([]);
  const favIds = JSON.parse(localStorage.getItem('myFavs') || '[]');

  useEffect(() => {
    const getData = async () => {
      const results = await Promise.all(
        favIds.map(id => axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`).then(r => r.data))
      );
      setList(results);
    };
    if(favIds.length > 0) getData();
  }, []);

  return (
    <div className="container">
      <h2>My Saved Books</h2>
      <div className="book-grid">
        {list.length > 0 ? list.map(b => <BookCard key={b.id} book={b} />) : <p>No favorites yet!</p>}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import NavBar from './components/navigation/NavBar';
import Dashboard from './components/page/Dashboard';
import SignIn from './components/auth/SignIn';
import BookList from './components/books/BookList';
import BookDetail from './components/books/BookDetail';
import Logout from './components/auth/Logout';
import Cart from './components/cart/Cart';
import FetchCart from './components/cart/FetchCart';
import MyProfile from './components/profile/MyProfile';
import MyOrder from './components/order/MyOrder';

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' exact element={<Dashboard />} />
          <Route path='/sign-up' exact element={<SignUp />} />
          <Route path='/sign-in' exact element={<SignIn />} />
          <Route path='/book-list' exact element={<BookList />} />
          <Route path='/book-list/:id' exact element={<BookDetail />} />
          <Route path='/cart' exact element={<Cart />} />
          <Route path='/fetch-cart' exact element={<FetchCart />} />
          <Route path='/profile' exact element={<MyProfile />} />
          <Route path='/myorder' exact element={<MyOrder />} />
          <Route path='/logout' exact element={<Logout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { MyContext } from '../context/MyContext';

const Navigation = () => {
  const { product, isAuthenticated,setIsAuthenticated } = useContext(MyContext);

  const handleLogout = async (e) => {
    e.preventDefault();

    const logout = {
      "action": 'logout',
    };

    try {
    const response = await fetch('http://localhost:9000/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logout),
    });

    const data = await response.json();
    

    if (response.status === 200) {
      localStorage.removeItem("token")
      setIsAuthenticated(false)
      console.log(data);
    }
  } catch (error) {
    console.error(error);
  }};

  return (
    <header>
      <div className="header-container">
        <Link to="/" className="logo">
          <div className="egg">PC</div>
          <p>Product Catalog</p>
        </Link>
        <nav className="nav">
          <ul>
            {!isAuthenticated &&
            <Link className="nav-link" to="/">
              Login
            </Link>}
            <Link className="nav-link" to="products">
              Products
            </Link>
            {isAuthenticated && 
            <Link className="nav-link" to="post">
              Post
            </Link>}
            {!isAuthenticated && 
            <Link className="nav-link" to="signup">
              Sign Up
            </Link>}
          </ul>
        </nav>
        <div className="total-product">
          <FaShoppingCart />
          <p>{product.length}</p>
          {isAuthenticated &&
          <button className="nav-link" onClick={handleLogout}>
          Logout
        </button>}
        </div>
      </div>
    </header>
  );
};

export default Navigation;

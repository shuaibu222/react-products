import { useContext, useState } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MyContext } from "../context/MyContext";
import { VscError } from "react-icons/vsc";
import { useNavigate, Link } from "react-router-dom";


const Stats = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [signSuccess, setSignSuccess] = useState(null)
  const [signError, setSignError] = useState(null)

  let nav = useNavigate()

  const {setIsAuthenticated} = useContext(MyContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const login = {
      "action": 'login',
      "users": {
        "username": username,
        "password": password
      }
    };

    try {
    const response = await fetch('http://localhost:9000/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(login),
      credentials: "include"
    });

    const data = await response.json();
    

    if (response.status === 200) {
      localStorage.setItem("token", data.cookie)
      setIsAuthenticated(true)
      setSignSuccess('Login successfully!');
      setUsername("")
      setPassword("")
      nav("/products")
    }
  } catch (error) {
    console.error(error);
    setSignError("Login failed")
  }};


  return (
    <article className="hero">
      <section className="post-parent">
      <section className="post">
        <div className="add-style">
          <h1>Login</h1>
        </div>

        <form className="form">
          <fieldset>
            <label htmlFor="title">Username: </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="text"
              id="title"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="title">Password: </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="text"
              id="title"
            />
          </fieldset>
        </form>
        <button type="submit" className="submit-btn" onClick={handleLogin}>
          Login
        </button>
        <p style={{fontSize: "0.8rem"}}>Don't have account yet, <Link to="signup" style={{color: 'blue'}}>signup here</Link></p>
      </section>
      <section className="message">
          {signSuccess && (
            <div className="success">
              <p>{signSuccess}</p>
              <span>
                <IoIosCheckmarkCircleOutline />
              </span>
            </div>
          )}
          {signError && (
            <div className="error">
              <p>{signError}</p>
              <span>
                <VscError />
              </span>
            </div>
          )}
        </section>
    </section>
    </article>
  );
};

export default Stats;
import { useState } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { VscError } from "react-icons/vsc";



const Signup = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [logSuccess, setLogSuccess] = useState(null)
  const [logError, setLogError] = useState(null)


  const handleSignup = async (e) => {
    e.preventDefault();
    
    const createUser = {
      "action": 'create_user',
      "users": {
        "username": username,
        "password": password
      }
    };

    try {
    const response = await fetch('http://localhost:9000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createUser),
    });

    const data = await response.json();
    

    if (response.status === 200) {
      console.log(data);
      setLogSuccess('Signup successfully!');
      setUsername("")
      setPassword("")
    }
  } catch (error) {
    console.error(error);
    setLogError("Signup failed")
  }};


  return (
    <article className="hero">
      <section className="post-parent">
      <section className="post">
        <div className="add-style">
          <h1>SignUp</h1>
        </div>

        <form className="form">
          <fieldset>
            <label htmlFor="title">Userame: </label>
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
        <button type="submit" className="submit-btn" onClick={handleSignup}>
          Sign Up
        </button>
      </section>
      <section className="message">
          {logSuccess && (
            <div className="success">
              <p>{logSuccess}</p>
              <span>
                <IoIosCheckmarkCircleOutline />
              </span>
            </div>
          )}
          {logError && (
            <div className="error">
              <p>{logError}</p>
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

export default Signup;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(event) {
    event.preventDefault();

    // Validaiton Code
    let stringCheck = /^[a-zA-Z]*$/
    function validation(name) {
      if (name.length > 20) {
        alert("Username Must be lass than 20 Characters")
        return false;
      }
      else if (!name.match(stringCheck)) {
        alert("Username Must Contain only Alphabets")
        return false
      }
      return true;
    }
    // Validation function call --   
    const nameStatus = validation(name)
    // console.log(nameStatus)

    // Save the data in database
    if (nameStatus) {
      const response = await fetch("http://localhost:3002/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.status === "ok") {
        navigate("/login");
      }
      else if (data.status === "error") {
        alert(data.error)
      }
    }

  }

  return (
    <div className="register">
      <header>
        <div className="headerLeft">
          EDUee
        </div>
        <div className="headerRight">
          <button className='btn1'><a href="/login" >Sign in</a></button>
          <button><a href="/register" >Sign up</a></button>
        </div>
      </header>
      <div className="container">
        <div className="containerLeft">
          <form onSubmit={registerUser}>
            <label htmlFor="">Enter Your Name</label>
            <br />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
            />
            <br />
            <label htmlFor="">Enter Your Email</label>
            <br />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <br />
            <label htmlFor="">Enter Your password</label>
            <br />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <br />
            <input className="btn" type="submit" value="Register" />
          </form>
        </div>

        <div className="containerRight cR">
          <h1>Welcome <br /> for Sign up</h1>
          <p>"Provides Your Info Correctly For Reg"</p>
        </div>
      </div>

    </div>
  );
}

export default Register;

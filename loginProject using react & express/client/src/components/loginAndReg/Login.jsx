import { useState } from "react";
import './logAndReg.css'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:3002/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.user) {
      localStorage.setItem("token", data.user);
      alert("Login successful");
      window.location.href = "/home";
    } else {
      alert("Please check your username and password");
    }
  }

  return (
    <div className="login">
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
          <form onSubmit={loginUser}>
            <label htmlFor="">Enter your Email</label>
            <br />
            <input
              className="input1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <br />
            <label htmlFor="">Enter your password</label>
            <br />
            <input
              className="input2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <br />
            <input className="btn" type="submit" value="Login" />
          </form>
        </div>

        <div className="containerRight">
          <h1>Welcome <br /> for Sign in</h1>
          <p>"Provides Your Info Correctly For Login"</p>
        </div>
      </div>


    </div>
  );
}

export default Login;

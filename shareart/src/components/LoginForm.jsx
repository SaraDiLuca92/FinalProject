import React, { useState } from "react";
import frida from "../audreylogin.png";
const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [id, setid] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Esegui la funzione di login passando i dati del form
    onLogin(username, password, id);
  };

  return (
    <div className="formLogin">
      <img src={frida} alt="" />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            USERNAME
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            PASSWORD
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="butt btn btn-primary">
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

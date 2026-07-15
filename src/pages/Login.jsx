import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      console.log("Status:", res.status);
      console.log("Response:", data);


      if (res.ok) {

        localStorage.setItem("user", email);

        alert("Login success ✅");

        window.location.href = "/";

      } else {

        alert(data.message);

      }


    } catch (err) {

      console.error("Login error:", err);

      alert("Backend-თან დაკავშირება ვერ მოხერხდა.");

    }
  };


  return (
    <div style={styles.page}>

      <div style={styles.card}>

        <h2 style={styles.title}>
          Welcome Back
        </h2>


        <p style={styles.subtitle}>
          Login to continue
        </p>


        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />


        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />


        <button
          style={styles.button}
          onClick={loginUser}
        >
          Login
        </button>


      </div>

    </div>
  );
}



const styles = {

  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#020617",
    fontFamily: "Arial",
  },


  card: {
    width: "340px",
    padding: "30px",
    borderRadius: "16px",
    background: "#0f172a",
    boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
    textAlign: "center",
  },


  title: {
    color: "white",
    marginBottom: "6px",
  },


  subtitle: {
    color: "#94a3b8",
    fontSize: "13px",
    marginBottom: "20px",
  },


  input: {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    borderRadius: "10px",
    border: "1px solid #334155",
    background: "#0b1220",
    color: "white",
    outline: "none",
    boxSizing: "border-box",
  },


  button: {
    width: "100%",
    padding: "12px",
    marginTop: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#22c55e",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

};


export default Login;
import { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerUser = async () => {
    console.log("✅ Sign Up clicked");

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log("Status:", res.status);

      const data = await res.json();

      console.log("Response:", data);


      if (res.ok) {

        // ავტომატური შესვლა
        localStorage.setItem("user", email);

        alert("Registration successful ✅");

        // მთავარ გვერდზე გადასვლა
        window.location.href = "/";

      } else {

        alert(data.message);

      }


    } catch (err) {

      console.error("Error:", err);

      alert("Backend-თან დაკავშირება ვერ მოხერხდა.");

    }
  };


  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <h2 style={styles.title}>
          Create Account
        </h2>

        <p style={styles.subtitle}>
          Sign up to start using Car Rent
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


        <input
          style={styles.input}
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />


        <button
          style={styles.button}
          onClick={registerUser}
        >
          Sign Up
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
    background: "#0f172a",
    fontFamily: "Arial",
  },

  card: {
    width: "340px",
    padding: "30px",
    borderRadius: "16px",
    background: "#111827",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
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
    background: "#3b82f6",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
};


export default Register;
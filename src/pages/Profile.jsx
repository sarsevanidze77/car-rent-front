import { useState } from "react";

function Profile() {

  const user = localStorage.getItem("user");

  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatar") || ""
  );


  const uploadImage = async (e) => {

    const file = e.target.files[0];

    if (!file) return;


    const formData = new FormData();

    formData.append("avatar", file);


    try {

      const res = await fetch(
        "http://localhost:3000/upload-avatar",
        {
          method: "POST",
          body: formData,
        }
      );


      const data = await res.json();


      if (data.success) {

        const photo = "http://localhost:3000" + data.image;


        setAvatar(photo);

        localStorage.setItem("avatar", photo);


      } else {

        alert(data.message);

      }


    } catch(err) {

      console.log(err);
      alert("ფოტოს ატვირთვა ვერ მოხერხდა");

    }

  };



  const logout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("avatar");

    window.location.href = "/";

  };



  return (

    <div style={styles.page}>

      <div style={styles.card}>


        <h2 style={styles.title}>
          👤 User Profile
        </h2>



        {avatar ? (

          <img
            src={avatar}
            alt="profile"
            style={styles.avatar}
          />

        ) : (

          <div style={styles.noAvatar}>
            👤
          </div>

        )}



        <input
          id="photo"
          type="file"
          accept="image/*"
          hidden
          onChange={uploadImage}
        />



        <button
          style={styles.upload}
          onClick={() =>
            document.getElementById("photo").click()
          }
        >
          Change Photo
        </button>



        <p style={styles.email}>
          {user}
        </p>



        <button
          style={styles.button}
          onClick={logout}
        >
          Logout
        </button>


      </div>

    </div>

  );
}


const styles = {

  page:{
    minHeight:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    background:"#020617",
  },


  card:{
    width:"350px",
    background:"#0f172a",
    padding:"30px",
    borderRadius:"16px",
    textAlign:"center",
    boxShadow:"0 20px 50px rgba(0,0,0,0.5)",
  },


  title:{
    color:"white",
    marginBottom:"20px",
  },


  avatar:{
    width:"120px",
    height:"120px",
    borderRadius:"50%",
    objectFit:"cover",
    marginBottom:"15px",
  },


  noAvatar:{
    width:"120px",
    height:"120px",
    borderRadius:"50%",
    background:"#334155",
    color:"white",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    margin:"auto",
    marginBottom:"15px",
    fontSize:"35px",
  },


  email:{
    color:"#cbd5e1",
    margin:"20px 0",
  },


  upload:{
    width:"100%",
    padding:"12px",
    marginTop:"10px",
    border:"none",
    borderRadius:"10px",
    background:"#3b82f6",
    color:"white",
    cursor:"pointer",
  },


  button:{
    width:"100%",
    padding:"12px",
    border:"none",
    borderRadius:"10px",
    background:"#ef4444",
    color:"white",
    cursor:"pointer",
    fontWeight:"bold",
  }

};


export default Profile;
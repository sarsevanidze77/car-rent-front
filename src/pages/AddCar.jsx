import { useState } from "react";
import "./AddCar.css";


function AddCar() {


  const [brand,setBrand] = useState("");
  const [model,setModel] = useState("");
  const [year,setYear] = useState("");
  const [price,setPrice] = useState("");
  const [description,setDescription] = useState("");

  const [fuel,setFuel] = useState("");
  const [gear,setGear] = useState("");
  const [people,setPeople] = useState("");

  const [image,setImage] = useState(null);

  const [preview,setPreview] = useState("");

  const [loading,setLoading] = useState(false);





  const addCar = async(e)=>{


    e.preventDefault();



    if(!image){

      alert("აირჩიე ფოტო");

      return;

    }



    try{


      setLoading(true);



      const formData = new FormData();



      formData.append("brand",brand);

      formData.append("model",model);

      formData.append("year",year);

      formData.append("price",price);

      formData.append("description",description);


      formData.append("fuel",fuel);

      formData.append("gear",gear);

      formData.append("people",people);


      formData.append("image",image);



      formData.append(
        "owner",
        localStorage.getItem("user")
      );





      const res = await fetch(
        "http://localhost:3000/add-car",
        {
          method:"POST",
          body:formData
        }
      );





      const data = await res.json();





      if(data.success){


        alert("Car added successfully 🚗");



        setBrand("");

        setModel("");

        setYear("");

        setPrice("");

        setDescription("");

        setFuel("");

        setGear("");

        setPeople("");

        setImage(null);

        setPreview("");



      }
      else{


        alert(data.message);


      }




    }catch(err){


      console.log(err);

      alert("Something went wrong");


    }finally{


      setLoading(false);


    }


  };







  const imageChange=(e)=>{


    const file=e.target.files[0];


    setImage(file);



    if(file){

      setPreview(
        URL.createObjectURL(file)
      );

    }


  };








  return (


    <div className="addcar-container">



      <form 
        className="addcar-form"
        onSubmit={addCar}
      >



        <h2>
          Add Your Car 🚗
        </h2>



        <p>
          Rent your car easily
        </p>






        <input

          type="text"

          placeholder="Car Brand"

          value={brand}

          onChange={(e)=>setBrand(e.target.value)}

          required

        />






        <input

          type="text"

          placeholder="Car Model"

          value={model}

          onChange={(e)=>setModel(e.target.value)}

          required

        />







        <input

          type="number"

          placeholder="Year"

          value={year}

          onChange={(e)=>setYear(e.target.value)}

          required

        />







        <input

          type="number"

          placeholder="Price per day"

          value={price}

          onChange={(e)=>setPrice(e.target.value)}

          required

        />







        <input

          type="text"

          placeholder="Fuel capacity (example: 70L)"

          value={fuel}

          onChange={(e)=>setFuel(e.target.value)}

          required

        />







        <select

          value={gear}

          onChange={(e)=>setGear(e.target.value)}

          required

        >

          <option value="">
            Select Gear
          </option>


          <option value="Automatic">
            Automatic
          </option>


          <option value="Manual">
            Manual
          </option>


        </select>







        <input

          type="number"

          placeholder="Passengers"

          value={people}

          onChange={(e)=>setPeople(e.target.value)}

          required

        />








        <textarea

          placeholder="Description"

          value={description}

          onChange={(e)=>setDescription(e.target.value)}

        />







        <input

          type="file"

          accept="image/*"

          onChange={imageChange}

          required

        />







        {preview && (

          <img

            className="preview"

            src={preview}

            alt="preview"

          />

        )}








        <button disabled={loading}>


          {loading ? "Adding..." : "Add Car"}


        </button>





      </form>



    </div>


  );

}


export default AddCar;
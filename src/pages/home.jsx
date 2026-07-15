import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";


function Home() {


  const [cars, setCars] = useState([]);

  const [search, setSearch] = useState("");





  useEffect(() => {


    fetch("http://localhost:3000/cars")

      .then((res)=>res.json())

      .then((data)=>{

        setCars(data);

      })

      .catch((err)=>{

        console.log(err);

      });



  }, []);







  const getImage = (image)=>{


    if(!image){

      return "";

    }



    if(image.startsWith("/images")){

      return image;

    }



    if(image.startsWith("/uploads")){

      return `http://localhost:3000${image}`;

    }



    return `/images/${image}`;


  };






  const filteredCars = cars.filter((car)=>{


    const name = (

      car.name ||

      `${car.brand || ""} ${car.model || ""}`

    ).toLowerCase();



    return name.includes(
      search.toLowerCase()
    );


  });









  return (

    <div>



      {/* NAVBAR */}

      <div className="navbar">


        <h1 className="logo">

          MORENT

        </h1>





        <input

          type="text"

          placeholder="Search car..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

        />



      </div>







      {/* HERO */}


      <div className="hero">



        <div className="hero-text">



          <h1>

            Sports car with the best design

          </h1>





          <p>

            Safety and comfort while driving a futuristic
            and elegant sports car

          </p>





          <button>

            Rent Car

          </button>



        </div>







        {filteredCars.length > 0 && (


          <img

            src={getImage(filteredCars[0].image)}

            alt="hero car"

          />


        )}





      </div>









      {/* CARS LIST */}


      <div className="cars-container">





        {filteredCars.length === 0 ? (


          <h2>

            No cars found 🚗

          </h2>



        ) : (



          filteredCars.map((car)=>(



            <div

              className="card"

              key={car._id || car.id}

            >





              <h2>


                {

                car.name ||

                `${car.brand || ""} ${car.model || ""}`

                }


              </h2>







              <p className="type">


                {car.type || "Car"}


              </p>







              <img


                src={getImage(car.image)}


                alt={car.name || car.model}


              />









              <div className="info">



                <span>

                  ⛽ {car.fuel || "Petrol"}

                </span>





                <span>

                  ⚙️ {car.gear || "Automatic"}

                </span>





                <span>

                  👥 {car.people || 5}

                </span>



              </div>









              <div className="bottom">





                <h3>

                  ${car.pricePerDay || car.price || 0}/day


                </h3>







                <Link to={`/car/${car._id || car.id}`}>



                  <button>

                    Rent Now

                  </button>



                </Link>





              </div>






            </div>




          ))



        )}





      </div>





    </div>


  );

}



export default Home;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./details.css";


function CarDetails() {


  const { id } = useParams();

  const [car, setCar] = useState(null);




  useEffect(() => {


    fetch("http://localhost:3000/cars")

      .then((res)=>res.json())

      .then((data)=>{


        const selectedCar = data.find(

          (c)=>c._id === id || c.id === Number(id)

        );


        setCar(selectedCar);


      })

      .catch((err)=>{

        console.log(err);

      });



  },[id]);








  const getImage = (image)=>{


    if(!image){

      return "";

    }




    // ძველი მანქანების ფოტოები

    if(image.startsWith("/images")){

      return image;

    }





    // Add Car ატვირთული ფოტოები

    if(image.startsWith("/uploads")){

      return `http://localhost:3000${image}`;

    }





    // თუ უბრალოდ სახელი წერია

    return `/images/${image}`;


  };








  if(!car){


    return (

      <h1 className="loading">

        Loading...

      </h1>

    );


  }







  return (


    <div className="page">





      <div className="details">



        <div className="left">


          <div className="blue-card">



            <h1>

              Sports car with the best design

            </h1>




            <p>

              Safety and comfort while driving a futuristic
              and elegant car

            </p>






            <img

              src={getImage(car.image)}

              alt={car.name || car.model}

            />




          </div>


        </div>







        <div className="right">



          <p className="type">

            {car.type || "Car"}

          </p>





          <h1>

            {car.name || `${car.brand} ${car.model}`}

          </h1>





          <p>

            {car.description ||

            "Enjoy driving with premium comfort, high speed and modern technology. Perfect choice for city rides and long trips."}


          </p>







          <div className="specs">


            <p>

              ⛽ Fuel: {car.fuel || "Petrol"}

            </p>



            <p>

              ⚙️ Gear: {car.gear || "Automatic"}

            </p>




            <p>

              👥 Passengers: {car.people || 5}

            </p>



          </div>








          <h2>

            ${car.pricePerDay || car.price}/day

          </h2>






          <button className="rent-btn">

            Rent Now

          </button>





        </div>


      </div>







      <div className="reviews">


        <h2>

          Reviews

        </h2>





        <div className="review-card">


          <h3>

            Alex Stanton

          </h3>


          <p>

            Very good service and amazing car quality.
            The booking process was fast and easy.

          </p>


        </div>






        <div className="review-card">


          <h3>

            Skylar Diaz

          </h3>



          <p>

            Comfortable cars and professional support team.

          </p>



        </div>





        <div className="review-form">


          <textarea

            placeholder="Write your comment..."

          ></textarea>




          <button>

            Send Review

          </button>



        </div>




      </div>








      <div className="chatbot">


        <h2>

          Chat Support

        </h2>





        <div className="chat-box">


          <p>

            <b>Bot:</b> Hello 👋 How can I help you?

          </p>


        </div>





        <input

          type="text"

          placeholder="Write message..."

        />




        <button>

          Send

        </button>





      </div>






    </div>


  );


}


export default CarDetails;
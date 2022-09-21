import logo from "./logo.svg";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Body from "./components/Body/Body";
import React, { Fragment, useState } from "react";
import { useContext } from "react";
import { Routes, Route, Redirect } from "react-router-dom";

import { RestoContextProvider } from "./store/restoContext";
import RestaurantDetail from "./components/Restaurants/RestaurantDetail";

import restoContext from "./store/restoContext";

function App() {
  const restoCtx = useContext(restoContext);

  const restos = [
    {
      name: "A P Bhavan Restaurant",
      address: "Benz Circle and Auto Nagar, Sri Ramachandra Nagar",
      rating: 3.5,
      ct: 100,
      image:
        "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/rfbffsjzt2aepxpe7br2",
      deliveryTime: "38mins",
      id: 1,
    },
    {
      name: "SSS Idly Center",
      address: "Acharya Ranga Nagar, Benz Circle",
      rating: 4.3,
      ct: 100,
      image:
        "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/weufsah9zwqtyvmfecw1",
      deliveryTime: "21mins",
      id: 2,
    },
    {
      name: "Sri SaiRam FastFoods",
      address: "South Indian, Beverages",
      rating: 3.8,
      ct: 100,
      image:
        "https://static.toiimg.com/thumb/54289752.cms?width=1200&height=900",
      deliveryTime: "23mins",
      id: 3,
    },
    {
      name: "Butter Dosa Button Idly",
      address:
        "Benz Circle and Auto Nagar, Benz Circle and Auto Nagar | Change Outlet",
      rating: null,
      ct: 600,
      image:
        "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/leqxbnwzdeloxnqdvzk8",
      deliveryTime: "29mins",
      id: 4,
    },
    {
      name: "Subway",
      address: "Fortune Road, Benz Circle | Change Outlet",
      rating: 4.1,
      ct: 350,
      image:
        "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/w4teugigtp61o4mlr6ed",
      deliveryTime: "26mins",
      id: 5,
    },
    {
      name: "GOOD MORNING FAST FOODS & FRUIT JUICES",
      address: "Governorpet, Governor Peta",
      rating: 4.0,
      ct: 300,
      image:
        "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/whzz3910qf2mqfacyael",
      deliveryTime: "30mins",
      id: 6,
    },
    {
      name: "Minerva Coffee Shop",
      address: "MG Road, Labbipet | Change Outlet",
      rating: 4.0,
      ct: 500,
      image:
        "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/oz0cjc4vzlrsfclnrhxv",
      deliveryTime: "20mins",
      id: 7,
    },
    {
      name: "Desi Rice Bowl",
      address: "Benz Circle and Auto Nagar, Labbipet",
      rating: 3.3,
      ct: 150,
      image:
        "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/cjfjauw8wvc3pwiozonn",
      deliveryTime: "34mins",
      id: 8,
    },
  ];

  const data = {
    name: "Subway",
    address: "Fortune Road, Benz Circle | Change Outlet",
    rating: 4.1,
    ct: 350,
    image: "https://static.toiimg.com/thumb/54289752.cms?width=1200&height=900",
    deliveryTime: "26mins",
    id: 1,
    items: {
      recommended: [
        {
          name: "Paneer Butter Masala",
          price: 180,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR14Y7Xjgh7DUOMTHX6ScHx08HU1WUJLEpmNg&usqp=CAU",
        },
      ],
      breakfast: [
        {
          name: "Upma Butter Pesara",
          price: 100,
          image:
            "https://static.toiimg.com/thumb/56983158.cms?imgsize=631784&width=800&height=800",
        },
        {
          name: "Ghee Rava Masala Dosa",
          price: 95,
          image:
            "https://i0.wp.com/www.bharatzkitchen.com/wp-content/uploads/2020/08/rava-dosa.jpg?fit=640%2C363&ssl=1",
        },
        {
          name: "Plain Pesara With Chicken Curry",
          price: 250,
          image:
            "https://static.toiimg.com/thumb/56983158.cms?imgsize=631784&width=800&height=800",
        },
      ],
      lunch: [
        {
          name: "Egg Meal",
          price: 160,
          image:
            "https://static.onecms.io/wp-content/uploads/sites/44/2019/11/6433782.jpg",
        },
        {
          name: "Veg Meal",
          price: 120,
          image:
            "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/vfvx2mulxwqxyrl4fkfk",
        },
        {
          name: "Chicken Meal",
          price: 170,
          image:
            "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_-_1200x900%2Fpublic%2Fimage%2F2016%2F09%2Fmain%2F_1501p108-weeknight-lemon-chicken-skillet-dinner.jpg%3Fitok%3DDpd4oeTK",
        },
      ],
      dinner: [
        {
          name: "Chicken With Chepathi",
          price: 170,
          image:
            "https://media.istockphoto.com/photos/butter-chicken-indian-chicken-curry-dish-picture-id1163559500?k=20&m=1163559500&s=612x612&w=0&h=v10JxmIeNS9pf0u0aQBUNiZFdbDwVd0tCeXsf65r-28=",
        },
        {
          name: "Parata With Chicken Curry",
          price: 120,
          image:
            "https://media.istockphoto.com/photos/butter-chicken-served-with-homemade-indian-naan-bread-picture-id618457124?k=20&m=618457124&s=612x612&w=0&h=TjiqBwJQqr3xy-_8AGGwmbyOgbDCOEQp0exKK92gSBo=",
        },
        {
          name: "Egg Chepati",
          price: 80,
          image:
            "https://c.ndtvimg.com/2022-03/n56m50l8_egg-chapati_625x300_31_March_22.jpg",
        },
      ],
    },
  };

  const [allRestos, setAllRestos] = useState(restoCtx.allRestos);

  return (
    <Routes>
      <Route
        path="/"
        exact
        element={
          <RestoContextProvider>
            <Navigation />
            <Body restos={allRestos} />
          </RestoContextProvider>
        }
      ></Route>
      <Route
        path="/resto/:restoId"
        element={
          <RestoContextProvider>
            <Navigation />
            <RestaurantDetail />
          </RestoContextProvider>
        }
      ></Route>
    </Routes>
  );
}

export default App;

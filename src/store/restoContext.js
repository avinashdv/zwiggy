import React, { useState } from "react";
import { useReducer } from "react";

const restocontext = React.createContext({
  allRestos: [],
  orderDetails: [],
  totalAmount: 0,
  totalQuantity: 0,
  applyFilter: () => {},
  setRestaurantDetail: () => {},
  addOrder: () => {},
  removeOrder: () => {},
});

const RESTOS = [
  {
    name: "A P Bhavan Restaurant",
    address: "Benz Circle and Auto Nagar, Sri Ramachandra Nagar",
    rating: 3.5,
    ct: 100,
    image:
      "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/rfbffsjzt2aepxpe7br2",
    deliveryTime: "38mins",
    id: 1,
    coupon: {
      name: "WELCOME50",
      percent: 50,
    },
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
    coupon: {
      name: "TRYNEW",
      percent: 20,
    },
  },
  {
    name: "Sri SaiRam FastFoods",
    address: "South Indian, Beverages",
    rating: 3.8,
    ct: 100,
    image: "https://static.toiimg.com/thumb/54289752.cms?width=1200&height=900",
    deliveryTime: "23mins",
    id: 3,
    coupon: {
      name: "STEALDEAL",
      percent: 30,
    },
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
    coupon: {
      name: "WELCOME50",
      percent: 50,
    },
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
    coupon: {
      name: "TRYNEW",
      percent: 20,
    },
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
    coupon: {
      name: "STEALDEAL",
      percent: 30,
    },
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
    coupon: {
      name: "WELCOME50",
      percent: 50,
    },
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
    coupon: {
      name: "TRYNEW",
      percent: 20,
    },
  },
];

const RESTOSDETAILS = [
  {
    restoId: 1,
    items: {
      recommended: [
        {
          id: "1",
          name: "Paneer Butter Masala",
          price: 180,
          isVeg: true,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR14Y7Xjgh7DUOMTHX6ScHx08HU1WUJLEpmNg&usqp=CAU",
          quantity: 0,
        },
      ],
      breakfast: [
        {
          id: "2",
          name: "Upma Butter Pesara",
          price: 100,
          isVeg: true,
          image:
            "https://static.toiimg.com/thumb/56983158.cms?imgsize=631784&width=800&height=800",
          quantity: 0,
        },
        {
          id: "3",
          name: "Ghee Rava Masala Dosa",
          price: 95,
          isVeg: true,
          image:
            "https://i0.wp.com/www.bharatzkitchen.com/wp-content/uploads/2020/08/rava-dosa.jpg?fit=640%2C363&ssl=1",
          quantity: 0,
        },
        {
          id: "4",
          name: "Plain Pesara With Chicken Curry",
          price: 250,
          isVeg: false,
          image:
            "https://static.toiimg.com/thumb/56983158.cms?imgsize=631784&width=800&height=800",
          quantity: 0,
        },
      ],
      lunch: [
        {
          id: "5",
          name: "Egg Meal",
          price: 160,
          isVeg: false,
          image:
            "https://static.onecms.io/wp-content/uploads/sites/44/2019/11/6433782.jpg",
          quantity: 0,
        },
        {
          id: "6",
          name: "Veg Meal",
          price: 120,
          isVeg: true,
          image:
            "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/vfvx2mulxwqxyrl4fkfk",
          quantity: 0,
        },
        {
          id: "7",
          name: "Chicken Meal",
          price: 170,
          isVeg: false,
          image:
            "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_-_1200x900%2Fpublic%2Fimage%2F2016%2F09%2Fmain%2F_1501p108-weeknight-lemon-chicken-skillet-dinner.jpg%3Fitok%3DDpd4oeTK",
          quantity: 0,
        },
      ],
      dinner: [
        {
          id: "8",
          name: "Chicken With Chepathi",
          price: 170,
          isVeg: false,
          image:
            "https://media.istockphoto.com/photos/butter-chicken-indian-chicken-curry-dish-picture-id1163559500?k=20&m=1163559500&s=612x612&w=0&h=v10JxmIeNS9pf0u0aQBUNiZFdbDwVd0tCeXsf65r-28=",
          quantity: 0,
        },
        {
          id: "9",
          name: "Parata With Chicken Curry",
          price: 120,
          isVeg: false,
          image:
            "https://media.istockphoto.com/photos/butter-chicken-served-with-homemade-indian-naan-bread-picture-id618457124?k=20&m=618457124&s=612x612&w=0&h=TjiqBwJQqr3xy-_8AGGwmbyOgbDCOEQp0exKK92gSBo=",
          quantity: 0,
        },
        {
          id: "10",
          name: "Egg Chepati",
          price: 80,
          isVeg: false,
          image:
            "https://c.ndtvimg.com/2022-03/n56m50l8_egg-chapati_625x300_31_March_22.jpg",
          quantity: 0,
        },
      ],
    },
  },
  {
    restoId: 2,
    items: {
      recommended: [
        {
          id: "1",
          name: "Paneer Butter Masala",
          price: 180,
          isVeg: true,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR14Y7Xjgh7DUOMTHX6ScHx08HU1WUJLEpmNg&usqp=CAU",
          quantity: 0,
        },
      ],
      breakfast: [
        {
          id: "2",
          name: "Upma Butter Pesara",
          price: 100,
          isVeg: true,
          image:
            "https://static.toiimg.com/thumb/56983158.cms?imgsize=631784&width=800&height=800",
          quantity: 0,
        },
        {
          id: "3",
          name: "Ghee Rava Masala Dosa",
          price: 95,
          isVeg: true,
          image:
            "https://i0.wp.com/www.bharatzkitchen.com/wp-content/uploads/2020/08/rava-dosa.jpg?fit=640%2C363&ssl=1",
          quantity: 0,
        },
        {
          id: "4",
          name: "Plain Pesara With Chicken Curry",
          price: 250,
          isVeg: false,
          image:
            "https://static.toiimg.com/thumb/56983158.cms?imgsize=631784&width=800&height=800",
          quantity: 0,
        },
      ],
      lunch: [
        {
          id: "5",
          name: "Egg Meal",
          price: 160,
          isVeg: false,
          image:
            "https://static.onecms.io/wp-content/uploads/sites/44/2019/11/6433782.jpg",
          quantity: 0,
        },
        {
          id: "6",
          name: "Veg Meal",
          price: 120,
          isVeg: true,
          image:
            "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/vfvx2mulxwqxyrl4fkfk",
          quantity: 0,
        },
        {
          id: "7",
          name: "Chicken Meal",
          price: 170,
          isVeg: false,
          image:
            "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_-_1200x900%2Fpublic%2Fimage%2F2016%2F09%2Fmain%2F_1501p108-weeknight-lemon-chicken-skillet-dinner.jpg%3Fitok%3DDpd4oeTK",
          quantity: 0,
        },
      ],
      dinner: [
        {
          id: "8",
          name: "Chicken With Chepathi",
          price: 170,
          isVeg: false,
          image:
            "https://media.istockphoto.com/photos/butter-chicken-indian-chicken-curry-dish-picture-id1163559500?k=20&m=1163559500&s=612x612&w=0&h=v10JxmIeNS9pf0u0aQBUNiZFdbDwVd0tCeXsf65r-28=",
          quantity: 0,
        },
        {
          id: "9",
          name: "Parata With Chicken Curry",
          price: 120,
          isVeg: false,
          image:
            "https://media.istockphoto.com/photos/butter-chicken-served-with-homemade-indian-naan-bread-picture-id618457124?k=20&m=618457124&s=612x612&w=0&h=TjiqBwJQqr3xy-_8AGGwmbyOgbDCOEQp0exKK92gSBo=",
          quantity: 0,
        },
        {
          id: "10",
          name: "Egg Chepati",
          price: 80,
          isVeg: false,
          image:
            "https://c.ndtvimg.com/2022-03/n56m50l8_egg-chapati_625x300_31_March_22.jpg",
          quantity: 0,
        },
      ],
    },
  },
  {
    restoId: 3,
    items: {
      recommended: [
        {
          id: "1",
          name: "Paneer Butter Masala",
          price: 180,
          isVeg: true,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR14Y7Xjgh7DUOMTHX6ScHx08HU1WUJLEpmNg&usqp=CAU",
          quantity: 0,
        },
      ],
      breakfast: [
        {
          id: "2",
          name: "Upma Butter Pesara",
          price: 100,
          isVeg: true,
          image:
            "https://static.toiimg.com/thumb/56983158.cms?imgsize=631784&width=800&height=800",
          quantity: 0,
        },
        {
          id: "3",
          name: "Ghee Rava Masala Dosa",
          price: 95,
          isVeg: true,
          image:
            "https://i0.wp.com/www.bharatzkitchen.com/wp-content/uploads/2020/08/rava-dosa.jpg?fit=640%2C363&ssl=1",
          quantity: 0,
        },
        {
          id: "4",
          name: "Plain Pesara With Chicken Curry",
          price: 250,
          isVeg: false,
          image:
            "https://static.toiimg.com/thumb/56983158.cms?imgsize=631784&width=800&height=800",
          quantity: 0,
        },
      ],
      lunch: [
        {
          id: "5",
          name: "Egg Meal",
          price: 160,
          isVeg: false,
          image:
            "https://static.onecms.io/wp-content/uploads/sites/44/2019/11/6433782.jpg",
          quantity: 0,
        },
        {
          id: "6",
          name: "Veg Meal",
          price: 120,
          isVeg: true,
          image:
            "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/vfvx2mulxwqxyrl4fkfk",
          quantity: 0,
        },
        {
          id: "7",
          name: "Chicken Meal",
          price: 170,
          isVeg: false,
          image:
            "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_-_1200x900%2Fpublic%2Fimage%2F2016%2F09%2Fmain%2F_1501p108-weeknight-lemon-chicken-skillet-dinner.jpg%3Fitok%3DDpd4oeTK",
          quantity: 0,
        },
      ],
      dinner: [
        {
          id: "8",
          name: "Chicken With Chepathi",
          price: 170,
          isVeg: false,
          image:
            "https://media.istockphoto.com/photos/butter-chicken-indian-chicken-curry-dish-picture-id1163559500?k=20&m=1163559500&s=612x612&w=0&h=v10JxmIeNS9pf0u0aQBUNiZFdbDwVd0tCeXsf65r-28=",
          quantity: 0,
        },
        {
          id: "9",
          name: "Parata With Chicken Curry",
          price: 120,
          isVeg: false,
          image:
            "https://media.istockphoto.com/photos/butter-chicken-served-with-homemade-indian-naan-bread-picture-id618457124?k=20&m=618457124&s=612x612&w=0&h=TjiqBwJQqr3xy-_8AGGwmbyOgbDCOEQp0exKK92gSBo=",
          quantity: 0,
        },
        {
          id: "10",
          name: "Egg Chepati",
          price: 80,
          isVeg: false,
          image:
            "https://c.ndtvimg.com/2022-03/n56m50l8_egg-chapati_625x300_31_March_22.jpg",
          quantity: 0,
        },
      ],
    },
  },
  {
    restoId: 4,
    items: {
      recommended: [
        {
          id: "1",
          name: "Paneer Butter Masala",
          price: 180,
          isVeg: true,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR14Y7Xjgh7DUOMTHX6ScHx08HU1WUJLEpmNg&usqp=CAU",
          quantity: 0,
        },
      ],
      breakfast: [
        {
          id: "2",
          name: "Upma Butter Pesara",
          price: 100,
          isVeg: true,
          image:
            "https://static.toiimg.com/thumb/56983158.cms?imgsize=631784&width=800&height=800",
          quantity: 0,
        },
        {
          id: "3",
          name: "Ghee Rava Masala Dosa",
          price: 95,
          isVeg: true,
          image:
            "https://i0.wp.com/www.bharatzkitchen.com/wp-content/uploads/2020/08/rava-dosa.jpg?fit=640%2C363&ssl=1",
          quantity: 0,
        },
        {
          id: "4",
          name: "Plain Pesara With Chicken Curry",
          price: 250,
          isVeg: false,
          image:
            "https://static.toiimg.com/thumb/56983158.cms?imgsize=631784&width=800&height=800",
          quantity: 0,
        },
      ],
      lunch: [
        {
          id: "5",
          name: "Egg Meal",
          price: 160,
          isVeg: false,
          image:
            "https://static.onecms.io/wp-content/uploads/sites/44/2019/11/6433782.jpg",
          quantity: 0,
        },
        {
          id: "6",
          name: "Veg Meal",
          price: 120,
          isVeg: true,
          image:
            "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/vfvx2mulxwqxyrl4fkfk",
          quantity: 0,
        },
        {
          id: "7",
          name: "Chicken Meal",
          price: 170,
          isVeg: false,
          image:
            "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_-_1200x900%2Fpublic%2Fimage%2F2016%2F09%2Fmain%2F_1501p108-weeknight-lemon-chicken-skillet-dinner.jpg%3Fitok%3DDpd4oeTK",
          quantity: 0,
        },
      ],
      dinner: [
        {
          id: "8",
          name: "Chicken With Chepathi",
          price: 170,
          isVeg: false,
          image:
            "https://media.istockphoto.com/photos/butter-chicken-indian-chicken-curry-dish-picture-id1163559500?k=20&m=1163559500&s=612x612&w=0&h=v10JxmIeNS9pf0u0aQBUNiZFdbDwVd0tCeXsf65r-28=",
          quantity: 0,
        },
        {
          id: "9",
          name: "Parata With Chicken Curry",
          price: 120,
          isVeg: false,
          image:
            "https://media.istockphoto.com/photos/butter-chicken-served-with-homemade-indian-naan-bread-picture-id618457124?k=20&m=618457124&s=612x612&w=0&h=TjiqBwJQqr3xy-_8AGGwmbyOgbDCOEQp0exKK92gSBo=",
          quantity: 0,
        },
        {
          id: "10",
          name: "Egg Chepati",
          price: 80,
          isVeg: false,
          image:
            "https://c.ndtvimg.com/2022-03/n56m50l8_egg-chapati_625x300_31_March_22.jpg",
          quantity: 0,
        },
      ],
    },
  },
  {
    restoId: 5,
    items: {
      recommended: [
        {
          id: "1",
          name: "Paneer Butter Masala",
          price: 180,
          isVeg: true,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR14Y7Xjgh7DUOMTHX6ScHx08HU1WUJLEpmNg&usqp=CAU",
          quantity: 0,
        },
      ],
      breakfast: [
        {
          id: "2",
          name: "Upma Butter Pesara",
          price: 100,
          isVeg: true,
          image:
            "https://static.toiimg.com/thumb/56983158.cms?imgsize=631784&width=800&height=800",
          quantity: 0,
        },
        {
          id: "3",
          name: "Ghee Rava Masala Dosa",
          price: 95,
          isVeg: true,
          image:
            "https://i0.wp.com/www.bharatzkitchen.com/wp-content/uploads/2020/08/rava-dosa.jpg?fit=640%2C363&ssl=1",
          quantity: 0,
        },
        {
          id: "4",
          name: "Plain Pesara With Chicken Curry",
          price: 250,
          isVeg: false,
          image:
            "https://static.toiimg.com/thumb/56983158.cms?imgsize=631784&width=800&height=800",
          quantity: 0,
        },
      ],
      lunch: [
        {
          id: "5",
          name: "Egg Meal",
          price: 160,
          isVeg: false,
          image:
            "https://static.onecms.io/wp-content/uploads/sites/44/2019/11/6433782.jpg",
          quantity: 0,
        },
        {
          id: "6",
          name: "Veg Meal",
          price: 120,
          isVeg: true,
          image:
            "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/vfvx2mulxwqxyrl4fkfk",
          quantity: 0,
        },
        {
          id: "7",
          name: "Chicken Meal",
          price: 170,
          isVeg: false,
          image:
            "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_-_1200x900%2Fpublic%2Fimage%2F2016%2F09%2Fmain%2F_1501p108-weeknight-lemon-chicken-skillet-dinner.jpg%3Fitok%3DDpd4oeTK",
          quantity: 0,
        },
      ],
      dinner: [
        {
          id: "8",
          name: "Chicken With Chepathi",
          price: 170,
          isVeg: false,
          image:
            "https://media.istockphoto.com/photos/butter-chicken-indian-chicken-curry-dish-picture-id1163559500?k=20&m=1163559500&s=612x612&w=0&h=v10JxmIeNS9pf0u0aQBUNiZFdbDwVd0tCeXsf65r-28=",
          quantity: 0,
        },
        {
          id: "9",
          name: "Parata With Chicken Curry",
          price: 120,
          isVeg: false,
          image:
            "https://media.istockphoto.com/photos/butter-chicken-served-with-homemade-indian-naan-bread-picture-id618457124?k=20&m=618457124&s=612x612&w=0&h=TjiqBwJQqr3xy-_8AGGwmbyOgbDCOEQp0exKK92gSBo=",
          quantity: 0,
        },
        {
          id: "10",
          name: "Egg Chepati",
          price: 80,
          isVeg: false,
          image:
            "https://c.ndtvimg.com/2022-03/n56m50l8_egg-chapati_625x300_31_March_22.jpg",
          quantity: 0,
        },
      ],
    },
  },
  {
    restoId: 6,
    items: {
      recommended: [
        {
          id: "1",
          name: "Paneer Butter Masala",
          price: 180,
          isVeg: true,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR14Y7Xjgh7DUOMTHX6ScHx08HU1WUJLEpmNg&usqp=CAU",
          quantity: 0,
        },
      ],
      breakfast: [
        {
          id: "2",
          name: "Upma Butter Pesara",
          price: 100,
          isVeg: true,
          image:
            "https://static.toiimg.com/thumb/56983158.cms?imgsize=631784&width=800&height=800",
          quantity: 0,
        },
        {
          id: "3",
          name: "Ghee Rava Masala Dosa",
          price: 95,
          isVeg: true,
          image:
            "https://i0.wp.com/www.bharatzkitchen.com/wp-content/uploads/2020/08/rava-dosa.jpg?fit=640%2C363&ssl=1",
          quantity: 0,
        },
        {
          id: "4",
          name: "Plain Pesara With Chicken Curry",
          price: 250,
          isVeg: false,
          image:
            "https://static.toiimg.com/thumb/56983158.cms?imgsize=631784&width=800&height=800",
          quantity: 0,
        },
      ],
      lunch: [
        {
          id: "5",
          name: "Egg Meal",
          price: 160,
          isVeg: false,
          image:
            "https://static.onecms.io/wp-content/uploads/sites/44/2019/11/6433782.jpg",
          quantity: 0,
        },
        {
          id: "6",
          name: "Veg Meal",
          price: 120,
          isVeg: true,
          image:
            "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/vfvx2mulxwqxyrl4fkfk",
          quantity: 0,
        },
        {
          id: "7",
          name: "Chicken Meal",
          price: 170,
          isVeg: false,
          image:
            "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_-_1200x900%2Fpublic%2Fimage%2F2016%2F09%2Fmain%2F_1501p108-weeknight-lemon-chicken-skillet-dinner.jpg%3Fitok%3DDpd4oeTK",
          quantity: 0,
        },
      ],
      dinner: [
        {
          id: "8",
          name: "Chicken With Chepathi",
          price: 170,
          isVeg: false,
          image:
            "https://media.istockphoto.com/photos/butter-chicken-indian-chicken-curry-dish-picture-id1163559500?k=20&m=1163559500&s=612x612&w=0&h=v10JxmIeNS9pf0u0aQBUNiZFdbDwVd0tCeXsf65r-28=",
          quantity: 0,
        },
        {
          id: "9",
          name: "Parata With Chicken Curry",
          price: 120,
          isVeg: false,
          image:
            "https://media.istockphoto.com/photos/butter-chicken-served-with-homemade-indian-naan-bread-picture-id618457124?k=20&m=618457124&s=612x612&w=0&h=TjiqBwJQqr3xy-_8AGGwmbyOgbDCOEQp0exKK92gSBo=",
          quantity: 0,
        },
        {
          id: "10",
          name: "Egg Chepati",
          price: 80,
          isVeg: false,
          image:
            "https://c.ndtvimg.com/2022-03/n56m50l8_egg-chapati_625x300_31_March_22.jpg",
          quantity: 0,
        },
      ],
    },
  },
  {
    restoId: 7,
    items: {
      recommended: [
        {
          id: "1",
          name: "Paneer Butter Masala",
          price: 180,
          isVeg: true,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR14Y7Xjgh7DUOMTHX6ScHx08HU1WUJLEpmNg&usqp=CAU",
          quantity: 0,
        },
      ],
      breakfast: [
        {
          id: "2",
          name: "Upma Butter Pesara",
          price: 100,
          isVeg: true,
          image:
            "https://static.toiimg.com/thumb/56983158.cms?imgsize=631784&width=800&height=800",
          quantity: 0,
        },
        {
          id: "3",
          name: "Ghee Rava Masala Dosa",
          price: 95,
          isVeg: true,
          image:
            "https://i0.wp.com/www.bharatzkitchen.com/wp-content/uploads/2020/08/rava-dosa.jpg?fit=640%2C363&ssl=1",
          quantity: 0,
        },
        {
          id: "4",
          name: "Plain Pesara With Chicken Curry",
          price: 250,
          isVeg: false,
          image:
            "https://static.toiimg.com/thumb/56983158.cms?imgsize=631784&width=800&height=800",
          quantity: 0,
        },
      ],
      lunch: [
        {
          id: "5",
          name: "Egg Meal",
          price: 160,
          isVeg: false,
          image:
            "https://static.onecms.io/wp-content/uploads/sites/44/2019/11/6433782.jpg",
          quantity: 0,
        },
        {
          id: "6",
          name: "Veg Meal",
          price: 120,
          isVeg: true,
          image:
            "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/vfvx2mulxwqxyrl4fkfk",
          quantity: 0,
        },
        {
          id: "7",
          name: "Chicken Meal",
          price: 170,
          isVeg: false,
          image:
            "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_-_1200x900%2Fpublic%2Fimage%2F2016%2F09%2Fmain%2F_1501p108-weeknight-lemon-chicken-skillet-dinner.jpg%3Fitok%3DDpd4oeTK",
          quantity: 0,
        },
      ],
      dinner: [
        {
          id: "8",
          name: "Chicken With Chepathi",
          price: 170,
          isVeg: false,
          image:
            "https://media.istockphoto.com/photos/butter-chicken-indian-chicken-curry-dish-picture-id1163559500?k=20&m=1163559500&s=612x612&w=0&h=v10JxmIeNS9pf0u0aQBUNiZFdbDwVd0tCeXsf65r-28=",
          quantity: 0,
        },
        {
          id: "9",
          name: "Parata With Chicken Curry",
          price: 120,
          isVeg: false,
          image:
            "https://media.istockphoto.com/photos/butter-chicken-served-with-homemade-indian-naan-bread-picture-id618457124?k=20&m=618457124&s=612x612&w=0&h=TjiqBwJQqr3xy-_8AGGwmbyOgbDCOEQp0exKK92gSBo=",
          quantity: 0,
        },
        {
          id: "10",
          name: "Egg Chepati",
          price: 80,
          isVeg: false,
          image:
            "https://c.ndtvimg.com/2022-03/n56m50l8_egg-chapati_625x300_31_March_22.jpg",
          quantity: 0,
        },
      ],
    },
  },
  {
    restoId: 8,
    items: {
      recommended: [
        {
          id: "1",
          name: "Paneer Butter Masala",
          price: 180,
          isVeg: true,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR14Y7Xjgh7DUOMTHX6ScHx08HU1WUJLEpmNg&usqp=CAU",
          quantity: 0,
        },
      ],
      breakfast: [
        {
          id: "2",
          name: "Upma Butter Pesara",
          price: 100,
          isVeg: true,
          image:
            "https://static.toiimg.com/thumb/56983158.cms?imgsize=631784&width=800&height=800",
          quantity: 0,
        },
        {
          id: "3",
          name: "Ghee Rava Masala Dosa",
          price: 95,
          isVeg: true,
          image:
            "https://i0.wp.com/www.bharatzkitchen.com/wp-content/uploads/2020/08/rava-dosa.jpg?fit=640%2C363&ssl=1",
          quantity: 0,
        },
        {
          id: "4",
          name: "Plain Pesara With Chicken Curry",
          price: 250,
          isVeg: false,
          image:
            "https://static.toiimg.com/thumb/56983158.cms?imgsize=631784&width=800&height=800",
          quantity: 0,
        },
      ],
      lunch: [
        {
          id: "5",
          name: "Egg Meal",
          price: 160,
          isVeg: false,
          image:
            "https://static.onecms.io/wp-content/uploads/sites/44/2019/11/6433782.jpg",
          quantity: 0,
        },
        {
          id: "6",
          name: "Veg Meal",
          price: 120,
          isVeg: true,
          image:
            "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/vfvx2mulxwqxyrl4fkfk",
          quantity: 0,
        },
        {
          id: "7",
          name: "Chicken Meal",
          price: 170,
          isVeg: false,
          image:
            "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_-_1200x900%2Fpublic%2Fimage%2F2016%2F09%2Fmain%2F_1501p108-weeknight-lemon-chicken-skillet-dinner.jpg%3Fitok%3DDpd4oeTK",
          quantity: 0,
        },
      ],
      dinner: [
        {
          id: "8",
          name: "Chicken With Chepathi",
          price: 170,
          isVeg: false,
          image:
            "https://media.istockphoto.com/photos/butter-chicken-indian-chicken-curry-dish-picture-id1163559500?k=20&m=1163559500&s=612x612&w=0&h=v10JxmIeNS9pf0u0aQBUNiZFdbDwVd0tCeXsf65r-28=",
          quantity: 0,
        },
        {
          id: "9",
          name: "Parata With Chicken Curry",
          price: 120,
          isVeg: false,
          image:
            "https://media.istockphoto.com/photos/butter-chicken-served-with-homemade-indian-naan-bread-picture-id618457124?k=20&m=618457124&s=612x612&w=0&h=TjiqBwJQqr3xy-_8AGGwmbyOgbDCOEQp0exKK92gSBo=",
          quantity: 0,
        },
        {
          id: "10",
          name: "Egg Chepati",
          price: 80,
          isVeg: false,
          image:
            "https://c.ndtvimg.com/2022-03/n56m50l8_egg-chapati_625x300_31_March_22.jpg",
          quantity: 0,
        },
      ],
    },
  },
];

const defaultCartState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    let updatedTotalQuantity;
    let updatedTotalAmount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity++,
      };
      updatedTotalAmount = state.totalAmount + action.item.price;

      updatedTotalQuantity = state.totalQuantity;
      updatedItems = [...state.items];
      updatedItems[existingCartItem] = updatedItem;
    } else {
      action.item.quantity++;
      updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.quantity;
      updatedItems = state.items.concat(action.item);
      updatedTotalQuantity = state.totalQuantity + action.item.quantity;
    }

    const result = {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      totalQuantity: updatedTotalQuantity,
    };
    console.log("////", result);
    return result;
  }
  if (action.type === "REMOVE") {
    let updatedTotalQuantity;
    let updatedTotalAmount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    state.items[existingCartItemIndex].quantity--;

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem.quantity) {
      updatedItems = [...state.items];

      updatedTotalAmount = state.totalAmount - action.item.price;

      updatedTotalQuantity = state.totalQuantity;
    } else {
      console.log("no quantity", state.totalQuantity);
      updatedItems = [...state.items].filter(
        (item) => item.id !== action.item.id
      );
      updatedTotalAmount = state.totalAmount - action.item.price;
      updatedTotalQuantity = state.totalQuantity - 1;
      console.log("no quantity", state.totalQuantity);
    }

    const result = {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      totalQuantity: updatedTotalQuantity,
    };

    console.log("////", result);

    return result;
  }
};

export const RestoContextProvider = (props) => {
  const [allRestos, setAllRestos] = useState(RESTOS);
  const [eachOrderDetail, setEachOrderDetail] = useState({});

  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const applyFilter = (filter) => {
    console.log("Filter", filter, allRestos);
    let filteredRestos;
    if (filter === "delivery") {
      filteredRestos = allRestos.sort((a, b) => {
        return (
          parseInt(a.deliveryTime.slice(0, 2)) -
          parseInt(b.deliveryTime.slice(0, 2))
        );
      });
    } else if (filter === "rating") {
      filteredRestos = allRestos.sort((a, b) => {
        return b.rating - a.rating;
      });
    } else if (filter === "lowToHigh") {
      filteredRestos = allRestos.sort((a, b) => {
        return a.ct - b.ct;
      });
    } else if (filter === "highToLow") {
      filteredRestos = allRestos.sort((a, b) => {
        return b.ct - a.ct;
      });
    } else if (filter === "relevance") {
      filteredRestos = allRestos.sort((a, b) => {
        return a.id - b.id;
      });
      console.log("LLLL", filteredRestos);
    }
    setAllRestos([...filteredRestos]);
  };

  const setRestaurantDetail = (restoId) => {
    const restoDetail = RESTOSDETAILS.find(
      (resto) => resto.restoId === parseInt(restoId)
    );
    const restoAbout = allRestos.find(
      (resto) => resto.id === parseInt(restoId)
    );
    restoDetail.about = restoAbout;
    return restoDetail;
  };

  const addOrder = (restoId, itemId) => {
    const allTypesOfARestoItems = RESTOSDETAILS.find(
      (resto) => parseInt(resto.restoId) === parseInt(restoId)
    ).items;
    const requestedItem = [
      ...allTypesOfARestoItems.recommended,
      ...allTypesOfARestoItems.breakfast,
      ...allTypesOfARestoItems.lunch,
      ...allTypesOfARestoItems.dinner,
    ].find((item) => item.id === itemId);
    // requestedItem.quantity++;
    requestedItem.restoId = restoId;
    dispatchCartAction({ type: "ADD", item: requestedItem });
  };

  const removeOrder = (restoId, itemId) => {
    const allTypesOfARestoItems = RESTOSDETAILS.find(
      (resto) => parseInt(resto.restoId) === parseInt(restoId)
    ).items;

    const requestedItem = [
      ...allTypesOfARestoItems.recommended,
      ...allTypesOfARestoItems.breakfast,
      ...allTypesOfARestoItems.lunch,
      ...allTypesOfARestoItems.dinner,
    ].find((item) => item.id === itemId);

    requestedItem.restoId = restoId;

    dispatchCartAction({
      type: "REMOVE",
      item: requestedItem,
    });
  };

  return (
    <restocontext.Provider
      value={{
        allRestos: allRestos,
        orderDetails: cartState.items,
        totalAmount: cartState.totalAmount,
        totalQuantity: cartState.totalQuantity,
        applyFilter: applyFilter,
        setRestaurantDetail: setRestaurantDetail,
        addOrder: addOrder,
        removeOrder: removeOrder,
      }}
    >
      {props.children}
    </restocontext.Provider>
  );
};

export default restocontext;

import classes from "./Restaurants.module.css";
import Card from "../UI/Card";
import { useContext } from "react";

import restoContext from "../../store/restoContext";

const Restaurants = (props) => {
  const restoCtx = useContext(restoContext);

  const styles = `${props.className} ${classes.restaurants}`;
  console.log("prosrestos", restoCtx);
  const allRestos = restoCtx.allRestos.map((resto) => {
    return <Card key={resto.id} resto={resto}></Card>;
  });
  return <div className={styles}>{allRestos}</div>;
};

export default Restaurants;

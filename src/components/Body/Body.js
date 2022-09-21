import Restaurant from "../Restaurants/Restaurants";
import classes from "./Body.module.css";
import { useContext } from "react";
import restoContext from "../../store/restoContext";

const Body = (props) => {
  const restoCtx = useContext(restoContext);

  return (
    <div className={classes.body}>
      <div className={classes.bodyContent}>
        <div className={classes.bodyMiniNav}>
          <h1 className={classes.bodyTitle}>8 restaurants</h1>
          <div className={classes.bodyFilters}>
            <a
              href="#"
              onClick={() => {
                restoCtx.applyFilter("relevance");
              }}
            >
              Relevance
            </a>
            <a
              href="#"
              onClick={() => {
                restoCtx.applyFilter("delivery");
              }}
            >
              Delivery Time
            </a>
            <a
              href="#"
              onClick={() => {
                restoCtx.applyFilter("rating");
              }}
            >
              Rating
            </a>
            <a
              href="#"
              onClick={() => {
                restoCtx.applyFilter("lowToHigh");
              }}
            >
              Cost: Low To High
            </a>
            <a
              href="#"
              onClick={() => {
                restoCtx.applyFilter("highToLow");
              }}
            >
              Cost: High To Low
            </a>
          </div>
        </div>
        <Restaurant className={classes.bodyRestaurants} restos={props.restos} />
      </div>
    </div>
  );
};

export default Body;

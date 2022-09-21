import classes from "./Card.module.css";
import { Fragment } from "react";

import { Link } from "react-router-dom";

const Card = (props) => {
  const name = props.resto.name;
  const address = props.resto.address;
  const rating = props.resto.rating ? props.resto.rating : "N/A";
  const deliveryTime = props.resto.deliveryTime;
  const costForTwo = props.resto.ct;
  const bgImg = props.resto.image;
  const id = props.resto.id;
  const couponName = props.resto.coupon.name;
  const couponPercent = props.resto.coupon.percent;

  return (
    <Fragment>
      <Link to={`/resto/${id}`} className={classes.card}>
        <div
          style={{
            background: `url(
            ${bgImg}
          )`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "auto",
            height: "200px",
          }}
        ></div>
        <div className={classes.cardContent}>
          <h1>{name}</h1>
          <p>{address}</p>
          <div className={classes.cardXtras}>
            <div>
              <div
                className={classes.cardRating}
                style={{
                  backgroundColor: `${rating >= 4 ? "#48c479" : "#db7c38"}`,
                }}
              >
                <span>
                  <i className="fa fa-star"></i>
                </span>
                <span>{rating}</span>
              </div>
            </div>
            <p>{deliveryTime}</p>
            <p>₹{costForTwo}</p>
          </div>
          <div className={classes.cardCoupons}>
            <h2>
              <i className="fas fa-tag"></i> {couponPercent}% off | {couponName}
            </h2>
          </div>
        </div>
      </Link>
    </Fragment>
  );
};

export default Card;

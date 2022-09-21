import classes from "./RestaurantDetail.module.css";

import { Fragment, useContext, useEffect, useState } from "react";
import restoContext from "../../store/restoContext";
import { useParams } from "react-router";

const RestaurantDetail = () => {
  const [restaurant, setRestaurant] = useState({});

  const restoCtx = useContext(restoContext);
  const params = useParams();
  const restoId = params.restoId;

  useEffect(() => {
    const restoDetail = restoCtx.setRestaurantDetail(restoId);
    setRestaurant({ ...restoDetail });
  }, []);

  const ImageWithButtonUI = (props) => {
    const restoId = props.restoId;
    const item = props.item;
    return (
      <div
        className={classes.restoItemsBgImg}
        style={{
          background: `url(${item.image})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "120px",
          height: "100px",
          borderRadius: "14px",
        }}
      >
        <div className={classes.restoBtn}>
          {item.quantity > 0 ? (
            <button
              className={classes.restoItemRemove}
              onClick={() => {
                restoCtx.removeOrder(restoId, item.id);
              }}
            >
              -
            </button>
          ) : null}
          <div
            style={{
              width: `${item.quantity > 0 ? "50%" : "100%"}`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "12px",
              backgroundColor: "white",
            }}
            onClick={() => {
              restoCtx.addOrder(restoId, item.id);
            }}
          >
            {item.quantity > 0 ? item.quantity : "ADD"}
          </div>
          {item.quantity > 0 ? (
            <button
              className={classes.restoItemAdd}
              onClick={() => {
                restoCtx.addOrder(restoId, item.id);
              }}
            >
              +
            </button>
          ) : null}
        </div>
      </div>
    );
  };

  const ItemCreationUi = (props) => {
    const type = props.itemType;
    return (
      <div>
        {type.map((item) => {
          return (
            <div className={classes.restoType} key={item.id}>
              <div className={classes.restItemsAbout}>
                <p>
                  <i
                    className="fa fa-circle"
                    style={{
                      color: `${item.isVeg ? "#0f8a65" : "#e43b4f"}`,
                      fontSize: "12px",
                      padding: "1.5px",
                      border: `2px solid ${item.isVeg ? "#0f8a65" : "#e43b4f"}`,
                    }}
                  ></i>
                </p>
                <p>{item.name}</p>
                <p>₹{item.price}</p>
              </div>
              <ImageWithButtonUI restoId={restoId} item={item} />
            </div>
          );
        })}
      </div>
    );
  };

  // Different items.
  const recommendedItems = restaurant.items ? (
    <ItemCreationUi itemType={restaurant.items.recommended} />
  ) : null;

  const breakfastItems = restaurant.items ? (
    <ItemCreationUi itemType={restaurant.items.breakfast} />
  ) : null;

  const lunchItems = restaurant.items ? (
    <ItemCreationUi itemType={restaurant.items.lunch} />
  ) : null;

  const dinnerItems = restaurant.items ? (
    <ItemCreationUi itemType={restaurant.items.dinner} />
  ) : null;

  const HeaderContent = () => {
    return (
      <div className={classes.restoDetailHeader}>
        <div className={classes.restoDetailHeaderContent}>
          <div
            className={classes.restoDetailHeaderBgImg}
            style={{
              background: `url(${restaurant.about.image})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "350px",
              height: "200px",
            }}
          ></div>
          <div className={classes.restoDetailHeaderAbout}>
            <h1>{restaurant.about.name}</h1>
            <p>{restaurant.about.address}</p>
            <div className={classes.restoDetailHeaderXtras}>
              <p>
                <i className="fa fa-star"></i> {restaurant.about.rating}
                <br />
                <span className={classes.restaurantXtrasInfo}>
                  500+ Ratings
                </span>
              </p>
              <p>
                {restaurant.about.deliveryTime}
                <br />
                <span className={classes.restaurantXtrasInfo}>
                  Delivery Time
                </span>
              </p>
              <p>
                ₹{restaurant.about.ct}
                <br />
                <span className={classes.restaurantXtrasInfo}>
                  Cost for two
                </span>
              </p>
            </div>
          </div>
          <div className={classes.restoDetailHeaderOffers}>
            <h1>OFFER</h1>
            <p>
              <i className="fas fa-tag"></i>{" "}
              {restaurant.about.coupon ? restaurant.about.coupon.percent : null}
              % Off up to ₹100
            </p>
          </div>
        </div>
      </div>
    );
  };

  const SideNav = () => {
    return (
      <div className={classes.restoSideNav}>
        <a href="#restoRecommended" className={classes.restoTypes}>
          Recommended
        </a>
        <a href="#restoBreakfast" className={classes.restoTypes}>
          Breakfast
        </a>
        <a href="#restoLunch" className={classes.restoTypes}>
          Lunch
        </a>
        <a href="#restoDinner" className={classes.restoTypes}>
          Dinner
        </a>
      </div>
    );
  };

  const AllContent = () => {
    return (
      <div className={classes.restoMainContent}>
        <div id="restoRecommended">
          <h1>Recommended</h1>
          {recommendedItems}
        </div>
        <div id="restoBreakfast">
          <h1>Breakfast</h1>
          {breakfastItems}
        </div>
        <div id="restoLunch">
          <h1>Lunch</h1>
          {lunchItems}
        </div>
        <div id="restoDinner">
          <h1>Dinner</h1>
          {dinnerItems}
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      {restaurant.about && (
        <div className={classes.restoDetail}>
          <HeaderContent />
          <div className={classes.restoDetailBody}>
            <SideNav />
            <AllContent />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default RestaurantDetail;

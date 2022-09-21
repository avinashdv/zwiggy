import { useContext } from "react";
import restocontext from "../../store/restoContext";
import classes from "./Navigation.module.css";

const Navigation = () => {
  const cartCtx = useContext(restocontext);

  return (
    <div className={classes.navigation}>
      <div className={classes.navigationContent}>
        <a href="/">
          <img
            src="https://play-lh.googleusercontent.com/A8jF58KO1y2uHPBUaaHbs9zSvPHoS1FrMdrg8jooV9ftDidkOhnKNWacfPhjKae1IA"
            alt="zwiggy-logo"
            className={classes.navigationLogo}
          />
        </a>
        <p className={classes.navigationCart}>
          <span className={classes.navigationCartQuantity}>
            {cartCtx.totalQuantity}
          </span>
          Cart{" "}
        </p>
      </div>
    </div>
  );
};

export default Navigation;

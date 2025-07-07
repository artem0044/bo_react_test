import "./index.sass";
import { HeaderUnauth } from "@components/layout/Header/HeaderUnauth";
import { Footer } from "@components/layout/Footer";

import BG from "@assets/images/404/bg.png";

export const NotFound = () => {
  return (
    <div className={`base-wrap`}>
      <div className="base-wrap__header">
        <HeaderUnauth />
      </div>

      <div className="base-wrap__content">
        <div className="notFound">
          <div className="notFound__wrap">
            <h1 className="notFound__title">404</h1>
            <img className="notFound__img" src={BG} />
            <p className="notFound__text">Page Not Found</p>
          </div>
        </div>
      </div>

      <div className="base-wrap__footer">{<Footer />}</div>
    </div>
  );
};

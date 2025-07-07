import { Link } from "react-router-dom";
import { LogoIcon } from "@components/library";
import "./header.sass";

export const HeaderUnauth = () => {
  return (
    <header className="header header--fixed">
      <div className="header__wrapper">
        <div className="header__left">
          <>
            <Link className="header__logo" to="/">
              <LogoIcon />
            </Link>
          </>
        </div>
      </div>
    </header>
  );
};

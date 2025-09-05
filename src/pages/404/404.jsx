import { Link } from "react-router";
import Header from "../../components/Header";
import "./404.css";
const PageNotFound = () => {
  return (
    <>
      <Header />
      <div className="page-not-found">
        <div className="error-code">404</div>
        <div className="error-message">
          How dare you stumble upon here, Akaza!
        </div>
        <Link className="back-to-home-link link-primary" to="/">
          Return to your Lord Muzan!
        </Link>
      </div>
    </>
  );
};

export default PageNotFound;

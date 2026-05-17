import { IonRouterLink } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { User } from "lucide-react";
import { useAuth } from '../../contexts/AuthContext.js';
import "./SupportHeader.css";

const SupportHeader: React.FC = () => {
  const history = useHistory();
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="header-fixed2">
      <div className="header-inner">
        <img src="/logo.png" alt="Logo" className="logo" />
        <IonRouterLink href="/home" className="home-link">
          <h3 className="header-title">GO TO STORE</h3>
        </IonRouterLink>
        <div className="header-actions">
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => history.push("/login")}
                className="btn-outline"
              >
                Sign In
              </button>
              <button
                onClick={() => history.push("/register")}
                className="btn-primary"
              >
                Sign Up
              </button>
            </>
          ) : (
            <User
              className="user-icon"
              style={{ cursor: "pointer" }}
              onClick={() => {
                logout();
                history.push("/home");
              }}
            />
          )}
        </div>
      </div>

      <div className="header-title-container">
        <h1>CG SUPPORT CENTER</h1>
        <div className="search-container">
          <FiSearch className="search-icon"/>
          <input
            type="text"
            placeholder="Search for help..."
            className="search-input"
          />
        </div>
      </div>
    </div>
  );
};

export default SupportHeader;
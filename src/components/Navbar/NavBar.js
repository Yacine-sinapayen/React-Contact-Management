import React from "react";
import "./NavBar.scss";
import Logo from "../../assets/Logo.png";
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function NavBar() {

  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/react-contact");
    } catch {
      alert(
        "Pour une raison inconnue nous ne pouvons vous déconnecter, veuillez vérifier votre connexion internet puis réessayer. Merci."
      );
    }
  };

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <img src={Logo} alt="logo" />
          <span>Sapiens Contact</span>
        </div>
        <div className="log-out">
          <button
            onClick={logOut}
            className="btn-nav dark-light border-none font-07 pointer"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
}
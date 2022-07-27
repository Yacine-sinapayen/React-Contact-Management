import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import SignInForm from "../../components/SignInForm/SignInForm";
import Users from "../Home/Users/Users";

export default function Home() {
  //  J'import mon context pour pouvoir changer le texte de la page home en fonction  du status de l'utilisateur
  const { currentUser } = useContext(UserContext);

  return (
    <div className="container p-5">
        {currentUser ? <Users /> : <SignInForm />}
    </div>
  );
};

import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import SignInUpForm from "../SignInUpForm/SignInUpForm";
import Users from "../Home/Users/Users";

export default function Home() {
  //  J'import mon context pour pouvoir changer le texte de la page home en fonction  du status de l'utilisateur
  const { currentUser } = useContext(UserContext);

  return (
    <>
        {currentUser ? <Users /> : <SignInUpForm />}
    </>
  );
};
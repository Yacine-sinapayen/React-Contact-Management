import { createContext, useEffect, useState } from "react";

// J'importe les méthodes nécessaires à l'inscription depuis firebase
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase-config";

// Création du contexte
export const UserContext = createContext();

// Création du composant d'ordre supérieur
export function UserContextProvider(props) {
  // signUp nous permet de nous connecter
  const signUp = (email, pwd) =>
    createUserWithEmailAndPassword(auth, email, pwd);

  // signIn nous permet de nous connecter
  const signIn = (email, pwd) =>
  signInWithEmailAndPassword(auth, email, pwd);

  const [currentUser, setCurrentUser] = useState();
  // Le temps que je reçoive une réponse depuis firebase je vais utiliser une variable
  const [loadingData, setLoadingdata] = useState(true);

  // Ce hook va nous permettre d'observer au premier rendu de la page les chgt liés à firebase : signIn ? signUp ? log-out ? Grace à la méthode "onAuthStateChanged" de firebase
  useEffect(() => {
    // on passe en params à la méthode nos identifiants pour montrer que nous sommmes un utilisateur existant "auth" et "currentUser" qui nous retourne une callback.
    // onAuthStateChanged est un observateur qui va me permettre de regarder à chaque fois si je suis un user qui se signIn signUp ou log-out, et en fonction de ça, ça va me trigger(déclancher) setCurrentUser(currentUser).
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setLoadingdata(false);
    });
    return unsubscribe;
  }, []);


  return (
    <UserContext.Provider value={{ signUp, signIn, currentUser  }}>
    {/* Seulement une fois que l'on a nos données (!loadingData) alors j'envoie mon application */}
      {!loadingData && props.children}
    </UserContext.Provider>
  );
}

import React, { useRef, useState, useContext } from "react";
import { UserContext } from "../../context/userContext.js";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  // J'importe ma méthode signUp depuis mon userContext.js
  const { signUp } = useContext(UserContext);

  const navigate = useNavigate();

  // State du msg de validation que je passe à ma balise <p>
  const [validation, setValidation] = useState("");

  // UseRef me permet de récupérer tous les éléments de mes inputs dans un tableau sans avoir à mapper dessus
  const inputs = useRef([]);

  const addInputs = (el) => {
    // Si mon el existe et qu'il n'est pas déjà dans mon tableau "useRef([])", alors je l'y rajoute
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();

    // Ce log nous renvoie un objet avec une propriété current à l'intérieur de laquelle il y a mon tableau d'inputs. Les refs de mes inputs récupèrent les values et les insèrent dans un tableau
    // console.log(inputs);

    // Validation données coté front
    // Validation de la longueur du mdp en ciblant les champs 1 et 2 de mon tableau de ref qui correspondent aux deux derniers champs de mon form
    if (
      (inputs.current[1].value.length || inputs.current[2].value.length) < 6
    ) {
      setValidation("6 caractères minimum  🙏");
      // Je sors de la fonction avec un :
      return;
    }
    // On vérifie que les deux mpd soient identiques
    else if (inputs.current[1].value !== inputs.current[2].value) {
      setValidation("Les mots de passe ne correspondent pas");
   
      // returen afin de sortir de la fonction
      return;
    }

    // Inscription côté server Firebase. 
    try {
      const cred = await signUp(
        inputs.current[0].value,
        inputs.current[1].value
      );
      //  reset les inputs du form
      formRef.current.reset();
  
      setValidation("");
      // console.log(cred); => me renvoie les valeurs de mes inputs
      // Une fois connecté je veux accéder à ma route privée
      navigate("/react-contact");

    } catch (err) {
      // Gestion des msg d'erreur en fonction de la res côté server firebase
      if (err.code === "auth/invalid-email") {
        setValidation("Le format de l'email n'est pas valide");
      }

      if (err.code === "auth/email-already-in-use") {
        setValidation("Email déjà utilisé");
      }
    }
  };


  return (
    <div className="center-content mrg-auto w75p gap40 flex block">
      <form
        // Permet de reset les inputs du formulaire
        onSubmit={handleForm}
        ref={formRef}
        className="w50p gap10"
      >
        <h1 className="self-center">Inscription</h1>
        <input
          ref={addInputs}
          name="email"
          required={true}
          type="email"
          placeholder="email"
          id="signUpEmail"
          maxLength="200"
        />
        <input
          ref={addInputs}
          name="pwd"
          required={true}
          type="password"
          placeholder="Mot de passe"
          maxLength="200"
          id="signUpPwd"
        />
        <input
          ref={addInputs}
          name="pwd"
          required={true}
          type="password"
          placeholder="Mot de passe"
          maxLength="200"
          id="repeatPwd"
        />
        <p className="red">{validation}</p>
        <div className="center-content">
          <button className="button blue-bg">Inscription</button>
        </div>
      </form>
    </div>
  );
}

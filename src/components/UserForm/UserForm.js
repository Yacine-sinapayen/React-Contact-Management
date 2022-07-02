import React from "react";
import { v4 as uuid } from "uuid";

export default function UserForm({ user, onSubmit, onClose }) {
  // Je gère le POST et le PUT dans une seul est même fonction
  // Si add = {} alors POST
  // Si add = {objet plein} alors PUT
  const add = Object.keys(user).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Si add = true alors POST sinon PUT en lui assignant le tableau de user à modifier.
    let newUser = add ? {} : { ...user };

    // Dans le cas d'un ajout on affecte un nouvel id à notre user
    if (add) {
      newUser.id = uuid();
    }

    // Que ce soit dans le cas d'un POST ou PUT je veux récupérer les valeurs saisies/modifiées par mon utilisateur du coup je vais maper dessus et stock les valeurs dans un tableau.
    ["name", "userName"].map((k) => {
      newUser[k] = e.target[k].value;
      return true;
    });

    // onSubmit est une fonction que je récuoère via mes props depuis le composant parent Users
    return onSubmit(newUser);
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Créer un nouvel utilisateur</h1>
          <input
            type="text"
            maxLength="200"
            required={true}
            placeholder="Nom - Prénom"
            name="name"
          />
          <input
            type="text"
            maxLength="200"
            required={true}
            placeholder="Nom d'utilisateur'"
            name="userName"
          />
          <button onSubmit={handleSubmit}>
            {add ? "Ajouter" : "Modifier"}
          </button>
          <button onClick={() => onClose()}>Fermer</button>
        </form>
      </div>
    </div>
  );
}

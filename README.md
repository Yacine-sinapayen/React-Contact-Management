# Étape

1 -  Récupération et adaptation de l'app OK

2 - Création archi app : assets / api / Components / styles OK

3 - Installation des premiers packages (non exhaustive) uuid react-toastify sass  OK

4 - Création et connexion avec le repo gitHub  OK

5 - Découpage statique des composants ok

4 - GET Je récupère mes users
    4.a créer une state de users
    4.b mettre en place l'appel à l'api
    4.c les afficher dans un console.log
    4.d les aficcher dans le dom

5 - Créer un tableau ok

6 - POST / PUT
 6.a Dans Users.js créer ternaire " form ?"
      - je lui passe les props suivante afin de pouvoir les utiliser dans mon composant userform :
            "user={form}
            onClose={() => setForm(false)}
            onSubmit={(a) => handleSubmit(a)}"
        - btn onClcik setForm
    6.a.1 Création html du formulaire
    6.b L'afficher provisoirement sur app.js
    6.c Créer le state form qui récupère les données du formulaire
    6.f Gestion du form
        - Composant UserForm avec props user onClose onSubmit
            - objet add
            - Fonction handleSubmit
              - preventDefault()
              - newUser = add ? {} : { ...user };
              - if(add) => id
              - map input e.target[k].value
              - return onSubmit(newUser)
            - Création du form onSubmit{handleSubmit}, input, btn handleSubmit et onClose
            - btn onSubmit{handleSubmit} ternaire add ajout ou modif 
            - btn onClose
  
7 - Delete ok

6 - Je créais un header

10 - Gestion des erreurs avec toastify
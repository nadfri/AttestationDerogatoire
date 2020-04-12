window.onload = () =>{
    "use strict";
/*********************************** */
let tabUsers = (JSON.parse(localStorage.getItem('usersList')) != null)? 
JSON.parse(localStorage.getItem('usersList')): [];
console.log(tabUsers);


form.onsubmit= (e) =>
{
    let id = Date.now();
    tabUsers.push({prenom: prenom.value,
            nom: nom.value,
            birthday: birthday.value,
            placeBirth: placeBirth.value,
            adresse: adresse.value,
            codePostal: code.value,
            ville: city.value,
            id: id,
            heure: null,
            motif: null
            });

    localStorage.setItem("usersList", JSON.stringify(tabUsers));
    console.log(tabUsers);

    e.preventDefault();
}







/*********************************** */
};
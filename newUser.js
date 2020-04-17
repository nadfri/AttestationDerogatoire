window.onload = () =>{
    "use strict";
/*********************************** */
let tabUsers = (JSON.parse(localStorage.getItem('usersList')) != null)? 
JSON.parse(localStorage.getItem('usersList')): [];
console.log(tabUsers);
let scroll = true;

codePostal.oninput = () => {
    if(codePostal.value.length == 1 && scroll == true) 
        window.scroll(0,200);
        scroll = false;
}; // scroll afin de voir les propositions de ville caché par le clavier


birthday.onfocus = () =>
{
    birthday.type = "date";
    birthday.value = "1989-01-01";
}


form.onsubmit= (e) =>
{
    let id = Date.now();
    tabUsers.push({prenom: prenom.value,
            nom: nom.value,
            birthday: birthday.value.replace(/(\d{4})-(\d{2})-(\d{2})/,"$3/$2/$1"),
            placeBirth: placeBirth.value,
            adresse: adresse.value,
            codePostal: codePostal.value,
            ville: city.value,
            check: false,
            id: id
            });

    localStorage.setItem("usersList", JSON.stringify(tabUsers));
    console.log(tabUsers);
    document.location = "menu.html";

    e.preventDefault();
}







/*********************************** */
};
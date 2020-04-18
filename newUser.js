window.onload = () =>{
    "use strict";
/*********************************** */
let tabUsers = (JSON.parse(localStorage.getItem('usersList')) != null)? 
JSON.parse(localStorage.getItem('usersList')): [];
console.log(tabUsers);
let scroll = true;



//**********/Désactivation du bouton new Attestation si No Userr***/
if(tabUsers.length == 0) 
{
    bt_newAttest.disabled = true; //desactive le bouton new Attestation
    bt_newAttest.src = "img/attestIcon2.png";  
}
else 
{
    bt_newAttest.disabled = false; //active le bouton
    bt_newAttest.src = "img/attestIcon.png";
}


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
            cpNaiss : cpNaiss.value,
            adresse: adresse.value,
            codePostal: codePostal.value,
            ville: city.value,
            check: false,
            id: id
            });

    localStorage.setItem("usersList", JSON.stringify(tabUsers));
    console.log(tabUsers);
    document.location = "listUsers.html";

    e.preventDefault();
}







/*********************************** */
};
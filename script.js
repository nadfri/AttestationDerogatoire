window.onload = () =>{
    "use strict";
/*********************************** */
let tabUsers = (JSON.parse(localStorage.getItem('usersList')) != null)? 
JSON.parse(localStorage.getItem('usersList')): [];
console.log(tabUsers);





tabUsers.forEach(element => {
    const p = document.createElement("p");
    p.textContent = `${element.prenom} ${element.nom} né(e) le ${element.birthday}
    à ${element.placeBirth}`;

    const img = document.createElement("img");

    img.src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&ecc=M&data="+p.textContent;
    divUsers.appendChild(p);
    divUsers.appendChild(img);
    
});





/*********************************** */
};
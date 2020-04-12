window.onload = () =>{
    "use strict";
/*********************************** */
let tabUsers = (JSON.parse(localStorage.getItem('usersList')) != null)? 
JSON.parse(localStorage.getItem('usersList')): [];
console.log(tabUsers);

addUser.onclick = () => document.location = "newUser.html";


for (let user of tabUsers)
{
    const check = document.createElement("INPUT");
    check.setAttribute("type", "checkbox");
    check.id = user.id;

    const spanID = document.createElement("span");
    spanID.textContent =  `${user.prenom} ${user.nom}`;
    
    const spanDel = document.createElement("span");
    spanDel.textContent = "❌";
    spanDel.title = "'Supprimer cet utilisateur";

    const spanMod = document.createElement("span");
    spanMod.textContent = "✏️";
    spanMod.title = "Modifier cet utilisateur";

    const div = document.createElement("div");
    usersList.appendChild(div);
    div.appendChild(check);
    div.appendChild(spanID);
    div.appendChild(spanMod);
    div.appendChild(spanDel);
}

dateSortie.onfocus = () =>{
    dateSortie.type  = "date";
    let options = {day: "2-digit", month: "2-digit", year:"numeric"};
    dateSortie.min   =  Intl.DateTimeFormat("fr-CA",options).format(Date.now());
    dateSortie.value =  Intl.DateTimeFormat("fr-CA",options).format(Date.now());
//fr-CA same format than date.value YYYY-MM-DD
};

heureSortie.onfocus = () =>{
    heureSortie.type = "time";    
    heureSortie.value =  Intl.DateTimeFormat("fr-FR",{hour: "numeric", minute: "numeric"}).format(Date.now());
};


/* form.onsubmit = (e) =>{
    let list = document.querySelectorAll("input[type=checkbox]:checked");
    let listUserOK =[];
    let date = dateSortie.value.replace(/(\d{4})-(\d{2})-(\d{2})/,"$3/$2/$1");

    for(let check of list)
        for(let user of tabUsers)
            if(check.id = user.id)
            {
                user.check = true;
                user.heure = heureSortie.value;
                user.motif = motif.value;
                if(!listUserOK.includes(user))
                    listUserOK.push(user);
            }
    
    const spanID = document.createElement("span");
    let listNom = "";
    for(let user of listUserOK) listNom += `${user.prenom}, `;

    spanID.textContent = `${listNom} le ${date} à ${heureSortie.value}, motif: ${motif.value}`;
    
    const spanDel = document.createElement("span");
    spanDel.textContent = "❌";
    spanDel.title = "'Supprimer cette attestation";

    const spanMod = document.createElement("span");
    spanMod.textContent = "✏️";
    spanMod.title = "Modifier cette attestation";

    const div = document.createElement("div");
    attestationList.appendChild(div);
    div.appendChild(spanID);
    div.appendChild(spanMod);
    div.appendChild(spanDel);

e.preventDefault();
}; */

form.onsubmit = (e) =>{

    prenomID.textContent = tabUsers[0].prenom;
    nomID.textContent = tabUsers[0].nom;
    birthdayID.textContent = tabUsers[0].birthday;
    placeBirthID.textContent = tabUsers[0].placeBirth;
    adresseID.textContent = tabUsers[0].adresse;
    cityID.textContent = tabUsers[0].ville;
    jourID.textContent = dateSortie.value;
    heureID.textContent = heureSortie.value;

    output.style.display = "block";

    e.preventDefault();
};









/*********************************** */
};
window.onload = () =>{
    "use strict";
/*********************************** */
let tabUsers = (JSON.parse(localStorage.getItem('usersList')) != null)? 
JSON.parse(localStorage.getItem('usersList')): [];

let listAttest_Storage = (JSON.parse(localStorage.getItem('listAttest_Storage')) != null)? 
JSON.parse(localStorage.getItem('listAttest_Storage')): [];
console.log(listAttest_Storage);



//**********/Désactivation du bouton new Attestation si No User et de la div_NoUser***/
if(tabUsers.length == 0) 
{
    bt_newAttest.disabled = true; //desactive le bouton new Attestation
    bt_newAttest.src = "img/attestIcon2.png";
    div_NoUser.style.display = "block"; //affiche la div_NoUser   
}
else 
{
    bt_newAttest.disabled = false; //active le bouton
    bt_newAttest.src = "img/attestIcon.png";
    div_NoUser.style.display = "none"; //masque la div div_NoUser
}

if(listAttest_Storage.length == 0 && tabUsers.length != 0)
    div_NoAttest.style.display = "block"; //affiche la div div_NoAttest
else
    div_NoAttest.style.display = "none"; //masque la div div_NoAttest


//**************************Liste Attestations************************************************ */

listAttest_Storage.sort(compare);
console.log(listAttest_Storage);


function compare(a,b)
{
    if(a[0][0].dateCreation < b[0].dateCreation)  return 1;
    if(b[0][0].dateCreation < a[0].dateCreation)  return -1;
    if(a[0][0].dateCreation == b[0].dateCreation) return 0;
}

for (let usersForAttest of listAttest_Storage)
        affichage_ListAttest(usersForAttest);//affichage de la liste enregistrée



function affichage_ListAttest(tab)
{
    let list_Users = "";

    for(let user of tab) list_Users += `${user.prenom}, `;

    const imgBin = document.createElement("img");//ajout de l'icone poubelle
    imgBin.src = "img/bin.png";
    imgBin.setAttribute("ref",tab[0].heureCreation); //ajout d'un attribut d'identification

    const div = document.createElement("div");
    div.className = "divLine";

    div.innerHTML = list_Users
                +`<br><i>le ${tab[0].dateSortie} à ${tab[0].heureSortie}, 
                    Motif: ${tab[0].motif}</i>`;
    //tab[0] ou tab[x], qu'importe, tous les users ont la meme date et heure de sortie
    
    field_Attest.appendChild(div);
    div.appendChild(imgBin);



    //****************Bouton supprimer Utilisateur********************************** */
    imgBin.onclick = (e) =>
    {
        listAttest_Storage = listAttest_Storage.filter(usersForAttest => usersForAttest[0].heureCreation != e.target.getAttribute("ref"));
        //filtre le tableau en retirant l'user ayant l'id correspondante à la ref de imgBin
        localStorage.setItem("listAttest_Storage", JSON.stringify(listAttest_Storage));
        document.location.reload();

    };
 
}

















/*********************************** */
};


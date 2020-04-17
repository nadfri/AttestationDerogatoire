window.onload = () =>{
    "use strict";
/*********************************** */
let tabUsers = (JSON.parse(localStorage.getItem('usersList')) != null)? 
JSON.parse(localStorage.getItem('usersList')): [];

let listAttest_Storage = (JSON.parse(localStorage.getItem('listAttest_Storage')) != null)? 
JSON.parse(localStorage.getItem('listAttest_Storage')): [];
let switch_position = false;


//***************Bouton Switch User/Attestation *****************/
bt_switch.onclick = () =>{
    if(switch_position == false)
    {  
        field_Attest.style.display = "none"; //masque fieldSet Attestation
        field_User.style.display = "block"; //affiche fieldSet User
        bt_switch.src ="img/list.png";     //modifie l'icone
        switch_position = true;
    }
    else
    {
        field_Attest.style.display = "block";
        field_User.style.display = "none";
        bt_switch.src ="img/contact.png";
        switch_position = false;
    }
};

//**********/Désactivation du bouton new Attestation si No User et de la div_NoUser***/
if(tabUsers.length == 0) 
{
    bt_newAttest.disabled = true; //desactive le bouton new Attestation
    bt_newAttest.src = "img/attestIcon2.png";

    for(let div of document.getElementsByClassName("div_NoUser"))
        div.style.display = "block"; //affiche les divs ayant la class div_NoUser   
}
else 
{
    bt_newAttest.disabled = false;
    bt_newAttest.src = "img/attestIcon.png";

    for(let div of document.getElementsByClassName("div_NoUser"))
        div.style.display = "none"; //masque les divs ayant la class div_NoUser

}

//****************** */

















/*********************************** */
};


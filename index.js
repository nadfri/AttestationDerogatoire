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
        field_Attest.style.display = "none";
        field_User.style.display = "block";
        switch_position = true;
        bt_switch.src ="img/list.png";
    }
    else
    {
        field_Attest.style.display = "block";
        field_User.style.display = "none";
        switch_position = false;
        bt_switch.src ="img/contact.png";

    }
};

//**********/Désactivation du bouton new Attestation si No User***/
if(tabUsers.length == 0) 
{
    bt_newAttest.disabled = true;
    bt_newAttest.src = "img/attestIcon2.png";
}
else 
{
    bt_newAttest.display = false;
    bt_newAttest.src = "img/attestIcon.png";
}

//****************** */

















/*********************************** */
};


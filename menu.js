window.onload = () =>{
    "use strict";
/*********************************** */
let tabUsers = (JSON.parse(localStorage.getItem('usersList')) != null)? 
JSON.parse(localStorage.getItem('usersList')): [];

let listAttest_Storage = (JSON.parse(localStorage.getItem('listAttest_Storage')) != null)? 
JSON.parse(localStorage.getItem('listAttest_Storage')): [];

bt_newUser.onclick = () => document.location = "newUser.html";
bt_newUser2.onclick = () => document.location = "newUser.html";

let prenomID;
let nomID;
let birthdayID;
let placeBirthID;
let adresseID;
let cityID;
let dateSortieID;
let heureSortieID;

let optionDate  = {day: "2-digit",   month: "2-digit", year:"numeric"};
let optionHeure = {hour: "numeric", minute: "numeric"};

let listCaseIMG = [];
listCaseIMG["travail"]    = "img/case.png";
listCaseIMG["courses"]    = "img/case.png";
listCaseIMG["santé"]      = "img/case.png";
listCaseIMG["famille"]    = "img/case.png";
listCaseIMG["sport"]      = "img/case.png";
listCaseIMG["judiciaire"] = "img/case.png";
listCaseIMG["missions"]   = "img/case.png";
let checkVerif = 0; // verifier si un user est coché


if(listAttest_Storage == 0 && tabUsers.length !=0) 
    newAttest(); //si pas de liste Attestation affiche le formulaire

else
    for (let usersForAttest of listAttest_Storage)
        affichage_ListAttest(usersForAttest);//affichage de la liste enregistrée


//**************************Liste UTILISATEURS************************************************ */
if(tabUsers.length == 0)
    divNewUser2.style.display= "block";

else
{
    for (let user of tabUsers)
    {
        let count = 0; //compter de boucle pour identifier utilisateur

        const check = document.createElement("INPUT");
        check.setAttribute("type", "checkbox");
        check.id = user.id; //2 IDs identique ERREUR


        const spanLabel = document.createElement("span");
        spanLabel.innerHTML =  `<label for=${check.id}>${user.prenom} ${user.nom}</label>`;
        
        const spanDel = document.createElement("span");
        spanDel.innerHTML = '<img src="img/bin.png" class="bin" title="Supprimer cet utilisateur">';

        const div = document.createElement("div");
        usersList.appendChild(div);
        div.appendChild(check);
        div.appendChild(spanLabel);
        div.appendChild(spanDel);

        check.onchange = () => {
            user.check = check.checked;
            if(user.check == true) checkVerif++;
            else checkVerif--;
        
            if(checkVerif > 0) divInfo.style.display = "none"; //desactive infoDiv
        };
        //****************Bouton supprimer Utilisateur********************************** */
        spanDel.onclick = () =>{
            tabUsers.splice(count,1);
            console.log(tabUsers);
            localStorage.setItem("usersList", JSON.stringify(tabUsers));
            document.location.reload();
        };

        count++;
    }
}

//**************************Onglet Nouvelle Attestation************************************** */
bt_NewAttest.onclick = () => newAttest();
    

function newAttest()
{
    div_Attestation.style.display = "none";
    fieldNew_Attest.style.display = "block";

    dateSortie.value =  Intl.DateTimeFormat("fr-CA",optionDate).format(Date.now());
    //fr-CA same format than date.value YYYY-MM-DD
    heureSortie.value =  Intl.DateTimeFormat("fr-FR",optionHeure).format(Date.now());
    heureSortie.focus();
}

//*******************************Nouvelle Attestation**************************************** */
form.onsubmit = (e) =>{

    if (checkVerif == 0)
    {
        divInfo.style.display = "block";
        divInfo.textContent = "Selectionner un ou plusiuers utilisateurs";
        divInfo.style.backgroundColor = "pink";
    }

    else
    {
        dateSortie.focus();
    //***************************Sauvegarde*************************************** */
        let dateCreation  = Intl.DateTimeFormat("fr-FR",optionDate).format(Date.now());  
        let heureCreation = Intl.DateTimeFormat("fr-FR",{optionHeure}).format(Date.now());
        let dateSortie_FR = dateSortie.value.replace(/(\d{4})-(\d{2})-(\d{2})/,"$3/$2/$1");// jj/mm/aaaa
        let usersForAttest = tabUsers.filter(user=> user.check == true);

        for(let user of usersForAttest)
        {
            user.dateCreation  = dateCreation;
            user.heureCreation = heureCreation;
            user.dateSortie    = dateSortie_FR;
            user.heureSortie   = heureSortie.value;
            user.motif         = motif.value; 
        }

        listAttest_Storage.push(usersForAttest);  //ajout des compos dans le storage
        localStorage.setItem("listAttest_Storage", JSON.stringify(listAttest_Storage));


        document.location.reload(); //mise à jour de la liste
    }

    e.preventDefault();
};

//**********************Affichage de la liste des Attestations******************* */
function affichage_ListAttest(tab)
{
        let list_Users = "";
        let icones =`<img class="option" src ="img/doc.png"    title="Afficher l'attestation">
                    <img class="option" src ="img/qrcode.png" title="Afficher le QRCODE">`;

    
        for(let user of tab) list_Users += `${user.prenom}, `;

        const div = document.createElement("div");
        div.className = "list_Attest";

        div.innerHTML = list_Users
                    + icones 
                    +`<br><i>le ${tab[0].dateSortie} à ${tab[0].heureSortie}, 
                        Motif: ${tab[0].motif}</i>`;
        //tab[0] ou tab[x], qu'importe, tous les users ont la meme date et heure de sortie
        
        div_Attestation.appendChild(div);
        div_Attestation.style.display = "block";
        fieldNew_Attest.style.display = "none"; 
}



//************************Affichage des Attestions Ecrites/QRCODE********************* */
function affichage_Attestation(tab)
{
    for(let user of tab)
    {
 
        prenomID      = user.prenom;
        nomID         = user.nom;
        birthdayID    = user.birthday.replace(/(\d{4})-(\d{2})-(\d{2})/,"$3/$2/$1");
        placeBirthID  = user.placeBirth;
        adresseID     = user.adresse;
        cityID        = user.ville;
        dateSortieID  = dateSortie.value.replace(/(\d{4})-(\d{2})-(\d{2})/,"$3/$2/$1");
        heureSortieID = heureSortie.value;
        listCaseIMG[motif.value] = "img/caseValid.png";

        //*****************QRCODE******************* */
        /*const p = document.createElement("p");
        p.textContent = `${element.prenom} ${element.nom} né(e) le ${element.birthday}
        à ${element.placeBirth}`;
    
        const img = document.createElement("img");
    
        img.src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&ecc=M&data="+p.textContent;
        divUsers.appendChild(p);
        divUsers.appendChild(img);

        let objet_QrCode = {
            creation: Date.now(),

        }; */


        //*********************Version Ecrite******************** */

        const fieldset = document.createElement("fieldset");
        let legend = document.createElement("legend");
        legend.textContent = user.prenom;
        output.appendChild(fieldset);
        fieldset.innerHTML = `
        <h1>ATTESTATION DE DÉPLACEMENT DÉROGATOIRE</h1>
        <h2>
            En application de l’article 3 du décret du 23 mars 2020
            prescrivant les mesures générales nécessaires pour faire face à
            l’épidémie de Covid19 dans le cadre de l’état d’urgence
            sanitaire
        </h2>


        <p>Je soussigné(e), Mme/M. : <span class="colorSpan">${prenomID} ${nomID}</span></p>
        <p>Né(e) le :<span class="colorSpan">${birthdayID}</span></p>
        <p>À :<span class="colorSpan">${placeBirthID}</span></p>
        <p>Demeurant:<span class="colorSpan">${adresseID}</span></p>

        <p>
            certifie que mon déplacement est lié au motif suivant (cocher la
            case) autorisé par l’article 3 du décret du 23 mars 2020
            prescrivant les mesures générales nécessaires pour faire face à
            l’épidémie de Covid19 dans le cadre de l’état d’urgence
            sanitaire<sup>1</sup>:</p>

        <p  class="case">
        <img src = ${listCaseIMG["travail"]} ALIGN=LEFT>

            Déplacements entre le domicile et le lieu d’exercice de l’activité
            professionnelle, lorsqu’ils sont indispensables à l’exercice
            d’activités ne pouvant être organisées sous forme de télétravail
            ou déplacements professionnels ne pouvant être différés<sup>2</sup>.</p>

        <p  class="case">
        <img src = ${listCaseIMG["courses"]} ALIGN=LEFT>
            Déplacements pour effectuer des achats de fournitures nécessaires à l’activité
            professionnelle et des achats de première nécessité<sup>3</sup>dans des établissements dont les activités
            demeurent autorisées (liste sur gouvernement.fr).</p>

        <p  class="case">
        <img src = ${listCaseIMG["santé"]} ALIGN=LEFT>
            Consultations et soins ne pouvant être assurés à distance et ne pouvant être
            différés; consultations et soins des patients atteints d'une
            affection de longue durée.</p>

        <p  class="case">
        <img src = ${listCaseIMG["famille"]} ALIGN=LEFT>
            Déplacements
            pour motif familial impérieux, pour l’assistance aux personnes
            vulnérables ou la garde d’enfants.</p>
        <br>
        <p class="case">
        <img src = ${listCaseIMG["sport"]} ALIGN=LEFT>
            Déplacements brefs, dans la limite d'une heure quotidienne et dans un rayon
            maximal d'un kilomètre autour du domicile, liés soit à l'activité
            physique individuelle des personnes, à l'exclusion de toute pratique
            sportive collective et de toute proximité avec d'autres personnes,
            soit à la promenade avec les seules personnes regroupées dans un
            même domicile, soit aux besoins des animaux de compagnie.</p>

        <p class="case">
        <img src = ${listCaseIMG["judiciaire"]} ALIGN=LEFT>
            Convocation judiciaire ou administrative.</p>
        <br>
        <p class="case">
            <img src = ${listCaseIMG["missions"]} ALIGN=LEFT>
            Participation à des missions d’intérêt général sur demande de l’autorité
            administrative.</p>

        <p>Fait à :<span class="colorSpan">${cityID}</span></p>
        <p>Le : <span class="colorSpan">${dateSortieID}</span> à <span class="colorSpan">${heureSortieID}</span></p>
        <p>(Date et heure de début de sortie)</p>

        <p class="annotation">
            <sup>1</Sup>Les personnes souhaitant bénéficier de l'une de ces exceptions doivent se munir s’il y a lieu, lors de leurs déplacements hors de leur domicile, d'un document leur permettant de justifier que le déplacement considéré entre dans le champ de l'une de ces exceptions.
        <br>
            <sup>2</Sup>A utiliser par les travailleurs non-salariés, lorsqu’ils ne peuvent disposer d’un justificatif de déplacement établi par leur employeur.
        <br>
        <sup>3</Sup>Y compris les acquisitions à titre gratuit (distribution de denrées alimentaires…) et les déplacements liés à la perception de prestations sociales et au retrait d’espèces.</p>
        `;

        fieldset.appendChild(legend);
        
    }

}







/*********************************** */
};


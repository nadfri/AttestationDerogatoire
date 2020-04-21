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
for(let attestation of listAttest_Storage)
{
    const divLine = document.createElement("div");
    divLine.className = "divLine"; //conteneur

//*** */
    const divEye = document.createElement("div");
    divEye.className = "divImg";
    const imgEye = document.createElement("img");
    imgEye.src = "img/oeil.png";
    divEye.appendChild(imgEye);

//*** */
    const divInfo = document.createElement("div");
    divInfo.className = "divInfo";

    let listPrenoms = "";
    for(let user of attestation.listNom)
        listPrenoms +=  `${user.prenom}, `;

    const spanListPrenom = document.createElement("span");
    spanListPrenom.textContent = listPrenoms;

    const spanDate = document.createElement("span");
    spanDate.className = "spanDate";
    spanDate.textContent = `Pour le ${attestation.dateSortie} à ${attestation.heureSortie}`;

    const spanMotif = document.createElement("span");
    spanMotif.className = "spanMotif";
    spanMotif.textContent = `Motif: ${attestation.motif}`;

    divInfo.appendChild(spanListPrenom);
    divInfo.appendChild(spanDate);
    divInfo.appendChild(spanMotif);

 //**** */
    const divBin = document.createElement("div");
    divBin.className = "divImg divBin";
    const imgBin = document.createElement("img");
    imgBin.src = "img/bin.png";
    imgBin.setAttribute("ref",attestation.id); //ajout d'un attribut d'identification
    divBin.appendChild(imgBin);

    field_Attest.appendChild(divLine);
    divLine.appendChild(divEye);
    divLine.appendChild(divInfo);
    divLine.appendChild(divBin);

    
    //****************Bouton supprimer Utilisateur********************************** */
    imgBin.onclick = (e) =>
    {
        field_Attest.style.pointerEvents = "none"; //desactive le clic sur le fieldset Attest
        divPopUp.style.display = "block"; //affiche le pop up de confirmation

        bt_non.onclick = () => {
        divPopUp.style.display = "none";
        field_Attest.style.pointerEvents = "auto";
        };

        bt_oui.onclick = () => {
            listAttest_Storage = listAttest_Storage.filter(attestation => 
                attestation.id != e.target.getAttribute("ref"));
            //filtre le tableau en retirant l'attestation ayant l'id correspondante à la ref de imgBin
            localStorage.setItem("listAttest_Storage", JSON.stringify(listAttest_Storage));
            document.location.reload();
        };
    };

    //****************Bouton Voir Attestation **************************************/
    divLine.onclick = (e) => {
        if(!Object.is(e.target, imgBin)) //ne tient pas compte du click sur ImgBin
            affichage_Attestation(attestation);
    }
} 


//*********************Masquer la barre de Menu à lors du scroll */
document.onscroll = () =>{
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50)
        divIcon.style.display="none";
    else
        divIcon.style.display="flex";
}

//************************Affichage des Attestions Ecrites/QRCODE********************* */
function affichage_Attestation(tab)
{
    output.innerHTML = ""; //vide la div d'affichage

    for(let user of tab.listNom)
    {
       let prenomID      = user.prenom;
       let nomID         = user.nom;
       let birthdayID    = user.birthday;
       let placeBirthID  = user.placeBirth;
       let adresseID     = `${user.adresse} ${user.codePostal} ${user.ville}`;
       let cityID        = user.ville;

       let dateSortieID    = tab.dateSortie;
       let heureSortieID   = tab.heureSortie;

       let listCaseIMG           = [];
       listCaseIMG["travail"]    = "img/case.png";
       listCaseIMG["courses"]    = "img/case.png";
       listCaseIMG["santé"]      = "img/case.png";
       listCaseIMG["famille"]    = "img/case.png";
       listCaseIMG["sport"]      = "img/case.png";
       listCaseIMG["judiciaire"] = "img/case.png";
       listCaseIMG["missions"]   = "img/case.png";

       listCaseIMG[tab.motif] = "img/caseValid.png";

    //*****************QRCODE******************* */
        const imgQR = document.createElement("img");
        let info = `Cree le: ${tab.dateCreation} a ${tab.heureCreation};
                    Nom: ${user.nom};
                    Prenom: ${user.prenom};
                    Naissance:${user.birthday} a ${user.placeBirth};
                    Adresse: ${adresseID};
                    Sortie: ${tab.dateSortie} a ${tab.heureSortie};
                    Motifs: ${tab.motif}`;
    
        imgQR.src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&ecc=M&data="+info;
        //APi en ligne pour generer le QRCODE
        
        const pInfo = document.createElement("p");
        pInfo.textContent = `Date de création: ${tab.dateCreation} à ${tab.heureCreation}`;

    
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
        `;

        fieldset.appendChild(legend);
        fieldset.appendChild(imgQR);
        fieldset.appendChild(pInfo);
        
    }

}

/*********************************** */
};


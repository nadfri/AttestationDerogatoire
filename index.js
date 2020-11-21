"use strict";
/*********************************** */
let tabUsers = (JSON.parse(localStorage.getItem('usersList')) != null)? 
JSON.parse(localStorage.getItem('usersList')): [];

let listAttest_Storage = (JSON.parse(localStorage.getItem('listAttest_Storage')) != null)? 
JSON.parse(localStorage.getItem('listAttest_Storage')): [];
//console.log(listAttest_Storage);


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
    imgEye.classList.add("eye");
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
    divLine.onclick = (e) => 
    {
        if(!Object.is(e.target, imgBin) && imgEye.getAttribute("src") == "img/oeil.png") //ne tient pas compte du click sur ImgBin
        {
            //On remet tous les yeux à ouvert
            const imgEyes = document.querySelectorAll(".eye"); 
            for (let img of imgEyes) img.src = "img/oeil.png";

            affichage_Attestation(attestation);
            document.querySelector("h1").scrollIntoView({behavior: "smooth"}); //scroll vers le h1 de l'attestation
            imgEye.src = "img/oeil_close.png";
        }

        else
        {
            output.innerHTML = ""; //vide la div
            imgEye.src = "img/oeil.png";
        }
    };
} 


//*********************Masquer la barre de Menu lors du scroll */
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

       let listCaseIMG              = [];
       listCaseIMG["travail"]       = "img/case.png";
       listCaseIMG["achats"]        = "img/case.png";
       listCaseIMG["santé"]         = "img/case.png";
       listCaseIMG["famille"]       = "img/case.png";
       listCaseIMG["handicap"]      = "img/case.png";
       listCaseIMG["sport_animaux"] = "img/case.png";
       listCaseIMG["convocation"]   = "img/case.png";
       listCaseIMG["missions"]      = "img/case.png";
       listCaseIMG["enfants"]       = "img/case.png";

       listCaseIMG[tab.motif] = "img/caseValid.png";

    //*****************QRCODE******************* */
        const imgQR = document.createElement("img");
        let info = `Créé le:${tab.dateCreation} à ${tab.heureCreation}%3B
                    Nom:${user.nom}%3B
                    Prenom:${user.prenom}%3B
                    Naissance:${user.birthday} à ${user.placeBirth}%3B
                    Adresse:${adresseID}%3B
                    Sortie:${tab.dateSortie} à ${tab.heureSortie}%3B
                    Motifs:${tab.motif}%3B
                    `;
    
        //APi en ligne pour generer le QRCODE
        imgQR.src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&ecc=M&data="+info;
        //imgQR.alt = "QR Code en attente de connexion...";

        const figure = document.createElement("figure");
        const figcaption = document.createElement("figcaption");
        figcaption.textContent = `Date de création: ${tab.dateCreation} à ${tab.heureCreation}`;

        imgQR.onclick = () => imgQR.classList.toggle("scale"); //zoom sur le QRCode

    
        //*********************Version Ecrite******************** */
        const fieldset = document.createElement("fieldset");
        let legend = document.createElement("legend");
        legend.textContent = user.prenom;
        output.appendChild(fieldset);
        fieldset.innerHTML = `
        <h1>ATTESTATION DE DÉPLACEMENT DÉROGATOIRE</h1>
        <h2>
        En application du décret n°2020-1310 du 29 octobre 2020 prescrivant les mesures générales nécessaires pour faire face à l'épidémie de Covid19 dans le cadre de l'état d'urgence sanitaire
        </h2>

        <p>Je soussigné(e), Mme/M. : <span class="colorSpan">${nomID} ${prenomID}</span></p>
        <p>Né(e) le :<span class="colorSpan">${birthdayID}</span></p>
        <p>À :<span class="colorSpan">${placeBirthID}</span></p>
        <p>Demeurant:<span class="colorSpan">${adresseID}</span></p>

        <p>Certifie que mon déplacement est lié au motif suivant (cocher la case) autorisé par le décret n°2020-1310 du 29 octobre 2020 prescrivant les mesures générales nécessaires pour faire face à l'épidémie de Covid19 dans le cadre de l'état d'urgence sanitaire<sup>1</sup>:</p>

        <p  class="case"><img src = ${listCaseIMG["travail"]}>
        Déplacements entre le domicile et le lieu d’exercice de l’activité professionnelle ou un établissement d’enseignement ou de formation, déplacements professionnels ne pouvant être différés, déplacements pour un concours ou un examen.</p>

        <p  class="case">
        <img src = ${listCaseIMG["achats"]}>
        Déplacements pour effectuer des achats de fournitures nécessaires à l'activité professionnelle, des achats de première nécessité dans des établissements dont les activités demeurent autorisées, le retrait de commande et les livraisons à domicile. 
        </p>

        <p  class="case">
        <img src = ${listCaseIMG["santé"]}>
        Consultations, examens et soins ne pouvant être assurés à distance et l’achat de médicaments.
        </p>

        <p class="case">
        <img src = ${listCaseIMG["famille"]}>
        Déplacements pour motif familial impérieux, pour l'assistance aux personnes vulnérables et précaires ou la garde d'enfants.
        </p>

        <p class="case">
        <img src = ${listCaseIMG["handicap"]}>
        Déplacement des personnes en situation de handicap et leur accompagnant.
        </p>

        <p class="case">
        <img src = ${listCaseIMG["sport_animaux"]}>
        Déplacements brefs, dans la limite d'une heure quotidienne et dans un rayon maximal d'un kilomètre autour du domicile, liés soit à l'activité physique individuelle des personnes, à l'exclusion de toute pratique sportive collective et de toute proximité avec d'autres personnes, soit à la promenade avec les seules personnes regroupées dans un même domicile, soit aux besoins des animaux de compagnie.</p>

        <p class="case">
        <img src = ${listCaseIMG["convocation"]}>
        Convocation judiciaire ou administrative et pour se rendre dans un service public.
        </p>

        <p class="case">
        <img src = ${listCaseIMG["missions"]}>
        Participation à des missions d'intérêt général sur demande de l'autorité administrative.
        </p>

        <p class="case">
        <img src = ${listCaseIMG["enfants"]}>
        Déplacement pour chercher les enfants à l’école et à l’occasion de leurs activités périscolaires.
        </p>

        <p>Fait à :<span class="colorSpan">${cityID}</span></p>
        <p>Le : <span class="colorSpan">${dateSortieID}</span> à <span class="colorSpan">${heureSortieID}</span></p>
        `;

        fieldset.appendChild(legend);
        fieldset.appendChild(figure)
        figure.appendChild(imgQR);
        figure.appendChild(figcaption);
    }
}

/**Bouton Installation Application*/
window.onbeforeinstallprompt = (event) => 
{
    event.preventDefault(); // annuler la banniere par defaut
    installBtn.classList.add("slide"); //affiche la banniere perso
    setTimeout(()=>installBtn.classList.remove("slide"),8000);
    setTimeout(()=>installBtn.style.display = "none",9000);

    installBtn.onclick = () => 
    {
        installBtn.classList.remove("slide"); //faire disparaitre le bouton
        setTimeout(()=>installBtn.style.display = "none",500);
        event.prompt(); //permettre l'installation
    };
};

//*************Service Worker ******************/
//Register service worker to control making site work offline
if ('serviceWorker' in navigator) 
{
    window.addEventListener('load', () => 
    {
      navigator.serviceWorker
        .register('sw.js')
        .then(registration => {
          console.log(
            `Service Worker enregistré ! Ressource: ${registration.scope}`
          );
        })
        .catch(err => {
          console.log(
            `Echec de l'enregistrement du Service Worker: ${err}`
          );
        });
    });
}


/************Permettre le 100vh sur mobile */
let vh = window.innerHeight * 0.01;
const hauteur = window.innerHeight;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

const metas = document.getElementsByTagName('meta');
metas[1].content = 'width=device-width, height=' + window.innerHeight + ' initial-scale=1.0, maximum-scale=5.0,user-scalable=0';




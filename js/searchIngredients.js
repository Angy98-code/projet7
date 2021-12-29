// **** 1°) la partie modal ouverte de la liste de tous les ingrédients

//----------principal function
// placeIngredients insère dans le DOM le HTML pour la recherche par ingrédients
// - récupère la liste de tous les ingrédients dédoublonnés
// - génére le code html de la liste des li li...
// - insère le html généré dans parentNode
// - insère la recherche par ingrédient//
// - point d'entrée (appelée dans main.js)
//A0-A2

function placeIngredients() {
  //debugger;
  // liste des ingrédients dans le panneau de recherche
  const remainingIngredients = getRemainingIngredients();
  drawIngredients(remainingIngredients);
  // liste des tags ingredients selectionnés
  addIngredientsClickListener();
  fermetureModalParChevronUp();
  handleIngredientsSearch();
}
// todo :
// 1- déclarer une fonction drawIngredients avec un paramètre ingredients (array de strings)
// 2- migrer ligne 20 à 25 dans la fonction drawIngredients
// 3- dans placeIngredients() appeler drawIngredients() avec pour paramètre allIngredients
// 4- vérifier que la liste des ingrédients s'affiche comme avant
//
// début bout utilisé partie 5
// affichage des ingrédient soit au départ soit après le tri (3lettres)
function drawIngredients(ingredients) {
  // paramètre array de string
  const parentNode = document.querySelector(".ingredientslist");
  let listeHtml = "";
  ingredients.forEach((ingredient) => {
    listeHtml += `<li class="baliseLiDansIngredients">${ingredient}</li>`;
  });
  parentNode.innerHTML = listeHtml;
}

// fin bout utilisé partie 5
//----------function traitement données

//***** 2ème partie injection dans le dom du choix des ingrédients séléctionnés après chaque click

//TODO
// 1) créer une variable globale de tous les ingrédients sélectionnés (array de strings) selectedIngredients /ex
//ok ligne 2
// 2) créer 1 fonction qui ajoute un ingrédient à la sélection selectIngredient
// 3) appeler la fonction  selectIngredient sur click d'un ingrédient de la liste
// 4) créer 1 fonction qui génére le code Html des tags d'ingrédients à partir d'selectedIngredients (ingredientsTagsHtml)
// 5) sur click sur 1 ingrédient, appeler selectIngredient puis utiliser ingredientsTagsHtml pour afficher les tags dans le Dom (inline donc je vais utiliser les span)

//------ selectIngredient() ajoute un ingrédient à l'array des ingrédients selectionnés
// au click sur un ingrédient, cet ingrédient est ajouté à l'array
//B1
function selectIngredient(ingredient) {
  //debugger;
  console.log("selectedIngredients avant push : ", selectedIngredients);
  selectedIngredients.push(ingredient);

  console.log("selectedIngredients après push : ", selectedIngredients);
  // openIngredientsModal();
}

//----- addIngredientsClickListener() fonction qui ajoute un ingrédient à la sélection selectIngredient
//A3 // B0 au click du addenentlistener la methode selectIngredient ()(push) est appelée puis
//drawSelectedIngredientsTags();
function addIngredientsClickListener() {
  ///////debugger;
  const ulIngredients = document.querySelector(".ingredientslist");

  ulIngredients.addEventListener("click", (e) => {
    if (e.target.nodeName !== "LI") {
      return;
    }
    const recuperationIngredient = e.target.textContent;
    console.log(
      "recuperationIngredient avant appel fonction selectIngredient : ",
      recuperationIngredient
    );
    selectIngredient(recuperationIngredient);
    drawSelectedIngredientsTags();
    closeIngredientsModal();
    //debugger;
    // filter recipes by ingredients
    placeCards(selectedRecipes());
    console.log(
      "recuperationIngredient après appel selectIngredient : ",
      recuperationIngredient
    );
  });
}

//----- 4) créer 1 fonction qui génére le code Html des tags d'ingrédients à partir d'selectedIngredients (ingredientsTagsHtml)
// 5) sur click sur 1 ingrédient, appeler selectIngredient puis utiliser drawSelectedIngredientsTags pour afficher les tags dans le Dom (inline donc je vais utiliser les span)

// function drawSelectedIngredientsTags() {
//   let tagIngredientHtml = "";
//   const parentNode = document.querySelector(".placeringredientschoisis");
//   selectedIngredients.forEach((ingredient) => {
//     tagIngredientHtml += `<div class="tagsingredientrow">
//                             <span class="navbarresultchoosesingredients">
//                             ${ingredient}
//                             <i class="far fa-times-circle" id="boutonfermeturetag"></i>
//                             </span>
//                           </div>`;
//   });
//   parentNode.innerHTML = tagIngredientHtml;
//   const spans = parentNode.querySelectorAll("span");
//   spans.forEach((span) => {
//     span.addEventListener("click", removeIngredientsClickListener);
//   });
// }
//B2 // C1
function drawSelectedIngredientsTags() {
  let tagIngredientHtml = "";
  const parentNode = document.querySelector(".placeringredientschoisis");
  selectedIngredients.forEach((ingredient) => {
    tagIngredientHtml += `<div class="tagsingredientrow">
                            <span class="navbarresultchoosesingredients">
                            ${ingredient}
                            <i class="far fa-times-circle" id="boutonfermeturetag"></i>
                            </span>
                          </div>`;
  });
  parentNode.innerHTML = tagIngredientHtml;
  // add click handler in i tag
  //pas exécuté dans B
  //debugger;
  //handleIngredientsSearch();
  const iTags = parentNode.querySelectorAll("i");
  iTags.forEach((iTag) => {
    iTag.addEventListener("click", removeIngredientsClickListener);
  });
}

//**** 3ème partie remove tags
// todo : case fermeture tag pas display none
// 1 : ajouter 1 eventListener click sur chaque tag  ou croix //valeur cliqué diff maniere de recuperer
// 2 : dans la cb du click supprimer remove() l'ingredient clique arraySelect.... //
// 3 : dans la cb appeler la fonction drawSelectedIngredientsTags

// const removeIngredientsClickListener = (e) => {
//   console.log("removeIngredientsClickListener", this, e);

//   const recuperationTagASupprimer = e.target.textContent;
//   selectedIngredients.remove(recuperationTagASupprimer);
//   drawSelectedIngredientsTags();
// };

//c0
const removeIngredientsClickListener = (e) => {
  // get clicked ingredient name
  //debugger;
  let ingredient = e.target.parentNode.textContent.trim();
  let idx = selectedIngredients.indexOf(ingredient);
  if (idx >= 0) {
    selectedIngredients.splice(idx, 1);
  }
  drawSelectedIngredientsTags();

  const remainingIngredients = getRemainingIngredients();
  drawIngredients(remainingIngredients);

  // filter recipes by ingredients
  placeCards(selectedRecipes());
};

//***** 4ème partie fermeture ouverture de la liste des ingrédients
// closeIngredientsModal() appelé dans addIngredientsClickListener()
// html ligne 85 : onclick="openIngredientsModal(event)" sur button des ingrédients

function closeIngredientsModal() {
  const modalIngredient = document.querySelector(".ingredientsopen");
  // const buttonIngredient = document.querySelector(".chooseingredients");
  const buttonIngredient = document.querySelector(".ingredientsclose");
  modalIngredient.style.display = "none";
  buttonIngredient.style.display = "block";
}

function openIngredientsModal() {
  const modalIngredient = document.querySelector(".ingredientsopen");
  // const buttonIngredient = document.querySelector(".chooseingredients");
  const buttonIngredient = document.querySelector(".ingredientsclose");
  modalIngredient.style.display = "block";
  buttonIngredient.style.display = "none";
  const ingredientsInputSearchInModal =
    document.querySelector(".inputingredients");
  // debugger;
  ingredientsInputSearchInModal.value = "";
  // draw not selected ingredients list
  const remainingIngredients = getRemainingIngredients();
  drawIngredients(remainingIngredients);
}

//***** 5ème partie input dans la modal ingrédients qui affiche un choix d'ingrédients après 3 lettres

// récupérer la valeur de l'input
//input recherche dans la modal(ne cherche les infos seulement parmi les ingrédients)
function handleIngredientsSearch() {
  const ingredientsInputSearchInModal =
    document.querySelector(".inputingredients");
  ingredientsInputSearchInModal.addEventListener("input", (e) => {
    //debugger;
    e.preventDefault();
    const inputIngredients = e.target.value;
    let filteredIngredients = getIngredients(selectedRecipes());
    // const searchInputIngredients = inputIngredients.toLowerCase();
    // console.log(searchInputIngredients);

    if (inputIngredients.length >= 1) {
      // todo :
      // 1- créer une variable filteredIngredients

      // 2- utiliser filter() sur allIngredients pour garder les ingrédients contenant la string inputIngredients (recup...)
      // console.log(allIngredients)
      filteredIngredients = filteredIngredients.filter((ingredient) => {
        return ingredient
          .toLowerCase()
          .includes(inputIngredients.toLowerCase());
        // const ingredientLowerCase = ingredient.toLowerCase();
        // const inputIngredientsLowerCase = inputIngredients.toLowerCase();
        // return ingredientLowerCase.includes(inputIngredientsLowerCase);
      });
      console.log(filteredIngredients);
      // 3- passer filteredIngredients en paramètre à drawIngredients

      const remainingIngredients = getRemainingIngredients();
      drawIngredients(remainingIngredients);
    } else {
      const remainingIngredients = getRemainingIngredients();
      drawIngredients(remainingIngredients);
    }
  });
}

//
// fermeture en cliquant sur le chevron up dans modal ingrédient
//
function fermetureModalParChevronUp() {
  const chevronUp = document.querySelector(".fas.fa-chevron-up");
  chevronUp.addEventListener("click", closeIngredientsModal);
}
window.addEventListener("click", () => {
  closeIngredientsModal();
  // ClosePanelAppliances();/////////////////////////////////////////////////////////
  // ClosePanelUstensiles();
});

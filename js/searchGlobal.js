function handleGlobalSearch() {
  const searchPrincipal = document.getElementById("inputsearch");
  searchPrincipal.addEventListener("input", (e) => {
    //console.log(e.target.value);
    globalSearchString = e.target.value; // globalSearchString is global, defined in selectRecipes
    console.log("globalSearchString", globalSearchString);
    CloseAllPanels();
    placeCards(selectedRecipes());
    // not found message
    const notFound = document.getElementById("not-found");
    const recepiesFound = selectedRecipes().length;
    if (globalSearchString.length >= 3) {
      if (recepiesFound === 0) {
        notFound.innerHTML =
          "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.";
      } else {
        notFound.innerHTML = `J'ai trouvé ${recepiesFound} recettes`;
      }
    } else {
      notFound.innerHTML = "";
    }
  });
}

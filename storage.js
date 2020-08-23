class Storage {
  // constructor(name, ...composition) {
  //   this.name = name;
  //   this.composition = [...composition];
  // }
  // showInfo() {
  //   console.log(this.name);
  //   this.composition.forEach((item) => console.log(item));
  // }
  DrinkStorage = {
    cola: ["ada", "daw"],
    fanta: ["da", 4],
    vodka: ["leghkaya pohodka"],
  };

  reset() {
    for (let drink in this.DrinkStorage) {
      delete this.DrinkStorage[drink];
    }
  }

  addValue(key, value) {
    this.DrinkStorage[key] = value;
  }

  getValue(key) {
    if (key in this.DrinkStorage) {
      return this.DrinkStorage[key];
    }
    return false;
  }

  deleteValue(key) {
    if (key in this.DrinkStorage) {
      delete this.DrinkStorage[key];
      return true;
    }
    return false;
  }

  getKeys() {
    return Object.keys(this.DrinkStorage);
  }
}

const addDrinkToList = (name) => {
  const drinkList = document.querySelector(".drink-list");

  let drink = document.createElement("li");
  drink.className = "drink-item";
  drink.innerHTML = name;
  drinkList.append(drink);
};

const createDrink = () => {
  const form = document.getElementById("drink-create__form");

  const name = form.name.value;
  const composition = form.composition.value.split(";");
  if (name && composition) {
    drinks.addValue(name, composition);
    addDrinkToList(name);
  }

  form.onsubmit = () => {
    form.name.value = "";
    form.composition.value = "";
    return false;
  };
};

const showDrinkComposition = (name) => {
  const composition = drinks.getValue(name);
  const drinkName = document.querySelector(".drink-name");
  const drinkComposition = document.querySelector(".drink-composition");

  if (composition) {
    drinkName.innerHTML = name;
    drinkComposition.innerHTML = "Composition: " + composition;
  } else {
    drinkName.innerHTML = "No info";
    drinkComposition.innerHTML = "No info";
  }
};

const highlightDrink = (drink) => {
  if (selectedDrink) {
    selectedDrink.classList.remove("highlight");
  }
  drink.classList.add("highlight");
  selectedDrink = drink;
};

const searchDrink = () => {
  const form = document.getElementById("search-form");
  const name = form["search-drink"].value;

  if (name) {
    showDrinkComposition(name);
    hideSearchModal();
  }

  form.onsubmit = () => false;
};

const showSearchModal = () => {
  const coverBlock = document.createElement("div");
  coverBlock.classList.add("cover-block");
  document.body.append(coverBlock);
  document.body.style.overflowY = "hidden";

  const searchForm = document.getElementById("search-form");
  searchForm.style.display = "block";
};

const hideSearchModal = () => {
  document.querySelector(".cover-block").remove();
  document.body.style.overflowY = "";
  document.getElementById("search-form").style.display = "none";
};

////////////////////
const drinks = new Storage();
const button = document.querySelector(".btn-create");
button.addEventListener("click", createDrink);

const drinkList = document.querySelector(".drink-list");
let selectedDrink = document.querySelector(".highlight");

drinkList.addEventListener("click", (event) => {
  let target = event.target;
  if (target.tagName === "LI") {
    highlightDrink(target);
    showDrinkComposition(target.innerHTML);
  }
});

const btnSearchOpen = document.querySelector(".btn-search__open");
btnSearchOpen.addEventListener("click", showSearchModal);
const searchBtn = document.querySelector(".btn-search");
searchBtn.addEventListener("click", searchDrink);
/////////////////////////

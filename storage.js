class Storage {
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
    drinkComposition.innerHTML = "Composition: No info";
  }
};

const highlightDrink = (drink) => {
  if (selectedDrink) {
    selectedDrink.classList.remove("highlight");
  }
  drink.classList.add("highlight");
  selectedDrink = drink;
  flicker();
};

const getDrinkNode = (name) => {
  const drinkList = [...document.querySelectorAll(".drink-item")];
  return drinkList.find((item) => item.innerHTML === name);
};

const searchDrink = () => {
  const form = document.getElementById("search-form");
  const name = form["search-drink"].value;

  if (name) {
    showDrinkComposition(name);
    hideModal();
    flicker();
  }

  const node = getDrinkNode(name);
  if (!node && selectedDrink) {
    selectedDrink.classList.remove("highlight");
    selectedDrink = null;
  } else if (node) {
    highlightDrink(node);
  }

  form.onsubmit = () => {
    form["search-drink"].value = "";
    return false;
  };
};

const showModal = (flag) => {
  const coverBlock = document.createElement("div");
  coverBlock.classList.add("cover-block");
  document.body.append(coverBlock);
  document.body.style.overflowY = "hidden";

  const searchForm = document.getElementById("search-form");
  searchForm.style.display = "block";

  if (flag) {
    searchBtn.style.display = "block";
    removeBtn.style.display = "none";

    const formHeader = document.querySelectorAll(".header")[3];
    formHeader.innerHTML = "Search drink";
  } else {
    removeBtn.style.display = "block";
    searchBtn.style.display = "none";

    const formHeader = document.querySelectorAll(".header")[3];
    formHeader.innerHTML = "Remove drink";
  }
};

const hideModal = () => {
  document.querySelector(".cover-block").remove();
  document.body.style.overflowY = "";
  document.getElementById("search-form").style.display = "none";
};

const removeDrink = () => {
  const form = document.getElementById("search-form");
  const name = form["search-drink"].value;
  const node = getDrinkNode(name);

  if (!node) {
    // hideModal();
    alert("the are no drinks with that name");
  } else {
    drinks.deleteValue(name);
    node.remove();
    hideModal();
    alert("deleted");
  }

  form.onsubmit = () => {
    form["search-drink"].value = "";
    return false;
  };
};

const flicker = () => {
  const infoBlock = document.querySelector(".drink-info");
  const infoHeader = document.querySelectorAll(".header")[2];
  infoBlock.style.borderColor = "lightgreen";
  infoHeader.style.color = "lightgreen";

  setTimeout(() => {
    infoBlock.style.borderColor = "rgb(255, 115, 0)";
    infoHeader.style.color = "rgb(255, 115, 0)";
  }, 1500);
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

const searchBtn = document.querySelector(".btn-search");
searchBtn.addEventListener("click", searchDrink);

const removeBtn = document.querySelector(".btn-remove");
removeBtn.addEventListener("click", removeDrink);

const btnSearchOpen = document.querySelector(".btn-search__open");
btnSearchOpen.addEventListener("click", () => showModal(true));

const btnRemoveOpen = document.querySelector(".btn-remove__open");
btnRemoveOpen.addEventListener("click", () => showModal(false));

const closeButt = document.querySelector(".close");
closeButt.addEventListener("click", hideModal);
/////////////////////////

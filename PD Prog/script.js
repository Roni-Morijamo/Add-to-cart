import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetings = {
  databaseURL: "https://realtime-database-df7b3-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSetings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");


const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function() {
  let inputValue = inputFieldEl.value

  push(shoppingListInDB, inputValue);

  clearInputFieldEl();

});

onValue(shoppingListInDB, function(snapshot) {

  if(snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    clearShoppingEl();

    for(let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];
  
      appendItemToShoppingListEl(currentItem);
    }
  } else {
    shoppingListEl.innerHTML = "No items here..yet"
  }

});

function clearShoppingEl() {
  shoppingListEl.innerHTML = "";
};

function clearInputFieldEl() {
  inputFieldEl.value = "";
};

function appendItemToShoppingListEl(item) {
  let itemID = item[0];
  let itemValue = item[1];
  
  let newEl = document.createElement("li");
  
  newEl.textContent = itemValue;
  
  newEl.addEventListener("click", function() {
    let exactLocationOfDB = ref(database, `shoppingList/${itemID}`);
    remove(exactLocationOfDB);
  })

  shoppingListEl.append(newEl);
};
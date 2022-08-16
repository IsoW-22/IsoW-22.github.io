"use strict"

const createNewTask = () => {
    const ses = sessionStorage.getItem("current div");
    const itemCount = document.querySelector(`#${ses} .items`).childNodes.length;
    const main = document.querySelector(`#${ses} .items`);
    const create = document.querySelector(`#${ses} #create`);
    const textarea = document.createElement("p");

    let textInput = prompt("Please enter your task name:", "new task");
    if (textInput == null || textInput == "") {
      return;
    } else {
      textarea.innerHTML = textInput;
    }
    textarea.classList.add("task");

    const div = document.createElement("div");
    div.classList.add("todo-item");
    div.setAttribute("id",`item-${itemCount - 1}`)
    main.insertBefore(div, create);

    const tickButton = document.createElement("Button");
    const tickImg = document.createElement("img");
    tickImg.src =
      "https://img.icons8.com/external-others-inmotus-design/20/000000/external-Done-accept-others-inmotus-design-2.png";
    tickButton.classList.add("tick-icon");
    div.appendChild(tickButton);
    tickButton.appendChild(tickImg);

    const delButton = document.createElement("button");
    const delImg = document.createElement("img");
    delImg.src = "https://img.icons8.com/color/23/000000/cancel--v3.png";
    delButton.classList.add("delete-icon");
    delButton.appendChild(delImg);
    div.appendChild(delButton);

    const editButton = document.createElement("button");
    const editImg = document.createElement("img");
    editImg.src =
      "https://img.icons8.com/external-flaticons-flat-flat-icons/25/000000/external-edit-100-most-used-icons-flaticons-flat-flat-icons-2.png";
    editButton.classList.add("edit-icon");
    editButton.appendChild(editImg);
    div.appendChild(editButton);

    const starButton = document.createElement("button"); 
    const star = document.createElement("p");
    star.innerHTML = "&#9733;";
    star.classList.add("important");
    starButton.classList.add("important-button");
    starButton.appendChild(star);
    div.appendChild(starButton);

    div.appendChild(textarea);
}

const create = document.querySelector(".create");
create.addEventListener("click", createNewTask)

// ^^^^^^^^^^^^^ up there... to make new tasks no? :D ^^^^^^^^^^

const userChange = document.querySelector(".user");
userChange.addEventListener("click", () => {
  const name = prompt("enter your name", localStorage.getItem("name"));
      if(name != null || name == ""){
        localStorage.clear();
        localStorage.setItem("name", name);
        document.querySelector(".user").innerHTML = name;
      }
      else {
        document.querySelector(".user").innerHTML = localStorage.getItem("name");
      }
})

// now lets do something more fun down here!
//lets make these tasks buttons work :D so tick will... check it green? important yellow? ok


function allButtons(event) {
  const { target } = event;

  if (target.classList.contains("tick-icon")) {
    const task = target.parentNode.querySelector(".task");

    if (target.parentNode.style.backgroundColor == "green") {
      task.style.textDecoration = "none";
      target.parentNode.style.backgroundColor = "#7A4495";
      target.parentNode.querySelector(".edit-icon").disabled = false;
      target.parentNode.querySelector(".important-button").disabled = false;
      target.parentNode.querySelector(".important-button p").style.color =
        "white";
      target.parentNode.querySelector(".task").style.color = "#fff";
    } else {
      task.style.textDecoration = "line-through";
      target.parentNode.style.backgroundColor = "green";
      target.parentNode.querySelector(".edit-icon").disabled = true;
      target.parentNode.querySelector(".important-button").disabled = true;
      target.parentNode.querySelector(".task").style.color = "#fff";
      const currentDivision = sessionStorage.getItem("current div");
      let sesItem = JSON.parse(sessionStorage.getItem(`${currentDivision}-items`));
      const id = target.parentNode.getAttribute("id");
      const index = sesItem.indexOf(id);
      if (index > -1) {
        sesItem.splice(index, 1);
      }
      sessionStorage.removeItem(`${currentDivision}-items`);
      sessionStorage.setItem(
        `${currentDivision}-items`,
        JSON.stringify(sesItem)
      );
    }
  }

  if (target.classList.contains("delete-icon")) {
    if (confirm("are you sure you want to delete this task?")) {
      target.parentNode.remove();
    } else {
      return;
    }
  }

  if (target.classList.contains("edit-icon")) {
    const pText = target.parentNode.querySelector(".task").innerHTML;
    let textInput = prompt("Please enter your task name:", pText);
    if (textInput == null || textInput == "") {
      return;
    } else {
      target.parentNode.querySelector(".task").innerHTML = textInput;
    }
  }

  if (target.classList.contains("important-button")) {
    const id = target.parentNode.id;
    const color = target.parentNode.querySelector(".important-button p").style
      .color;
      const currentDiv = sessionStorage.getItem("current div");
    if (color == "orangered") {
      target.parentNode.querySelector(".important-button p").style.color =
        "white";
      target.parentNode.style.backgroundColor = "#7A4495";
      target.parentNode.querySelector(".task").style.color = "#fff";
      let sItemsForDel = JSON.parse(
        sessionStorage.getItem(`${currentDiv}-items`)
      );
      const index = sItemsForDel.indexOf(id);
      if (index > -1) {
        sItemsForDel.splice(index, 1);
      }
      sessionStorage.removeItem(`${currentDiv}-items`);
      sessionStorage.setItem(`${currentDiv}-items`, JSON.stringify(sItemsForDel));
    } else {
      target.parentNode.querySelector(".important-button p").style.color =
        "orangered";
      target.parentNode.style.backgroundColor = "#ffde20";
      target.parentNode.querySelector(".task").style.color = "#000";
      let sessionItems = JSON.parse(sessionStorage.getItem(`${currentDiv}-items`));
      sessionItems.push(id);
      sessionStorage.removeItem(`${currentDiv}-items`);
      sessionStorage.setItem(`${currentDiv}-items`, JSON.stringify(sessionItems));
    }
  }
}


const tasks = document.querySelector(".items");
tasks.addEventListener("click", allButtons);


//something cool finished :D now lets make those nav items work!

function justImportant(){
  const items = document.querySelectorAll(".todo-item");
  const id = document.querySelectorAll(".items [id]:not(#create)");
  const sesCur = sessionStorage.getItem("current div");
  let sItems = JSON.parse(sessionStorage.getItem(`${sesCur}-items`));
  let i = 0;
  items.forEach((item) => {
    item.style.display = "none";
  });
  for(; i < id.length; i++){
   id.forEach(item2 => {
      if(sItems[i] == item2.id){
        item2.style.display = "block";
      }
    })
  }
  document.querySelector(`#${sesCur} .create-imp`).style.display = "block";
  document.querySelector(`#${sesCur} .create`).style.display = "none";
}

const importantThings = document.querySelector(".importants");
importantThings.addEventListener("click", justImportant);

function showAll() {
  const sesCur = sessionStorage.getItem("current div");
  const items = document.querySelectorAll(".todo-item");
  items.forEach((item) => {
    item.style.display = "block";
  });
  document.querySelector(`#${sesCur} .create-imp`).style.display = "none";
  document.querySelector(`#${sesCur} .create`).style.display = "block";
}


const dayItems = document.querySelector(".day");
dayItems.addEventListener("click", showAll);

// nowwwww lets make important tasks :D
// just some copy pastes you know :D

const createNewImportantTask = () => {
    const ses = sessionStorage.getItem("current div");
    const itemCount = document.querySelector(`#${ses} .items`).childNodes
      .length;
    const main = document.querySelector(`#${ses} .items`);
    const create = document.querySelector(`#${ses} #create`);

    const textarea = document.createElement("p");
    let textInput = prompt("Please enter your task name:", "new task");
    if (textInput == null || textInput == "") {
      return;
    } else {
      textarea.innerHTML = textInput;
    }

    const div = document.createElement("div");
    div.classList.add("todo-item");
    div.setAttribute("id",`item-${itemCount - 3}`);
    div.style.backgroundColor = "#ffde20";
    main.insertBefore(div, create);

    const tickButton = document.createElement("Button");
    const tickImg = document.createElement("img");
    tickImg.src =
      "https://img.icons8.com/external-others-inmotus-design/20/000000/external-Done-accept-others-inmotus-design-2.png";
    tickButton.classList.add("tick-icon");
    div.appendChild(tickButton);
    tickButton.appendChild(tickImg);

    const delButton = document.createElement("button");
    const delImg = document.createElement("img");
    delImg.src = "https://img.icons8.com/color/23/000000/cancel--v3.png";
    delButton.classList.add("delete-icon");
    delButton.appendChild(delImg);
    div.appendChild(delButton);

    const editButton = document.createElement("button");
    const editImg = document.createElement("img");
    editImg.src =
      "https://img.icons8.com/external-flaticons-flat-flat-icons/25/000000/external-edit-100-most-used-icons-flaticons-flat-flat-icons-2.png";
    editButton.classList.add("edit-icon");
    editButton.appendChild(editImg);
    div.appendChild(editButton);

    const starButton = document.createElement("button"); 
    const star = document.createElement("p");
    star.innerHTML = "&#9733;";
    star.classList.add("important");
    star.style.color = "orangered";
    starButton.classList.add("important-button");
    starButton.appendChild(star);
    div.appendChild(starButton);

    textarea.classList.add("task");
    textarea.style.color = "#000";
    div.appendChild(textarea);

    const id = div.getAttribute("id");
    const divID = sessionStorage.getItem("current div");
    let sessionItems = JSON.parse(
      sessionStorage.getItem(`${divID}-items`)
    );
    sessionItems.push(id);
    sessionStorage.removeItem(`${divID}-items`);
    sessionStorage.setItem(`${divID}-items`, JSON.stringify(sessionItems));
}

const createImp = document.getElementById("create-imp");
createImp.addEventListener("click", createNewImportantTask);

//and the last paaaaaaart
//these lists "SHOOOOOOOULD work"

const createList = () => {
  const listNames = document.querySelectorAll(".list-name:not(.list2 .list-name)");
  const listName = prompt("enter list name", "untitled list");
  if(listName == null || listName == ""){
    return;
  }
  else {
    listNames.forEach((name) => {
      name.innerHTML = listName;
    });
  }
  const contents = document.querySelectorAll('[id*="content"]');
  contents.forEach((items) => {
    items.style.display = "none";
  });

  const container = document.getElementById("container");
  const containerL = document.getElementById("container").childNodes.length;
  const content = document.createElement("div");
  content.setAttribute("id",`content-${containerL-6}`)
  container.appendChild(content);

  sessionStorage.setItem("current div", `content-${containerL-6}`);

  const listNameDiv = document.createElement("div");
  listNameDiv.classList.add("list2");
  content.appendChild(listNameDiv);
  const listNameP = document.createElement("p");
  listNameP.classList.add("list-name");
  listNameDiv.appendChild(listNameP);
  const spanP = document.createElement("span");
  spanP.classList.add("pointer");
  spanP.innerHTML = listName;
  listNameP.appendChild(spanP);

  const itemsDiv = document.createElement("div");
  itemsDiv.classList.add("items");
  itemsDiv.addEventListener("click", allButtons);
  content.appendChild(itemsDiv);
  const createDiv = document.createElement("div");
  createDiv.setAttribute("id","create");
  createDiv.classList.add("create");
  createDiv.addEventListener("click", createNewTask);
  itemsDiv.appendChild(createDiv);
  const img = document.createElement("img");
  img.src = "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/25/000000/external-Green-Plus-miscellaneous-kiranshastry-lineal-color-kiranshastry.png";
  createDiv.appendChild(img);
  const createP = document.createElement("p");
  createP.innerHTML = "Create";
  createDiv.appendChild(createP);
  const createImp = document.createElement("div");
  createImp.classList.add("create-imp");
  createImp.setAttribute("id", "create-imp");
  createImp.addEventListener("click", createNewImportantTask);
  itemsDiv.appendChild(createImp);
  const img2 = document.createElement("img");
  img2.src = "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/25/000000/external-Green-Plus-miscellaneous-kiranshastry-lineal-color-kiranshastry.png";
  createImp.appendChild(img2);
  const createP2 = document.createElement("p");
  createP2.innerHTML = "Create important task";
  createImp.appendChild(createP2);

  const listNav = document.createElement("li");
  listNav.classList.add("list-item");
  listNav.setAttribute("id", `item-${containerL-6}`);
  sessionStorage.setItem(`item-${containerL - 6}`, `content-${containerL - 6}`);
  sessionStorage.setItem(`content-${containerL - 6}-items`, "[]");
  listNav.innerHTML = listName;
  document
    .querySelector(".lists ul")
    .insertBefore(listNav, document.querySelector(".lists ul .create-list"));
  const listImg = document.createElement("img");
  listImg.src = "https://img.icons8.com/emoji/20/000000/minus-emoji.png";
  listImg.classList.add("delete-list");
  listNav.appendChild(listImg);
  document.querySelectorAll(".lists-items li").forEach(li => {
    li.style.border = "none";
  });
  listNav.style.borderLeft = "5px groove rgb(236, 8, 84)";
}

document.querySelector(".create-list").addEventListener("click", createList);

//and the last one for lists to choose :

function listCheck (event){
  showAll();
  const {target} = event;
  if(target.classList.contains("list-item")){
    const id = target.id;
    const thisDiv = sessionStorage.getItem(id);
    const divisions = document.querySelectorAll('[id*="content"]');
    divisions.forEach(division => {
      division.style.display = "none";
    })
    document.querySelector("#" + thisDiv).style.display = "block";
    sessionStorage.setItem("current div", thisDiv);
    target.parentNode.querySelectorAll("li").forEach(node =>{
      node.style.border = "none";
    });
    target.style.borderLeft = "5px groove rgb(236, 8, 84)";
  }
  if(target.classList.contains("delete-list")){
    const getID = target.parentNode.id;
    const getsesID = sessionStorage.getItem(getID);
    document.querySelector("#" + getsesID).style.display = "none";
    document.querySelector("#content").style.display = "block";
    document.querySelector("#item-0").style.borderLeft =
      "5px groove rgb(236, 8, 84)";
      target.parentNode.querySelectorAll("li").forEach((node) => {
        node.style.border = "none";
      });
    sessionStorage.setItem("current div", "content");
    sessionStorage.removeItem(getID);
    sessionStorage.removeItem(`${getsesID}-items`);
    target.parentNode.remove();
  }
}

const selectLists = document.querySelector(".lists-items");
selectLists.addEventListener("click", listCheck);
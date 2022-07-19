let addToy = false;
let toyList = [];
let URL = " http://localhost:3000/toys";

function processLike(event){
  const toyDiv = event.target.parentNode;
  const toyId = toyDiv.dataset.id;
  const toy = toyList.find(toy => toy.id == toyId);

  fetch(`${URL}/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({likes: ++toy.likes})
  }).then(resp => resp.json())
  .then(newToy => {
    toyDiv.querySelector('p').textContent = `${newToy.likes} Likes`;
  })
}

function addNewToy(toy) {
  let toyCollection = document.querySelector('#toy-collection');
  let toyDiv = document.createElement("div");

  toyDiv.className = "card";
  toyDiv.dataset.id = toy.id;
  toyDiv.innerHTML = 
  `<h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar" />
  <p>${toy.likes} Likes </p>`

  let btn = document.createElement("button");
  btn.className = "like-btn";
  btn.textContent = "Like <3";

  btn.addEventListener("click", processLike);

  toyDiv.appendChild(btn);
  toyCollection.appendChild(toyDiv);
}

function submitToy(event) {
  event.preventDefault();
  const toy = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0
  }
  
  fetch(`${URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toy)
  }).then(resp => resp.json())
  .then(addNewToy)
}
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch(`${URL}`).then(resp => resp.json()).then(resp => {
  toyList = resp;
  toyList.forEach(addNewToy);
})

document.querySelector(".add-toy-form").addEventListener("submit", submitToy);
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  let toyList = [];
  const toyAPI = "http://localhost:3000/toys"
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

  const toyCollection = document.querySelector("#toy-collection")
  document.querySelector(".add-toy-form").addEventListener("submit", handleAddNewToy);
  
  fetch(toyAPI)
    .then(res => res.json())
    .then(toys => {
      toyList = toys;
      renderToys(toyList);
    })

  function renderToys(toys) {
    toyCollection.innerHTML = "";
    toys.forEach(renderToy);
  }

  function renderToy(toy) {
    const toyCard = document.createElement("div")
    toyCard.classList.add("card")
    toyCollection.append(toyCard)

    toyCard.innerHTML = `
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>${toy.likes}</p>
      `

    const likeButton = document.createElement("button")
    likeButton.classList.add("like-btn")
    likeButton.id = toy.id
    likeButton.textContent = "Like ❤️"
    toyCard.append(likeButton);

    likeButton.addEventListener("click", () => handleAddLike(toy))
  }

  function handleAddLike(toy) {
    const likes = toy.likes + 1;
    
    fetch(`${toyAPI}/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({likes})
    })
    .then(res => res.json())
    .then(() => {
      toy.likes = likes;
      renderToys(toyList)
    })
  }

  function handleAddNewToy(e) {
    e.preventDefault();
    const newToyData = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }

    fetch(toyAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newToyData)
    })
    .then(res => res.json())
    .then(renderToy);

    e.target.reset();
  }




  /*fetch(toyAPI)
  .then(res => res.json())
  .then(toys => {
    toys.forEach((toy) => {
      const div = document.createElement("div")
      div.className = "card"
      div.innerHTML = `
        <h2>${toy["name"]}</h2>
        <img class="toy-avatar" src="${toy["image"]}"/>
        <p>${toy["likes"]}</p>
        <button id="${toy["id"]}" class="like-btn">like</button>
      `
      document.querySelector("#toy-collection").append(div)
    })
  })

  const toysForm = document.querySelector(".add-toy-form")
  
  toysForm.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(toyAPI, {
      method: "POST",
      header: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: e.target.name.value,
        image: e.target.image.value,
        likes: 0
      }),
    })
    .then((res) => res.json())
    .then((object) => console.log(object))
  })*/
})
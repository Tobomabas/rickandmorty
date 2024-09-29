const cardContainer = document.getElementById("main-wrapper");
const filterIinput = document.getElementById("filterByNameInput");
const selectStatus = document.querySelectorAll('input[name="select"]');
let maxPages;
let page = 1;
let items = [];
let filterName = "";
let filterStatus = "";

async function loadItems() {
  try {
    filterName = filterIinput.value.trim();
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}&name=${filterName}&status=${filterStatus}`
    );
    const data = await response.json();
    items = data.results;
    if (data.info.pages) maxPages = data.info.pages;
  } catch (err) {
    console.log("Problem z pobraniem elementów", err);
    alert("Nie znaleziono postaci spełniających kryteria wyszukiwania");
    filterName = "";
    filterStatus = "";
    return;
  }
  cardContainer.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("div");
    const img = document.createElement("img");
    const cardName = document.createElement("div");
    const statGatContainer = document.createElement("div");
    const spanInCard = document.createElement("p");
    const spanInCard2 = document.createElement("p");
    card.classList.add("card");
    img.src = item.image;
    img.alt = item.name;
    cardName.classList.add("card-name");
    cardName.textContent = item.name;
    statGatContainer.classList.add("statgat");
    spanInCard.textContent = `Status: ${item.status}`;
    spanInCard2.textContent = `Gatunek: ${item.species}`;
    statGatContainer.append(spanInCard, spanInCard2);
    card.append(img, cardName, statGatContainer);
    cardContainer.appendChild(card);
  });
}

function nextPage() {
  if (page < maxPages) page++;
  loadItems();
}

function prevPage() {
  if (page > 1) {
    page--;
    loadItems();
  }
}

filterIinput.addEventListener("input", () => {
  loadItems();
});

function getSelectedOption() {
  const selectedOption = document.querySelector('input[name="select"]:checked');
  return selectedOption ? selectedOption.value : "";
}

selectStatus.forEach((radio) => {
  radio.addEventListener("change", () => {
    filterStatus = getSelectedOption();
    loadItems();
  });
});
loadItems();

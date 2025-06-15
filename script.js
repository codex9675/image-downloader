const toggle = document.querySelector(".menu-icon");
const Nav = document.querySelector("nav ul");
const menuBars = document.querySelector(".menu-bars");
const cancle = document.querySelector(".cancele");
const searchValue = document.querySelector("#search");
const searchBtn = document.querySelector(".search-Btn");
const image = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector("#loadMoreBtn");
cancle.style.display = "none";
toggle.addEventListener("click", () => {
  Nav.classList.toggle("open");
  if (Nav.classList.contains("open")) {
    menuBars.style.display = "none";
    cancle.style.display = "block";
  } else {
    cancle.style.display = "none";
    menuBars.style.display = "block";
  }
});

let page = 1;
let SearchName = "dog";
searchBtn.addEventListener("click", () => {
  SearchName = searchValue.value.trim();
  if (SearchName) {
    page++;
    image.innerHTML = "";
    FeatchApi(SearchName, page);
  }
});

loadMoreBtn.addEventListener("click", () => {
  console.log(page);
  page++;

  FeatchApi(SearchName, page);
});

const FeatchApi = async (search, page) => {
  const key = "5dtC4zppYy88toYczGpYGjZl572ryDqTJ8IaAa8Nohs";
  const apiUrl = await fetch(
    `https://api.unsplash.com/search/photos?page=${page}&query=${search}&client_id=${key}`
  );
  const data = await apiUrl.json();
  data.results.map((item) => {
    const div = document.createElement("div");
    const img = document.createElement("img");
    const btn = document.createElement("button");

    img.src = item.urls.regular;
    img.alt = item.alt_description;

    img.classList.add("image-style");
    div.classList.add("wrapper");
    btn.classList.add("cards");
    btn.textContent = "Download Now";
    btn.addEventListener("click", async () => {
      const respose = await fetch(item.urls.full);
      const blob = await respose.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${item.id}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
    div.appendChild(img);
    div.appendChild(btn);
    image.appendChild(div);
  });
};

searchValue.addEventListener("keypress", (e) => {
  if ((e.key = "Enter")) {
    image.innerHTML = "";
    page = 1;
    SearchName = searchValue.value.trim();
    FeatchApi(SearchName, page);
  }
});

FeatchApi(SearchName, page);

// fetch function
const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

// fetch categories and display it to the dom

const displayCategories = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  const fetchObj = await fetchData(url);
  const categories = fetchObj.data.news_category;
  const categorieLists = document.getElementById("categorie-lists");
  for (const categorie of categories) {
    // console.log(categorie);
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    <a onclick = "loadNews('${categorie.category_id}')" href="#">${categorie.category_name}</a>
    `;
    categorieLists.append(listItem);
  }
};

// load news by categories...

const loadNews = async (category_id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  const newsObj = await fetchData(url);
  const newses = newsObj.data;
  const newsSection = document.getElementById("news-section");
  newsSection.textContent = "";
  for (const news of newses) {
    console.log(news);
    const singleNewsdiv = document.createElement("div");
    singleNewsdiv.classList.add("single-news");
    const newsDetails = add3Dots(news.details, 300);
    singleNewsdiv.innerHTML = `
        <div class="single-news-image">
            <img src="${news.image_url}" alt="" />
        </div>
        <div class="single-news-content">
            <h4>${news.title ? news.title : "Title"}</h4>
            <p>${newsDetails ? newsDetails : "No details found"}</p>
            <div class="author-container">
              <div class="author">
                <div class="author-img">
                  <img src="${news.author.img}" alt="" />
                </div>
                <div class="ms-2">
                  <h6>${
                    news.author.name ? news.author.name : "No author name"
                  }</h6>
                  <span>10/12/1994</span>
                </div>
              </div>
              <div>
                <span><i class="fa-regular fa-eye"></i></span> view
              </div>
              <span><img src="assets/Group 116134.png" alt="" /></span>
              <div>
                <i  class="fa-solid fa-arrow-right" data-bs-toggle="modal"
                data-bs-target="#exampleModal"></i>
              </div>
            </div>
        </div>   
    `;
    newsSection.append(singleNewsdiv);
  }
};

const add3Dots = (string, limit) => {
  var dots = "...";
  if (string.length > limit) {
    // you can also use substr instead of substring
    string = string.substring(0, limit) + dots;
  }
  return string;
};

displayCategories();

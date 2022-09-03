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
    <a class="categories-link" onclick = "loadNews('${categorie.category_id}')" href="#">${categorie.category_name}</a>
    `;
    categorieLists.append(listItem);
  }
};

// load news by categories...

const loadNews = async (category_id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  loading(true);
  const newsObj = await fetchData(url);
  const newses = newsObj.data;
  const newsSection = document.getElementById("news-section");
  const newsCount = document.getElementById("news-count");
  newsSection.textContent = "";
  if (newses.length > 1) {
    newsCount.classList.remove("d-none");
    newsCount.innerHTML = `
        <h4>${newses.length} News Found</h4>
    `;
  } else {
    newsCount.classList.remove("d-none");
    newsCount.innerHTML = `
        <h4>No News Found</h4>
    `;
  }
  // sorting news by decending order
  newses.sort((a, b) => b.total_view - a.total_view);

  for (const news of newses) {
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
                    news.author.name ? news.author.name : "No author name Found"
                  }</h6>
                  <span>10/12/1994</span>
                </div>
              </div>
              <div>
                <span><i class="fa-regular fa-eye"></i> ${
                  news.total_view ? news.total_view : "No Total Views Found"
                }</span>
              </div>
              <span><img src="assets/Group 116134.png" alt="" /></span>
              <div>
                <i onclick = "showNewsDetails('${
                  news._id
                }')" class="fa-solid fa-arrow-right" data-bs-toggle="modal"
                data-bs-target="#newsModal"></i>
              </div>
            </div>
        </div>   
    `;
    newsSection.append(singleNewsdiv);
  }
  loading(false);
};

const showNewsDetails = async (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  const newsDetailsObj = await fetchData(url);
  const newsDetails = newsDetailsObj.data[0];
  const newstitle = document.getElementById("newsModalLabel");
  newstitle.innerText = newsDetails.title;
  const newsDesCription = add3Dots(newsDetails.details, 80);
  const modalBodyId = document.getElementById("modal-body-id");
  modalBodyId.innerHTML = `
    <img src ='${
      newsDetails.thumbnail_url ? newsDetails.thumbnail_url : "No source"
    }'><br/><br/>
    <span class="text-primary">Description : <p class="text-black">${newsDesCription}<p></span>

    <span class="text-primary">Total Views : <span class="text-black">${
      newsDetails.total_view
        ? newsDetails.total_view
        : "No Total total View Found"
    }<span></span><br/>
      
      <span class="text-primary">Ratings : <span class="text-black">${
        newsDetails.rating.number
          ? newsDetails.rating.number
          : "No Rating Found"
      }<span></span><br/>

    <span class="text-primary">Author Name : <span class="text-black">${
      newsDetails.author.name
        ? newsDetails.author.name
        : "Author Name Not Found"
    }<span></span><br/>

    <span class="text-primary">Published Date : <span class="text-black">${
      newsDetails.author.published_date
        ? newsDetails.author.published_date
        : "No Pulished Day Found"
    }<span></span><br/>

    <span class=" modal-author-img text-primary">Author Image : <img src ='${
      newsDetails.author.img ? newsDetails.author.img : "No source"
    }'class="text-black">
    </span><br/>

    
  
  `;
};

// loder function

const loading = (isLoading) => {
  const loader = document.getElementById("loader");
  if (isLoading === true) {
    loader.classList.remove("d-none");
  } else {
    loader.classList.add("d-none");
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

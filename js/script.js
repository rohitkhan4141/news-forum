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
    <a href="#">${categorie.category_name}</a>
    `;
    categorieLists.append(listItem);
  }
};

displayCategories();

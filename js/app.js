const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const response = await fetch(url);
    const data = await response.json();
    displayCategory(data.data.news_category);
    //console.log(data.data.news_category);
}

const displayCategory = (categories) => {
    const categoryContainer = document.getElementById('category');
    for (const category in categories) {
        //console.log(categories[category].category_name);
        const categoryName = document.createElement('button');
        categoryName.classList.add("btn", "btn-ghost");
        categoryName.setAttribute("onclick", `loadNews('${categories[category].category_id}')`)
        categoryName.innerHTML = `
            ${categories[category].category_name}
        `
        categoryContainer.appendChild(categoryName);
    }
}
loadCategory();

const loadNews = async (id) => {
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    displayNews(data.data);
    console.log(data.data);
}

const displayNews = (multipleNewsDetails) => {
    const newsContainer = document.getElementById('newsCards');
    newsContainer.innerHTML = ``;
    multipleNewsDetails.forEach(newsDetails => {
        const newsCard = document.createElement('div');
        newsCard.innerHTML = `
        <div class="card lg:card-side bg-base-100 shadow-xl my-5">
            <figure><img src="${newsDetails.thumbnail_url}" alt="thumbnailes" class="p-2"></figure>
            <div class="card-body">
                <h2 class="card-title">${newsDetails.title}</h2>
                <p>${newsDetails.details}</p>
            </div>
        </div>
        `
        newsContainer.appendChild(newsCard);
    });
}

loadNews();
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
        let slicedTxt;
        if (newsDetails.details.length >= 500) {
            slicedTxt = newsDetails.details.slice(0, 500) + '...';
        }
        else {
            slicedTxt = newsDetails.details;
        }
        newsCard.innerHTML = `
        <div class="card lg:card-side bg-base-100 shadow-xl my-5">
            <figure><img src="${newsDetails.thumbnail_url}" alt="thumbnailes" class="p-2"></figure>
            <div class="card-body">
                <h2 class="card-title">${newsDetails.title}</h2>
                <p>${slicedTxt}</p>
                <div class="flex justify-between items-center">
                    <div class="flex items-center">
                        <img class="w-10 rounded-full mx-4" src="${newsDetails.author.img}" />
                        <div>
                            <p class="font-semibold">${newsDetails.author.name}</p>
                            <p class="text-slate-600">${newsDetails.author.published_date}</p>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <img src="images/icons8-eye-30.png" alt="">
                        <p class="font-bold mx-3">${newsDetails.total_view}</p>
                    </div>
                    <div class="rating">
                        <input type="radio" name="rating-1" class="mask mask-star" />
                        <input type="radio" name="rating-1" class="mask mask-star" />
                        <input type="radio" name="rating-1" class="mask mask-star" />
                        <input type="radio" name="rating-1" class="mask mask-star" checked />
                        <input type="radio" name="rating-1" class="mask mask-star" />
                    </div>
                    <button><img src="images/icons8-right-arrow-48.png" alt=""></button>
                </div>
            </div>
        </div>
        `
        newsContainer.appendChild(newsCard);
    });
}

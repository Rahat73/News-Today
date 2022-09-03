const loadCategory = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`;
        const response = await fetch(url);
        const data = await response.json();
        displayCategory(data.data.news_category);
    }
    catch {
        alert("Data couldn't be fetched");
    }
}

const displayCategory = (categories) => {
    const categoryContainer = document.getElementById('category');
    for (const category in categories) {
        const categoryName = document.createElement('button');
        categoryName.classList.add("btn", "btn-ghost");
        categoryName.setAttribute("onclick", `loadNews('${categories[category].category_id}', '${categories[category].category_name}')`)
        categoryName.innerHTML = `
            ${categories[category].category_name}
        `
        categoryContainer.appendChild(categoryName);
    }
}
loadCategory();

const loadNews = async (id, name) => {
    try {
        toggleLoader(true);
        const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        await sleep(2000);
        displayNews(data.data, name);
    }
    catch {
        alert("Data couldn't be fetched");
    }
}

const displayNews = (multipleNewsDetails, name) => {
    let newsItemsLength;
    if (multipleNewsDetails.length == 0) {
        newsItemsLength = 'No';
    }
    else {
        newsItemsLength = multipleNewsDetails.length;
    }
    document.getElementById('newsCount').innerText = newsItemsLength;
    document.getElementById('newsCategory').innerText = name;
    document.getElementById('countSection').classList.remove('hidden');
    document.getElementById('selection').classList.remove('hidden');
    const newsContainer = document.getElementById('newsCards');
    multipleNewsDetails.sort((a, b) => {
        return b.total_view - a.total_view;
    });
    newsContainer.innerHTML = ``;
    multipleNewsDetails.forEach(newsDetails => {
        const newsCard = document.createElement('div');
        let slicedTxt;
        if (newsDetails.details.length >= 350) {
            slicedTxt = newsDetails.details.slice(0, 350) + '...';
        }
        else {
            slicedTxt = newsDetails.details;
        }
        newsCard.innerHTML = `
        <div class="card lg:card-side bg-base-100 shadow-xl my-5">
            <figure><img src="${newsDetails.thumbnail_url}" alt="thumbnailes" class="p-2"></figure>
            <div class="card-body">
                <h2 class="card-title">${newsDetails.title ? newsDetails.title : 'No data found'}</h2>
                <p>${slicedTxt}</p>
                <div class="flex justify-between items-center flex-wrap">
                    <div class="flex items-center">
                        <img class="w-10 rounded-full mr-4" src="${newsDetails.author.img}" />
                        <div>
                            <p class="font-semibold">${newsDetails.author.name ? newsDetails.author.name : 'No data found'}</p>
                            <p class="text-slate-600">${newsDetails.author.published_date ? newsDetails.author.published_date : 'No data found'}</p>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <img src="images/icons8-eye-30.png" alt="">
                        <p class="font-bold mx-3">${newsDetails.total_view ? newsDetails.total_view : 'No data found'}</p>
                    </div>
                    <div class="rating">
                        <input type="radio" name="rating-1" class="mask mask-star" />
                        <input type="radio" name="rating-1" class="mask mask-star" />
                        <input type="radio" name="rating-1" class="mask mask-star" />
                        <input type="radio" name="rating-1" class="mask mask-star" checked />
                        <input type="radio" name="rating-1" class="mask mask-star" />
                    </div>
                    <button></button>
                    <label for="my-modal-3" onclick="loadFullNews('${newsDetails._id}')" class="btn btn-outline modal-button"><img src="images/icons8-right-arrow-48.png" alt=""></label>
                </div>
            </div>
        </div>
        `
        newsContainer.appendChild(newsCard);
    });
    toggleLoader(false);
}


const loadFullNews = async id => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        displayFullNews(data.data);
    }
    catch {
        alert("Data couldn't be fetched");
    }
}

const displayFullNews = newsData => {
    console.log(newsData)
    document.getElementById('newsTitle').innerText = newsData[0].title ? newsData[0].title : 'No data found';
    document.getElementById('fullNews').innerText = newsData[0].details ? newsData[0].details : 'No data found';
    document.getElementById('newsAuthor').innerText = newsData[0].author.name ? newsData[0].author.name : 'No data found';
    document.getElementById('newsDate').innerText = newsData[0].author.published_date ? newsData[0].author.published_date : 'No data found';
}


const toggleLoader = isLoader => {
    const loader = document.getElementById('loader');
    if (isLoader) {
        loader.classList.remove('hidden');
    }
    else {
        loader.classList.add('hidden');
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
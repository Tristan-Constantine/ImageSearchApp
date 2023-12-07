//declaration of accessKey variable
const accessKey = "aK-nPjA3fcBEvko1rtQM-xIN5nsSOMAGmcHz9-JVLXk"

//declaration of HTML variables
const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;
//function for Image Search
async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = "";
    }
    //Mapping the results from Unsplash
    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    })
    //Show more pages
    page++;
    if(page > 1){
        showMore.style.display = "block";
    }
}
//function for Submit
formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});
//function for the Search button
showMore.addEventListener("click", () => {
    searchImages();
});

// Check the screen width and toggle navigation accordingly
function toggleNavigation() {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const burgerMenu = document.getElementById('burger-menu');
    const dropdown = document.getElementById('dropdown');
    
    if (screenWidth <= 768) {
        burgerMenu.style.display = 'flex';
        dropdown.style.display = 'none';
    } else {
        burgerMenu.style.display = 'none';
        dropdown.style.display = 'flex';
    }
}

// Toggle navigation initially and on window resize
toggleNavigation();
window.addEventListener('resize', toggleNavigation);

// Toggle dropdown on burger menu click
document.getElementById('burger-menu').addEventListener('click', function () {
    const dropdown = document.getElementById('dropdown');
    dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
});

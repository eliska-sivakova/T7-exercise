const baseLink = "https://eliskasivakova.com/KEA/2-semester/wpv1/wp-json/wp/v2/";
const template = document.querySelector("template").content;
const parent = document.querySelector("main");
const catNav = document.querySelector("#cat-nav");
const urlParams = new URLSearchParams(window.location.search);
const catID = urlParams.get("cat");

        function loadCats() {
            fetch(baseLink + "categories?per_page=15").then(e => e.json()).then(buildCatMenu);
        }
        function loadByCat(cat) {
            fetch(baseLink + "band?categories=" + cat + "&_embed").then(e => e.json()).then(show);
        }
        function loadAll() {
            fetch(baseLink + "band?_embed").then(e => e.json()).then(show);
        }
        loadCats()
        if (catID) {
            loadByCat(catID)
        } else {
            loadAll()
        }
        function buildCatMenu(cats) {
            cats.forEach(cat => {
                const newA = document.createElement("a");
                newA.textContent = cat.name;
                newA.href = "?cat=" + cat.id;
                catNav.appendChild(newA);
            })
        }

function show(data) {
    data.forEach(post => {
        console.log(post);

        // clone the template
        const clone = template.cloneNode(true);

        //populate it
        const h1 = clone.querySelector("h1");
        const members = clone.querySelector(".members");

        const image = clone.querySelector(".images");

        h1.textContent = post.band_name;
        members.innerHTML = post.members;

        image.src = post._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;

        clone.querySelector("a").href = "sub-page.html?id=" + post.id;

        //append to DOM
        parent.appendChild(clone)
    })
}



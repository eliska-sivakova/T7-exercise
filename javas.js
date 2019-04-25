let myLink = "https://eliskasivakova.com/KEA/2-semester/wpv1/wp-json/wp/v2/band?_embed";
const template = document.querySelector("template").content;
const parent = document.querySelector("main");

function loadData(link) {
    fetch(link).then(e => e.json()).then(data => show(data));
}

function show(data) {
    data.forEach(post => {
         console.log(post);

        // clone the template
        const clone = template.cloneNode(true);

        //populate it
        const h1 = clone.querySelector("h1");
        const genres = clone.querySelector(".genres");
        const members = clone.querySelector(".members");

        const image = clone.querySelector(".images");

        h1.textContent=post.band_name.rendered;
        genres.innerHTML=post.genre;
        members.innerHTML=post.members;

        image.src = post._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;

        clone.querySelector("a").href = "sub-page.html?id=" + post.id;

        //append to DOM
        parent.appendChild(clone)
    })
}

loadData(myLink);

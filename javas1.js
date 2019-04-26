const baseLink = "https://eliskasivakova.com/KEA/2-semester/wpv1/wp-json/wp/v2/band/";

const params = new URLSearchParams(window.location.search);
const bandID = params.get("id");

fetch(baseLink + bandID + "?_embed").then(e => e.json()).then(showBands);

function showBands(data) {
    document.querySelector(".country").textContent = data.country;
    document.querySelector(".albums").textContent = data.studio_albums;
    document.querySelector(".song").textContent = data.favorite_song;
    document.querySelector("img").src = data._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
}

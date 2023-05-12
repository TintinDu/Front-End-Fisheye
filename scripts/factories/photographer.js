/* eslint-disable no-unused-vars */
function photographerFactoryHomepage(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');
    const link = document.createElement('a');
    const img = document.createElement('img');
    link.setAttribute("href", `photographer.html?id=${id}`);
    link.setAttribute("aria-label", name);
    img.setAttribute("src", picture);
    img.setAttribute("alt", "");
    img.className = "photographer__portrait";
    const h2 = document.createElement('h2');
    h2.textContent = name;
    const p1 = document.createElement('p');
    p1.textContent = city + ", " + country;
    p1.className = "photographer__location";
    const p2 = document.createElement('p');
    p2.textContent = tagline;
    p2.className = "photographer__tagline";
    const p3 = document.createElement('p');
    p3.textContent = price + "€/jour";
    p3.className = "photographer__price";
    article.appendChild(link);
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(p1);
    article.appendChild(p2);
    article.appendChild(p3);
    return (article);
  }
  return { name, picture, getUserCardDOM };
}

function photographerFactoryPhotographer(data) {

  const { name, portrait, city, price, country, tagline} = data.photographer;
  const picture = `assets/photographers/${portrait}`;

  function getUserHeaderDOM() {
    const flexbox = document.createElement('div');
    const personalInformationsDiv = document.createElement('div');
    const h1 = document.createElement('h1');
    h1.textContent = name;
    h1.className = "photographer__name";
    const p1 = document.createElement('p');
    p1.textContent = city + ", " + country;
    p1.className = "photographer__location";
    const p2 = document.createElement('p');
    p2.textContent = tagline;
    p2.className = "photographer__tagline";

    personalInformationsDiv.appendChild(h1);
    personalInformationsDiv.appendChild(p1);
    personalInformationsDiv.appendChild(p2);

    flexbox.appendChild(personalInformationsDiv);

    return (flexbox);
  }

  function getUserAvatar() {
    const img = document.createElement('img');
    img.setAttribute("src", picture);
    img.setAttribute("alt", "");
    img.className = "photographer__portrait";
    return (img);
  }

  function getUserPrice() {
    const p = document.createElement('p');
    p.textContent = `${price}€ / jour`;
    p.className = "price";
    return (p);
  }

  return { name, picture, getUserHeaderDOM, getUserAvatar, getUserPrice };
}
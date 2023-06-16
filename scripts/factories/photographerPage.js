const photographerFactoryPhotographer = data => {

  const { name, portrait, city, price, country, tagline} = data.photographer;
  const picture = `./assets/photographers/${portrait}`;
  const photographerMedias = data.photographerMedia;

  const likes = photographerMedias.reduce((acc, media) => {
    return acc + media.likes;
  }, 0);

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
    img.setAttribute("alt", `${name}'s portrait`);
    img.className = "photographer__portrait";
    return (img);
  }

  function getUserPrice() {
    const p = document.createElement('p');
    p.textContent = `${price}€ / jour`;
    p.className = "price";
    return (p);
  }

  function getUserLikes() {
    const div = document.createElement('div');
    div.className = "likes__total";
    const p = document.createElement('p');
    const heart = document.createElement('img');
    div.appendChild(p);
    div.appendChild(heart);
    p.textContent = likes;
    p.className = "total-likes";
    heart.src = "./assets/icons/heart.svg";
    heart.alt = "total likes";
    return (div);
  }

  return { name, picture, getUserHeaderDOM, getUserAvatar, getUserPrice, getUserLikes};
};


export default photographerFactoryPhotographer;
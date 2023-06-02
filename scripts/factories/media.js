/* eslint-disable no-unused-vars */
function mediaFactory(data) {
  const {name} = data.photographer;
  const medias = data.photographerMedia;

  function filterOnlyImages(data) {
    if (data.image) {
      return true;
    } else {
      return false;
    }
  }

  function filterOnlyVideos(data) {
    if(data.video) {
      return true;
    } else {
      return false;
    }
  }

  const images = medias.filter(filterOnlyImages);
  const videos = medias.filter(filterOnlyVideos);

  const imgs = images.map((image) => {
    image.authorName = name;
    return (image);
  });

  const imageArticles = images.map((image) => {
    const imageArticle = document.createElement('article');
    const div = document.createElement('div');
    const miniDiv = document.createElement('div');
    const imageName = image.image;
    const imageTitle = image.title;
    const imagePath = `assets/images/${name}/${imageName}`;
    const img = document.createElement('img');
    const title = document.createElement('h3');
    const heart = document.createElement('img');
    const likes = document.createElement('p');
    likes.innerText = image.likes;
    miniDiv.className = "media__likes";
    heart.setAttribute("src", "assets/icons/heart.svg");
    title.textContent = imageTitle;
    title.className = "media__title";
    div.className = "title__container";
    img.setAttribute("src", imagePath);
    img.setAttribute("alt", `open lightbox for ${image.title}`);
    img.setAttribute("id", image.id);
    img.setAttribute("name", imageTitle);
    img.style.cursor = "pointer";
    img.className = "photographer__media";
    imageArticle.className = "media__container";
    imageArticle.appendChild(img);
    imageArticle.appendChild(div);
    div.appendChild(title);
    div.appendChild(miniDiv);
    miniDiv.appendChild(likes);
    miniDiv.appendChild(heart);
    return (imageArticle);
  });



  const vids = videos.map((video) => {
    video.authorName = name;
    return (video);
  });

  const videoArticles = videos.map((video) => {
    const videoArticle = document.createElement('article');
    const div = document.createElement('div');
    const miniDiv = document.createElement('div');
    const videoName = video.video;
    const videoTitle = video.title;
    const videoPath =`assets/images/${name}/${videoName}`;
    const vid = document.createElement('video');
    const title = document.createElement('h3');
    const heart = document.createElement('img');
    const likes = document.createElement('p');
    likes.innerText = video.likes;
    miniDiv.className = "likes";
    heart.setAttribute("src", "assets/icons/heart.svg");
    title.textContent = videoTitle;
    title.className = "media__title";
    div.className = "title__container";
    const source = document.createElement('source');
    source.setAttribute("src", videoPath);
    source.setAttribute("type", "video/mp4");
    // problème, on ne peut plus lire la vidéo depuis la fiche photographe sans ouvrir la modale
    // vid.setAttribute("controls", "controls");
    vid.setAttribute("id", video.id);
    vid.setAttribute("title", videoTitle);
    source.setAttribute("id", `${video.id}source`);
    vid.appendChild(source);
    vid.style.cursor = "pointer";
    vid.setAttribute("aria-label", `open lightbox for ${videoTitle}`);
    vid.className = "photographer__media";
    videoArticle.className = "media__container";
    videoArticle.appendChild(vid);
    videoArticle.appendChild(div);
    div.appendChild(title);
    div.appendChild(miniDiv);
    miniDiv.appendChild(likes);
    miniDiv.appendChild(heart);

    return (videoArticle);
  });

  function getUserPhotographArticles() {
    return (imageArticles);
  }
  function getUserVideoArticles() {
    return (videoArticles);
  }


  return { name, imgs, vids, getUserPhotographArticles, getUserVideoArticles };
}
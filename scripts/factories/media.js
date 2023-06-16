export default function mediaFactory(data) {
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

  const mediaArticles = medias.map((media) => {
    const mediaArticle = document.createElement('article');
    const div = document.createElement('div');
    const miniDiv = document.createElement('div');

    if(!media.video) {
      const imageName = media.image;
      const imageTitle = media.title;
      const imagePath = `./assets/images/${name}/${imageName}`;
      const img = document.createElement('img');
      const title = document.createElement('h3');
      const heart = document.createElement('img');
      const likes = document.createElement('p');
      likes.innerText = media.likes;
      likes.className = "media__number";
      miniDiv.className = "media__likes";
      heart.setAttribute("src", "./assets/icons/heart.svg");
      heart.className = "media__heart";
      heart.id = `heart${media.id}`;
      heart.alt = `click to like ${media.title}`;
      title.textContent = imageTitle;
      title.className = "media__title";
      div.className = "title__container";
      img.setAttribute("src", imagePath);
      img.setAttribute("alt", `open lightbox for ${media.title}`);
      img.setAttribute("id", media.id);
      img.setAttribute("name", imageTitle);
      img.style.cursor = "pointer";
      img.className = "photographer__media";
      img.setAttribute("tabIndex", "0");
      mediaArticle.className = "media__container";
      mediaArticle.appendChild(img);
      mediaArticle.appendChild(div);
      div.appendChild(title);
      div.appendChild(miniDiv);
      miniDiv.appendChild(likes);
      miniDiv.appendChild(heart);
      return (mediaArticle);

    }

    if(media.video) {
      const videoName = media.video;
      const videoTitle = media.title;
      const videoPath =`./assets/images/${name}/${videoName}`;
      const vid = document.createElement('video');
      const title = document.createElement('h3');
      const heart = document.createElement('img');
      const likes = document.createElement('p');
      likes.innerText = media.likes;
      likes.className = "media__number";
      miniDiv.className = "media__likes";
      heart.setAttribute("src", "./assets/icons/heart.svg");
      heart.className = "media__heart";
      heart.id = `heart${media.id}`;
      heart.alt = `click to like ${media.title}`;
      title.textContent = videoTitle;
      title.className = "media__title";
      div.className = "title__container";
      const source = document.createElement('source');
      source.setAttribute("src", videoPath);
      source.setAttribute("type", "video/mp4");
      vid.setAttribute("id", media.id);
      vid.setAttribute("title", videoTitle);
      source.setAttribute("id", `${media.id}source`);
      vid.appendChild(source);
      vid.style.cursor = "pointer";
      vid.setAttribute("aria-label", `open lightbox for ${videoTitle}`);
      vid.setAttribute("tabIndex", "0");
      vid.className = "photographer__media";
      mediaArticle.className = "media__container";
      mediaArticle.appendChild(vid);
      mediaArticle.appendChild(div);
      div.appendChild(title);
      div.appendChild(miniDiv);
      miniDiv.appendChild(likes);
      miniDiv.appendChild(heart);
      return (mediaArticle);
    }


  });

  const vids = videos.map((video) => {
    video.authorName = name;
    return (video);
  });

  function getUserMediaArticles() {
    return (mediaArticles);
  }

  return { name, imgs, vids, medias, getUserMediaArticles };
}
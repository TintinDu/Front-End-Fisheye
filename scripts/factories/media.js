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
    const imageArticle = document.createElement('article');
    const div = document.createElement('div');
    const imageName = image.image;
    const imageTitle = image.title;
    const imagePath = `assets/images/${name}/${imageName}`;
    const img = document.createElement('img');
    const link = document.createElement('a');
    const title = document.createElement('h3');
    title.textContent = imageTitle;
    img.setAttribute("src", imagePath);
    img.setAttribute("alt", image.title);
    link.setAttribute("href", "#");
    link.setAttribute("aria-label", `open ligthbox for ${image.title}`);
    img.className = "photographer__media";
    imageArticle.className = "media__container";
    link.appendChild(img);
    imageArticle.appendChild(link);
    imageArticle.appendChild(div);
    div.appendChild(title);
    return (imageArticle);
  });

  const vids = videos.map((video) => {
    const videoArticle = document.createElement('article');
    const div = document.createElement('div');
    const videoName = video.video;
    const videoTitle = video.title;
    const videoPath =`assets/images/${name}/${videoName}`;
    const vid = document.createElement('video');
    const link = document.createElement('a');
    const title = document.createElement('h3');
    title.textContent = videoTitle;
    const source = document.createElement('source');
    source.setAttribute("src", videoPath);
    source.setAttribute("type", "video/mp4");
    vid.setAttribute("controls", "controls");
    vid.appendChild(source);
    link.setAttribute("href", "#");
    link.setAttribute("aria-label", `open ligthbox for ${video.title}`);
    vid.className = "photographer__media";
    videoArticle.className = "media__container";
    link.appendChild(vid);
    videoArticle.appendChild(link);
    videoArticle.appendChild(div);
    div.appendChild(title);
    return (videoArticle);
  });

  function getUserPhotographs() {
    return (imgs);
  }
  function getUserVideos() {
    return (vids);
  }
  return { name, imgs, vids, getUserPhotographs, getUserVideos };
}
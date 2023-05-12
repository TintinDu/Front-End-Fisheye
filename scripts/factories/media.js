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
    const imageName = image.image;
    const imagePath = `assets/images/${name}/${imageName}`;
    const img = document.createElement('img');
    img.setAttribute("src", imagePath);
    img.setAttribute("alt", image.title);
    img.className = "photographer__media";
    return (img);
  });

  const vids = videos.map((video) => {
    const videoName = video.video;
    const videoPath =`assets/images/${name}/${videoName}`;
    const vid = document.createElement('video');
    const source = document.createElement('source');
    source.setAttribute("src", videoPath);
    source.setAttribute("type", "video/mp4");
    vid.setAttribute("controls", "controls");
    vid.appendChild(source);
    vid.className = "photographer__media";
    return (vid);
  });

  function getUserPhotographs() {
    return (imgs);
  }
  function getUserVideos() {
    return (vids);
  }
  return { name, imgs, vids, getUserPhotographs, getUserVideos };
}
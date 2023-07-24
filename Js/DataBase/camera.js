/* Перемещение камеры в середину холста */

let camWidth = null;
let camHeight = null;

function blockScroll()
{
  camWidth = document.querySelector(".blockScroll").clientWidth;
  camHeight = document.querySelector(".blockScroll").clientHeight;

  document.getElementById("blockScroll").scrollLeft = (canvasWidth / half) - (camWidth / half);
  document.getElementById("blockScroll").scrollTop = (canvasHeight / half) - (camHeight / half);
}
blockScroll();
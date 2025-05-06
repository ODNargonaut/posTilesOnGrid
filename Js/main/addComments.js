
// Вставляет комментарий в очередь
function addComments(key)
{
  if (comments.active)
  {
    let text = document.getElementById("InpAddCom");
    
    palette.tiles.get(palette.currentList)[1].get(key).comments.begin = text.value;
    palette.tiles.get(palette.currentList)[1].get(key).comments.end = "END";
  }
}
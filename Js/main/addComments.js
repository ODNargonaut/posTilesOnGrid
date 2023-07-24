
// Вставляет комментарий в очередь
function addComments(key)
{
  if (comments.active)
  {
    let text = document.getElementById("InpAddCom");
    
    palette.tiles.get(key).comments.begin = text.value;
    palette.tiles.get(key).comments.end = "END";
  }
}
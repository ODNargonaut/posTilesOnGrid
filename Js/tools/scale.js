// блокируем колесико, чтобы полосы прокрутки не реагировали на него
//document.getElementById('body').onwheel = function () { return false; }
//window.addEventListener("wheel", e => e.preventDefault(), { passive:false }) 

document.addEventListener("wheel", wheel, false);

// 
function wheel(e)
{
  if (mouse.onCanvas && update.active)
  {
    mouse.wheel.direction = Math.sign(e.deltaY);

    if (wheelDirection() && camera.scale.distanceZoomIn < camera.scale.max)
    {
      camera.scale.distanceZoomIn += camera.scale.n.n;      
      cellSZNotFrame += camera.scale.n.n;

      if (camera.scale.distanceZoomIn < camera.scale.max && 0);  // ноль сдесь просто так,
                                                                 // это нужно для того чтобы
                                                                 // избежать дублирования кода
      else if (camera.psX.end-camera.scale.n.last.w == camera.default.min.w
               && 
               camera.psY.end-camera.scale.n.last.h == camera.default.min.h)
      {
        camera.psX.end -= camera.scale.n.last.w;
        camera.psY.end -= camera.scale.n.last.h;
      }
      else
      {        
        camera.psX.end -= camera.scale.n.w;
        camera.psY.end -= camera.scale.n.h;
      }
    }
    else if (!wheelDirection() && camera.scale.distanceZoomIn > camera.scale.min)
    {
      camera.scale.distanceZoomIn -= camera.scale.n.n;
      cellSZNotFrame -= camera.scale.n.n;

      if (camera.scale.distanceZoomIn > camera.scale.min && 0);  // ноль сдесь просто так,
                                                                 // это нужно для того чтобы
                                                                 // избежать дублирования кода
      else if (camera.psX.end+camera.scale.n.last.w == camera.default.max.w
               && 
               camera.psY.end+camera.scale.n.last.h == camera.default.max.h)
      {
        camera.psX.end += camera.scale.n.last.w;
        camera.psY.end += camera.scale.n.last.h;
      }
      else
      {
        camera.psX.end += camera.scale.n.w;
        camera.psY.end += camera.scale.n.h;
      }
    }

    palette.scale = camera.scale.distanceZoomIn;

    camera.w = camera.psX.end;
    camera.h = camera.psY.end;

    // console.log("camera.scale: "+camera.scale.distanceZoomIn);
    // console.log("camera.psX.end = "+camera.psX.end);
    // console.log("camera.psY.end = "+camera.psY.end);
  }
}

// 
function wheelDirection()
{
  if (mouse.wheel.direction > zero)
    return true;
  else if (mouse.wheel.direction < zero)
    return false;
}

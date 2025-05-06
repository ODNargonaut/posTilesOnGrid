
// Удалить слой
function deleteLayer(check, n)
{
  let key = ""+n;
  let list = null;
  if (check == "gridObj")
  {
    list = gridObjs.listObjs;
    gridObjs.delLayerGrid = true;
  }
  else if (check == "pallete") 
  {
    list = palette.tiles;
    palette.delLayerGrid = true;
  }
  
  if (list.has(key))
  {
    list.delete(key);

    if (check == "pallete")
      buffer.objs.delete(key);
  }
}


// Вывести все объектные слои.
function getLayersObj(mainTeg=layersObj.mainTeg, tilesLayer=false)
{
  if (gridObjs.listObjs.size > 0 && !tilesLayer || typeof tilesLayer == 'object' && tilesLayer.size > 0)
  {
    document.getElementById(mainTeg).innerHTML = "";

    let lObj = () => 
    {
      if (tilesLayer)
        return tilesLayer;
      return gridObjs.listObjs.values();
    };

    for (let v of lObj())
    {
      let r = !tilesLayer?v.R:0;
      let g = !tilesLayer?v.G:0;
      let b = !tilesLayer?v.B:0;
      let hex = !tilesLayer?v.hex:0;

      let n = !tilesLayer?v.N:v[0];
      let titleRu = () => 
      { 
        if (tilesLayer)
          return v[one][zero][0].toUpperCase() + v[one][zero].slice(one);
        return v.ru.title[zero].toUpperCase() + v.ru.title.slice(one);
      }
      let titleEn = !tilesLayer?v.en.title:"";

      let teg = document.createElement("tr");
      teg.setAttribute("class", "trCur");
      let funclick = () => 
      {
        if (tilesLayer)
          return "palette.selectTilesList("+n+", true)";
        return "selectedObj({layer: 1, pixel: {R: "+r+", G: "+g+", B: "+b+", hex: '"+hex+"'}, obj: {N: '"+n+"', ru: {title: '"+titleRu()+"'}, en: {title: '"+titleEn+"'}}})";
      };
      teg.setAttribute("onclick", funclick());        

      let setTd = (o) => 
      {
        let teg = document.createElement("td");
        
        if (o.b == 0)
        {
          teg.setAttribute("align", "center");
          if (tilesLayer && o.del && n != "0" && palette.currentList != n ||  // "0" - нулевой слой сетки
              !tilesLayer && o.del && layersObj.reservedNums(+n, gridObjs.byDefault.reservedNums) && gridObjs.selected.N+"" != n)
          {
            o.text = "X";
            teg.setAttribute("class", "tdCurDel");
            teg.setAttribute("title", "Delete layer");
            let s = "";
            if (tilesLayer) s = "'pallete'";
            else s = "'gridObj'";
            teg.setAttribute("onclick", "deleteLayer("+s+", "+n+")");
          }
          teg.setAttribute("width", ""+o.w);

          let content = document.createTextNode(""+o.text);
          teg.appendChild(content);
        }
        else if (o.b == 1)
        {
          teg.setAttribute("class", "space");
        }

        return teg;
      }

      let addLayer = (space=0) => 
      {
        if (space)
          teg = document.createElement("tr");
        
        let rgb = r+" "+g+" "+b;
        let counter = 0;

        if (titleRu().length > layersObj.maxSZTitle)
        {
          counter = titleRu().length-layersObj.maxSZTitle;
          layersObj.sizeBlockLayer += counter*5;
          document.getElementById(tilesLayer?"blListLayersGrid":"listLayers").style.width = layersObj.sizeBlockLayer+"px";
        }

        // delete
        teg.appendChild(setTd( !space ? {w:20, text:".", b:0, del:1} : {w:"", text:"", b:1} ) );
        
        teg.appendChild(setTd( !space ? {w:100, text:n, b:0, del:0} : {w:"", text:"", b:1} ) );
        teg.appendChild(setTd( !space ? {w:counter*15+650, text:titleRu(), b:0, del:0} : {w:"", text:"", b:1} ) );

        if (!tilesLayer)
          teg.appendChild(setTd( !space ? {w:100, text:rgb, b:0, del:0} : {w:"", text:"", b:1} ) );

        document.getElementById(mainTeg).appendChild(teg);
      };

      addLayer();
      addLayer(1);
    }
  }
}


// 
function setObjTitleAndNum(o, clr=false)
{
  gridObjs.selected.N = o.N;
  gridObjs.selected.ru.title = o.ru.title;
  gridObjs.selected.en.title = o.en.title;

  gridObjs.listObjs.set(""+o.N, 
  {
    R: clr?clr.R:palette.color.R,
    G: clr?clr.G:palette.color.G,
    B: clr?clr.B:palette.color.B,
    hex: clr?clr.hex:palette.color.current,
    N: o.N,
    ru: { title: o.ru.title },
    en: { title: o.en.title }
  });
}

// По умолчанию рисуем "Стену" и "Пустое пространство".
setObjTitleAndNum(
  {N: gridObjs.byDefault.Wall.N, 
   ru: { title: gridObjs.byDefault.Wall.ru.title },
   en: { title: gridObjs.byDefault.Wall.en.title },
  }, 
  {
    R: gridObjs.byDefault.Wall.color.R, 
    G: gridObjs.byDefault.Wall.color.G, 
    B: gridObjs.byDefault.Wall.color.B, 
    hex: gridObjs.byDefault.Wall.color.hex
  });

setObjTitleAndNum(
  {N: gridObjs.byDefault.EMPTYSPACE.N, 
   ru: { title: gridObjs.byDefault.EMPTYSPACE.ru.title },
   en: { title: gridObjs.byDefault.EMPTYSPACE.en.title },
  }, 
  {
    R: gridObjs.byDefault.EMPTYSPACE.color.R, 
    G: gridObjs.byDefault.EMPTYSPACE.color.G, 
    B: gridObjs.byDefault.EMPTYSPACE.color.B, 
    hex: gridObjs.byDefault.EMPTYSPACE.color.hex
  });


gridObjs.selected.N = gridObjs.byDefault.Wall.N;
gridObjs.selected.ru.title = gridObjs.byDefault.Wall.ru.title;
gridObjs.selected.en.title = gridObjs.byDefault.Wall.en.title;
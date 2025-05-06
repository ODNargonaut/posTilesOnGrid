/* Данный класс отвечает за сохранение, экспорт и импорт данных */


// 
class FileData
{
  url = "./php/check.php";
  command = "";

  objData = { tiles: [], listObjs: []};


  // 
  construct() { }

  // 
  actionCommand(command)
  {
    switch(command)
    {
      case "save":   this.saveDt();   break;
      case "import": this.importDt(); break;
      case "export": this.exportDt(); break;
    }
  }

  // 
  extractData()
  {
    let i = 0;
    
    // Grids and pixels
    for (let kG of palette.tiles.keys())
    {
      i = 0;

      let vG = palette.tiles.get(kG);

      let gridObj = 
      {
        n: kG, 
        grid: 
        {
          title: vG[0], 
          pixel: []
        }
      };

      for (let kPixel of vG[1].keys())
      {
        let vPixel = vG[1].get(kPixel);

        gridObj.grid.pixel[i] = 
        {
          k: kPixel,
          v: 
          {
            keyOnGrid:  // чтобы было проще искать ключ на сетке
            {
              x: vPixel.keyOnGrid.x, 
              y: vPixel.keyOnGrid.y
            },
            pixel: 
            { 
              w: vPixel.pixel.w, 
              h: vPixel.pixel.h, 
              hex: vPixel.pixel.hex, 
              R: vPixel.pixel.R,
              G: vPixel.pixel.G,
              B: vPixel.pixel.B, 
            },
            upperLeftCornerOfGrid:  // в какой позиции на сетке находится ключ
            { 
              x: vPixel.upperLeftCornerOfGrid.org.x, 
              y: vPixel.upperLeftCornerOfGrid.org.y,
              org: 
              {
                x: vPixel.upperLeftCornerOfGrid.org.x, 
                y: vPixel.upperLeftCornerOfGrid.org.y
              }
            },
            world: 
            {
              x: vPixel.world.x, 
              y: vPixel.world.y
            },
            obj: 
            {
              N: vPixel.obj.N,
              ru: 
              {
                title: vPixel.obj.ru.title,
                descript: vPixel.obj.ru.descript
              },
              en: 
              {
                title: vPixel.obj.en.title,
                descript: vPixel.obj.en.descript
              }
            }
          }
        };

        i++
      }

      this.objData.tiles.push(gridObj);
    }

    i = 0;
    // listObjs
    for (let k of gridObjs.listObjs.keys())
    {
      let v = gridObjs.listObjs.get(k);

      this.objData.listObjs[i] = 
      {
        k: k,
        v:
        {
          R: v.R,
          G: v.G,
          B: v.B,
          hex: v.hex,
          N: v.N,
          ru: { title: v.ru.title },
          en: { title: v.en.title }
        }
      };

      i++;
    }
  }

  // 
  saveDt()
  {
    saveExpImp.active = true;
    this.command = "saveData";
    this.ajaxRequest();

    this.reset();
  }

  // 
  importDt()
  {
    saveExpImp.active = true;
    this.command = "importData";
    this.ajaxRequest();

    this.reset();
  }

  exportDt()
  {
    saveExpImp.active = true;
    this.command = "exportData";
    this.ajaxRequest();

    this.reset();
  }

  // 
  reset()
  {
    this.objData.tiles = [];
    this.objData.listObjs = [];
  }


  // 
  request(data)
  {    
    let nf = (this.command==="importData" || this.command==="exportData" ? NAMEFILEFORIMPEXP : NAMEFILEFORSAVE);

    NAMEFILEFORIMPEXP = "";

    return {
      url: this.url,
      method: "POST",
      data: 
      {
        command: this.command,
        nameFile: nf,
        json: (this.command==="importData" ? "" : JSON.stringify(data))
      }
    };
  }

  // 
  ajaxRequest()
  {
    document.getElementById("fileCommands").style.display = "none";
    document.getElementById("sendingAndResponding").style.display = "block";

    $("#pause").removeClass("hidden");
    $("#receiveAnswer").empty();
    $("#pause").html("Выполняется отправка данных...");

    if (this.command !== "importData")
    {
      this.extractData();
    }

    $.ajax(this.request(this.objData)).done((answer) =>
    {
      // Получаем ответ от PHP
      $("#pause").html("").addClass("hidden");

      if (this.command !== "importData")
        this.showAnswer(answer);
      else if (this.command === "importData")
        this.pasteReceiveAnswer(answer);
    });
  }

  // 
  checkErrors(answer)
  {
    switch(answer)
    {
      case OK:                return {s:"<span style='color: #00FF00;'>Данные получены!</span>",            e: true};
      case OKW:               return {s:"<span style='color: #00FF00;'>Данные успешно сохранены!</span>",   e: true};
      case EINCORRECTCOMMAND: return {s:"<span style='color: #FF1C00;'>Error: Неверная команда!</span>",    e: true};
      case ENOJSON:           return {s:"<span style='color: #FF1C00;'>Error: Нет json переменной!</span>", e: true};
      case EWRITE:            return {s:"<span style='color: #FF1C00;'>Error: Данные не записаны!</span>",  e: true};
      case EREAD:             return {s:"<span style='color: #FF1C00;'>Error: Неполучилось прочесть данные</span>", e: true};
      case ""+ELEN:           return {s:"<span style='color: #FF1C00;'>Error: Файл пустой</span>",          e: true};
      case EOPENFILE:         return {s:"<span style='color: #FF1C00;'>Error: Не получилось открыть файл</span>", e: true}
    }

    return false;
  }

  // 
  showAnswer(answer)
  {
    let err = this.checkErrors(answer);

    $("#receiveAnswer").html(!err.e?answer:err.s);

    saveExpImp.active = false;
  }

  // Вставить полученный ответ
  pasteReceiveAnswer(answer)
  {
    let err = this.checkErrors(answer);

    $("#receiveAnswer").html(answer)

    if (!err.e)
    {
      // Очищаем перед импортом!
      palette.currentList = "0",
      palette.tiles.clear();
      gridObjs.listObjs.clear();

      let tiles = JSON.parse(answer).tiles;
      let arrObjs = JSON.parse(answer).listObjs;

      // Grids and pixels
      for (let i = 0, layerG = palette.tiles.size; i < tiles.length; i++, layerG++)
      {
        let keyG = ""+layerG;
        let titleG = tiles[i].grid.title;

        palette.tiles.set(keyG, [titleG, new Map()]);

        buffer.objs.set(keyG, []);

        for (let p = 0; p < tiles[i].grid.pixel.length; p++)
        {
          let pixel = tiles[i].grid.pixel[p];
          palette.tiles.get(keyG)[1].set(pixel.k, pixel.v);
        }
      }

      palette.selectTilesList(+palette.currentList, true);


      // listObjs
      for (let i = 0; i < arrObjs.length; i++)
      {
        gridObjs.listObjs.set(arrObjs[i].k, arrObjs[i].v);
      }

      $("#receiveAnswer").html("<span style='color: #00FF00;'>Данные успешно импортированны!</span>");
    }
    else 
      $("#receiveAnswer").html(err.s);

    saveExpImp.active = false;
  }
}

let filedt = new FileData();

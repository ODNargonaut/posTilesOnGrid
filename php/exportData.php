<?php

class ExportData
{
  private $dir = "./export/";
  private $file = "";
  private $data = [];

  private $forWhom = "decorField";  // Для кого делаем?

  
  // 
  public function __construct($data)
  {
    global $NOJSON;
    sleep(1);
    
    $this->file = $data["nameFile"];
    fclose(fopen($this->dir.$this->file, "w+t"));  // создать или очистить файл перед записью.

    if (isset($data["json"]))
    {
      $this->processing($data["json"]);
    }
    else echo $NOJSON;
  }

  // Обработка полученных данных в желаемый вид
  private function processing($json)
  { 
    $arrGrid = json_decode($json, true)["tiles"];

    for ($g = 0; $g < count($arrGrid); $g++)
    {
      $this->data[$g] = [];
      for ($p = 0; $p < count($arrGrid[$g]["grid"]["pixel"]); $p++)
      {
        $v = $arrGrid[$g]["grid"]["pixel"][$p]["v"];

        $this->data[$g][$p] = [];

        $this->data[$g][$p]["ULCG-x"] = $v["upperLeftCornerOfGrid"]["org"]["x"];
        $this->data[$g][$p]["ULCG-y"] = $v["upperLeftCornerOfGrid"]["org"]["y"];

        $this->data[$g][$p]["N"] = $v["obj"]["N"];

        $this->data[$g][$p]["enTitle"]    = $v["obj"]["en"]["title"];
        $this->data[$g][$p]["enDescript"] = $v["obj"]["en"]["descript"];
      }
    }

    $this->preparationAndExp();
  }

  // Подготовка и экспорт данных
  private function preparationAndExp()
  {
    if (strlen($this->forWhom) > 0)
    {
      $fd = null;
      if (($fd = fopen($this->dir.$this->file, "a+t")) !== false)
      {
        switch($this->forWhom)
        {
          case "maze":       $this->preparationAndExpForMaze($fd);       break;
          case "decorField": $this->preparationAndExpForDecroField($fd); break;
        }

        fclose($fd);
        echo "205";
      }
      else 
        echo "E58";
    }
  }


  // Для проекта "Snake 2D" в режиме maze.
  private function preparationAndExpForMaze($fd)
  {
    $pointEntrance = [];  // точка входа змейки на холсте

    $this->fileWrite($fd, "[\n".$this->space(2));

    for ($g = 0, $pEntr = 0; $g < count($this->data); $g++)
    {
      $this->fileWrite($fd, "new Map(\n".$this->space(2)."[\n".$this->space(4));

      for ($p = 0; $p < count($this->data[$g]); $p++)
      {
        $ULCG_x = $this->data[$g][$p]["ULCG-x"]-1;
        $ULCG_y = $this->data[$g][$p]["ULCG-y"]-1;
        // $N = $this->data[$g][$p]["N"];
        $enTitle = strtolower($this->data[$g][$p]["enTitle"]);
        $enDescript = strtoupper($this->data[$g][$p]["enDescript"]);

        // if ($enTitle == "border") continue;

        if ($enTitle == "entrance")
        {
          $pointEntrance[$pEntr] = [];
          $pointEntrance[$pEntr][0] = (int)$ULCG_x;
          $pointEntrance[$pEntr][1] = (int)$ULCG_y;
          $pointEntrance[$pEntr][2] = $enDescript;
          $pEntr++;
        }

        $key = "\"".$ULCG_x."|".$ULCG_y."\", ";

        // $imgSrc = "imgSrc:";
        // switch($enTitle)
        // {
        //   case "wall":     $imgSrc .= "\"./img/snake/wall.png\"";     break;
        //   case "entrance": $imgSrc .= "\"./img/snake/entrance.png\""; break;
        //   case "exit":     $imgSrc .= "\"./img/snake/exit.png\"";     break;
        // }
        // $imgSrc .= ", ";

        $title = "title:\"".$enTitle."\", ";

        $x = "x:".$ULCG_x.", ";
        $y = "y:".$ULCG_y.", ";
        $direct = "direct:DDOWN, ";
        $exit = "exit:".($enTitle=="exit"?"true":"false");
        $pointExit = "";

        if ($enTitle == "exit")
        {
          $pointExit = "pointExit:";
          if ($enDescript == "DLEFT" || $enDescript == "DUP" || $enDescript == "DDOWN")
            $pointExit .= "0";
          else if ($enDescript == "DRIGHT")
            $pointExit .= "1";
        }

        $str = "[".$key."{".$title.$x.$y.$direct.$exit.(strlen($pointExit)>0?", ".$pointExit:"")."}]";

        $this->fileWrite($fd, $str.($p < count($this->data[$g])-1 ? ",\n".$this->space(4): "\n"));
      }

      $this->fileWrite($fd, $this->space(2)."])".($g < count($this->data)-1 ? ",\n".$this->space(2):""));
    }

    $this->fileWrite($fd, "\n]\n\n\n");
      
    $sz = count($pointEntrance);
    for ($i = 0; $i < $sz; $i++)
    {
      $x = $pointEntrance[$i][0];
      $y = $pointEntrance[$i][1];
      $direct = $pointEntrance[$i][2];

      $ONE = 1;
      switch($direct)
      {
        case "DLEFT":  $x -= $ONE; break;
        case "DRIGHT": $x += $ONE; break;
        case "DUP":    $y -= $ONE; break;
        case "DDOWN":  $y += $ONE; break;
      }

      $x = "x: ".((string)$x).", ";
      $y = "y: ".((string)$y).", ";
      $direct = "direct: ".$direct;

      $this->fileWrite($fd, "{".$x.$y.$direct."}".($i < $sz-1 ? ",\n" : ""));
    }
  }


  // Для проекта "Snake 2D", оформление поля.
  private function preparationAndExpForDecroField($fd)
  {
    $startPoints = [];  // стартовая точка змейки на холсте

    $this->fileWrite($fd, $this->space(2)."return new Map(\n".$this->space(2)."[\n".$this->space(4)."[\n".$this->space(6)."\"arr\",\n".$this->space(6)."[\n");

    for ($g = 0; $g < count($this->data); $g++)
    {
      $startPoints[$g] = [];

      $this->fileWrite($fd, $this->space(8)."[\n");

      for ($p = 0, $sPoint=0; $p < count($this->data[$g]); $p++)
      {
        $ULCG_x = $this->data[$g][$p]["ULCG-x"]-1;
        $ULCG_y = $this->data[$g][$p]["ULCG-y"]-1;
        // $N = $this->data[$g][$p]["N"];
        $enTitle = strtolower($this->data[$g][$p]["enTitle"]);
        $enDescript = strtoupper($this->data[$g][$p]["enDescript"]);

        if ($enTitle == "startpoint")
        {
          $startPoints[$g][$sPoint] = [];
          $startPoints[$g][$sPoint][0] = (int)$ULCG_x;
          $startPoints[$g][$sPoint][1] = (int)$ULCG_y;
          $startPoints[$g][$sPoint][2] = $enDescript;
          $sPoint++;
        }

        if ($enTitle == "startpoint") continue;

        $title = "title:\"".$enTitle."\", ";

        $x = "x:".$ULCG_x.", ";
        $y = "y:".$ULCG_y;

        $str = "{".$title.$x.$y."}";

        $this->fileWrite($fd, $this->space(10).$str.($p < count($this->data[$g])-1 ? ",\n": "\n"));
      }

      $this->fileWrite($fd, $this->space(8)."]".($g < count($this->data)-1 ? ",\n":"\n"));
    }

    $this->fileWrite($fd, $this->space(6)."]\n".$this->space(4)."],\n".$this->space(4)."[\n".$this->space(6)."\"startPoint\",\n".$this->space(6)."[\n");

    // Star points
    for ($g = 0; $g < count($startPoints); $g++)
    {
      $this->fileWrite($fd, $this->space(8)."[\n");
      for ($p = 0; $p < count($startPoints[$g]); $p++)
      {
        $point = $startPoints[$g][$p];

        $x = "x:".$point[0].", ";
        $y = "y:".$point[1].", ";
        $direct = "direct:".$point[2];

        $str = "{".$x.$y.$direct."}";
        $this->fileWrite($fd, $this->space(10).$str.($p < count($startPoints[$g])-1 ? ",\n": "\n"));
      }
      $this->fileWrite($fd, $this->space(8)."]".($g < count($startPoints)-1 ? ",\n":"\n"));
    }

    $this->fileWrite($fd, $this->space(6)."]\n".$this->space(4)."]\n".$this->space(2)."]);");
  }

  // 
  private function fileWrite($fd, $str)
  {
    if (fwrite($fd, $str) === false) echo "E55"; 
  }

  // 
  private function space($n)
  {
    $SPACE = ' ';
    $s = "";
    for ($i = 0; $i < $n; $i++) $s .= $SPACE;
    return $s;
  }
}

?>
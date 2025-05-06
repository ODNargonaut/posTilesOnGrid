<?php

$INCORRECTCOMMAND = "E89";  // неверная команда
$NOJSON = "E34";            // нет json переменной

require_once "./saveData.php";
require_once "./importData.php";
require_once "./exportData.php";


switch($_POST["command"])
{
  case "saveData":   $o = new SaveData($_POST);   break;
  case "importData": $o = new ImportData($_POST); break;
  case "exportData": $o = new ExportData($_POST); break;
  default:
    echo $INCORRECTCOMMAND;
}

?>
<?php


$INCORRECTCOMMAND = "E89";  // неверная команда
$NOJSON = "E34";            // нет json переменной

$br = "<br />";

// Такие данные мы получим:
// Array
// (
//     [json] => {"text":"Осторожно небесное вторжение с незванными гостями НАЧАЛОСЬ!"}
// )

sleep(1);


// print_r(json_decode($_POST["json"], true));



class ImportData
{
  // 

}


// switch($_POST["command"])
// {
//   case "saveData": $o = new SaveData($_POST); break;
//   default:
//     echo $INCORRECTCOMMAND;
// }


// $fSrc = "./testing.txt";
// $fd = "";

// if ($fd = fopen($fSrc, "r+t"))
// {
//   $str = "";
//   $num = strlen($str);

//   // if (fwrite($fd, $str) == $num)
//   //   echo "Запись данных в файлы \"УСПЕШНО ЗАВЕРШЕНА\".".$br;
//   // else 
//   //   echo "Error: неполучилось записать данные в файл!";

//   // if (1)
//   // {
//   //   echo "Данные прочитаны из файлы \"ОПЕРАЦИЯ УСПЕШНО ЗАВЕРШЕНА\".".$br;
//   //   echo "Прочитанные данные:".$br;
//   //   echo file_get_contents($fSrc);
//   // }
//   // else 
//   //   echo "Error: неполучилось прочитать данные из файла!";
// }
// else
//   echo "Error: неполучилось открыть/создать файл!";

?>
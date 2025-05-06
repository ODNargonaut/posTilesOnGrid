<?php

if (isset($_POST["json"]))
{
  echo json_decode($_POST["json"], true)["showNameAnimal"];
}

?>
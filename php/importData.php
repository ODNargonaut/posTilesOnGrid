<?php

class ImportData
{
  private $dir = "./save/";
  private $file = "";
  private $data = "";


  // 
  public function __construct($data)
  {
    sleep(1);
    
    $this->file = $data["nameFile"];

    if (($this->data = file_get_contents($this->dir.$this->file)) !== false)
    {
      if (strlen($this->data) > 0)
        echo $this->data;
      else 
        echo "15";
    }
    else 
      echo "E54";
  }
}

?>
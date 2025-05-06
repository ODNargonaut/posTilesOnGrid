<?php 

class SaveData
{
  private $dir = "./save/";
  private $file = "";

  
  // 
  public function __construct($data)
  {
    global $NOJSON;
    sleep(1);
    
    $this->file = $data["nameFile"];
    fclose(fopen($this->dir.$this->file, "w+t"));

    if (isset($data["json"]))
    {
      $this->save($data["json"]);
    }
    else echo $NOJSON;
  }

  // 
  private function save($data)
  {
    if (file_put_contents($this->dir.$this->file, $data) !== false)
      echo "205";
    else 
      echo "E55";
  }
}

?>

// 
function clsOpnMenu(s="")
{
  document.getElementById("menuData").style.display = (s=="data"?"":"none");
  document.getElementById("menuGrid").style.display = (s=="grid"?"":"none");;
  document.getElementById("menuAdd").style.display  = (s=="add"?"":"none");;
  document.getElementById("menuFile").style.display = (s=="save"?"":"none");;
    
  DPTools.data.active = (s=="data"?true:false);
  DPTools.grid.active = (s=="grid"?true:false);
  DPTools.add.active  = (s=="add"?true:false);
  DPTools.file.active = (s=="file"?true:false);
    
  dataOutWindow = (s==""?false:true);


  // 
  document.getElementById("fileCommands").style.display = "block";
  document.getElementById("sendingAndResponding").style.display = "none";
}
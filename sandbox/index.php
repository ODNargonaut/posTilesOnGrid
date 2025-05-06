<!-- <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Передача данных методом POST</title>
    <script type="text/javascript" src="./Js/jQuery.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <style>
      .hidden
      {
        display: none;
      }

      .loading 
      {
        clip-path: inset(0 3ch 0 0);
        animation: l 1s steps(4) infinite;
      }

      @keyframes l {
        to {
          clip-path: inset(0 -1ch 0 0)
        }
      }
    </style>
  </head>
  <body>
    <div id="fire" style="
     border: 1px solid black;
     border-radius: 5px; 
     width: 134px; 
     height: 25px; 
     padding-top: 5px;
     padding-left: 10px;
     cursor: pointer;">Начать вторжение</div>
    <br />
    <code id="pause" class="loading"></code>
    <pre id="receiveAnswer"></pre>
    <script type="text/javascript">

    /* https://stackoverflow.com/questions/5224197/javascript-check-if-server-is-online */

    class Zoo
      {
        listAnimals = [];

        // 
        construct() { }

        // 
        request()
        {
          $("#pause").removeClass("hidden");
          $("#receiveAnswer").empty();
          
          $("#pause").html("Выполняется отправка данных...");
          $.ajax(
          {
            url: "test.php",
            method: "POST",
            data: 
            {
              json: JSON.stringify({showNameAnimal: "bee"})
            }
          }).done(function(answer)
          {
            // Получаем ответ от PHP
            $("#pause").html("").addClass("hidden");
            // $("#receiveAnswer").html(answer);
            this.addAnimal(answer);
          })
        }

        // 
        addAnimal(animal) 
        {
          this.listAnimals.push(animal);

          console.log(this.listAnimals.length);
        }
      }

      let objZoo = new Zoo();

      $(function()
      {
        $("#fire").on("click", objZoo.request);
      })

    // function fun1()
    // {
    //   $("#pause").removeClass("hidden");
    //   $("#receiveAnswer").empty();

    //   let json = JSON.stringify({
    //     "5|5":
    //     {
    //       text: "Осторожно небесное вторжение с незванными гостями НАЧАЛОСЬ!",
    //       list: [1,2,3],
    //       obj: {a: "home", b: "cat", c: "grass"}
    //     }
    //   });
      
    //   $("#pause").html("Выполняется отправка данных...");
    //   $.ajax(
    //   {
    //     url: "test.php",
    //     method: "POST",
    //     data: 
    //     {
    //       command: "saveData",
    //       json: json
    //     }
    //   }).done(function(answer)
    //   {
    //     // Получаем ответ от PHP
    //     $("#pause").html("").addClass("hidden");
    //     $("#receiveAnswer").html(answer);
    //   })
    // }

    // Проверка, если сервер онлайн?
    // function ifServerOnline()
    // {
    //   var img = document.body.appendChild(document.createElement("img"));
      
    //   img.onload = () => { console.log("OK"); };
    //   img.onerror = () => { console.log("error server"); };
      
    //   img.src = "./php/ifServerOnline/001.png";
    // }

    // ifServerOnline();
    </script>
  </body>
</html>

 -->

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Передача данных методом POST</title>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <style>
      .hidden
      {
        display: none;
      }

      .loading 
      {
        clip-path: inset(0 3ch 0 0);
        animation: l 1s steps(4) infinite;
      }

      @keyframes l {
        to {
          clip-path: inset(0 -1ch 0 0)
        }
      }
    </style>
  </head>
  <body>
    <div id="fire" style="
     border: 1px solid black;
     border-radius: 5px; 
     width: 134px; 
     height: 25px; 
     padding-top: 5px;
     padding-left: 10px;
     cursor: pointer;">Начать вторжение</div>
    <br />
    <code id="pause" class="loading"></code>
    <pre id="receiveAnswer"></pre>
    <script type="text/javascript">    

      class Zoo
      {
        listAnimals = [];

        // 
        constructor() { }

        // 
        request()
        {
          let ttt = "?";
          $("#pause").removeClass("hidden");
          $("#receiveAnswer").empty();
          
          $("#pause").html("Выполняется отправка данных...");
          $.ajax({
            url: "test.php",
            method: "POST",
            data: {
              json: JSON.stringify({showNameAnimal: "bee"})
            }
          }).done((answer) => {
            // Получаем ответ от PHP
            $("#pause").html("").addClass("hidden");
            // $("#receiveAnswer").html(answer);
            ttt = answer;
          });

          this.addAnimal(ttt);
        }

        // 
        addAnimal(animal) 
        {
          this.listAnimals.push(animal);

          console.log(this.listAnimals.length);
        }
      }

      let objZoo = new Zoo();

      $(function()
      {
        $("#fire").on("click", objZoo.request);
      })

    </script>
  </body>
</html>
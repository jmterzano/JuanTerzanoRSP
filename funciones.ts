namespace General
{

    window.addEventListener("load",function(){
       
        document.getElementById("btnGuardar").addEventListener("click",guardar); 
        document.getElementById("promedio").addEventListener("click",promedioPromesa); 
        document.getElementById("btnLimpiar").addEventListener("click",limpiar); 
        document.getElementById("filtrado").addEventListener("keyup",filtrarTabla); 
        document.getElementById("idCheck").addEventListener("change",camposMostrados);
        document.getElementById("nombreCheck").addEventListener("change",camposMostrados);
        document.getElementById("apellidoCheck").addEventListener("change",camposMostrados);
        document.getElementById("edadCheck").addEventListener("change",camposMostrados);
        
    })

    var listaPersonas:Array<Cliente> = new Array<Cliente>();
    

    export function camposMostrados()
    {
        var id=<HTMLInputElement>document.getElementById("idCheck");
        var nombre=<HTMLInputElement>document.getElementById("nombreCheck");
        var apellido=<HTMLInputElement>document.getElementById("apellidoCheck");
        var edad=<HTMLInputElement>document.getElementById("edadCheck");

        if(id.checked){
            var tablaId = document.getElementsByName("idTabla");
            tablaId.forEach(x =>{
                x.hidden = false;
            });
        }else{
            var tablaId = document.getElementsByName("idTabla");
            tablaId.forEach(x =>{
                x.hidden = true;
            });
        }

        if(nombre.checked){
            var tablaNombre = document.getElementsByName("nombreTabla");
            tablaNombre.forEach(x =>{
                x.hidden = false;
            });
        }else{
            var tablaNombre = document.getElementsByName("nombreTabla");
            tablaNombre.forEach(x =>{
                x.hidden = true;
            });
        }

        if(apellido.checked){
            var tablaApellido = document.getElementsByName("apellidoTabla");
            tablaApellido.forEach(x =>{
                x.hidden = false;
            });
        }else{
            var tablaApellido = document.getElementsByName("apellidoTabla");
            tablaApellido.forEach(x =>{
                x.hidden = true;
            });
        }

        if(edad.checked){
            var tablaEdad = document.getElementsByName("edadTabla");
            tablaEdad.forEach(x =>{
                x.hidden = false;
            });
        }else{
            var tablaEdad = document.getElementsByName("edadTabla");
            tablaEdad.forEach(x =>{
                x.hidden = true;
            });
        }

    }


    export function guardar()
    {
        var persona:Persona;
        
        var nombre= document.getElementById("nombre").value;
        var apellido= document.getElementById("apellido").value;
        var edad= document.getElementById("edad").value;
        var id:number;
        if(document.getElementById("sexo").value == "1")
        {
            var sexo=document.createTextNode("Masculino");
        }else if(document.getElementById("sexo").value == "2")
        {
            var sexo=document.createTextNode("Femenino");
        }
     
          id = calcularID();
          var miCliente:Cliente = new Cliente(id,nombre,apellido,edad,sexo);
          listaPersonas.push(miCliente);
          persona=miCliente;
                    
          if(document.getElementById("sexo").value == "1")
          {
           agregarTabla(miCliente.id.toString(),miCliente.nombre,miCliente.apellido,miCliente.edad.toString(),"Masculino");
          }else if(document.getElementById("sexo").value == "2")
          {
            agregarTabla(miCliente.id.toString(),miCliente.nombre,miCliente.apellido,miCliente.edad.toString(),"Femenino");
          }
        
    }

    export function agregarTabla(id:string,nombre:string,apellido:string,edad:string,sexo:string)
    {
        var tCuerpo = document.getElementById("tCuerpo");
        var tr = document.createElement("tr");
        
        
        var td1 = document.createElement("td");
        td1.setAttribute("name","idTabla");
        var tdText1 = document.createTextNode(id);
        td1.appendChild(tdText1);
        tr.appendChild(td1);

        var td2 = document.createElement("td");
        td2.setAttribute("name","nombreTabla");
        var tdText2 = document.createTextNode(nombre);
        td2.appendChild(tdText2);
        tr.appendChild(td2);

        var td3 = document.createElement("td");
        td3.setAttribute("name","apellidoTabla");
        var tdText3 = document.createTextNode(apellido);
        td3.appendChild(tdText3);
        tr.appendChild(td3);

        var td4 = document.createElement("td");
        td4.setAttribute("name","edadTabla");
        var tdText4 = document.createTextNode(edad);
        td4.appendChild(tdText4);
        tr.appendChild(td4);

        var td5 = document.createElement("td");
        td5.setAttribute("name","sexoTabla");
        var tdText5 = document.createTextNode(sexo);
        td5.appendChild(tdText5);
        tr.appendChild(td5);

        var td6 = document.createElement("td");
        var button = document.createElement("button");
        button.addEventListener("click",borrar);
        button.textContent="Borrar";
        var tdText6=button;
        td6.appendChild(tdText6);
        tr.appendChild(td6); 

        
        tr.addEventListener("dblclick",clickGrilla);
        tCuerpo.appendChild(tr);
    }

    export function clickGrilla(e)
    {
        
        var trClick = e.target.parentNode;
        

        document.getElementById("ID").value = trClick.childNodes[0].innerHTML;
        document.getElementById("nombre").value = trClick.childNodes[1].innerHTML;
        document.getElementById("apellido").value = trClick.childNodes[2].innerHTML;
        document.getElementById("edad").value = trClick.childNodes[3].innerHTML;
      
         switch(trClick.childNodes[4].innerHTML)
         {
           case "Masculino":
           document.getElementById("sexo").value = "1";
           break;
           case "Femenino":
           document.getElementById("sexo").value = "2";
           break;
         }               
    }

    export function borrar(e)
    {
       var tr = e.target.parentNode.parentNode;
       var item  = listaPersonas.find(x => x.id == tr.childNodes[0].textContent);
       var indice = listaPersonas.indexOf(item);
       listaPersonas.splice(indice,1);
       tr.remove();
    }


    function calcularID()
    {
       var listaId:Array<number>= listaPersonas.map(x=>x.id);

       var id= listaId.length > 0 ? listaId.reduce(function(edad,user){

        if(user>edad){
          return user + 1;
        }else{
          return edad + 1 ;
        }
       },0):1;
    
       return id;
    }

    function filtrarTabla(){
        var buscarnombre =<HTMLInputElement>document.getElementById("filtrado"); 
        var filtro:string = buscarnombre.value;
        if(filtro != ""){

        var filterPersonas:Array<Cliente> = listaPersonas.filter(function(item){
             if(item.nombre === filtro){ 
                return true;
            }else{
                return false;
            }
        });
         borrartabla();
        rearmarTabla(filterPersonas);
       }else{
        borrartabla();
        rearmarTabla(listaPersonas);
       }
    } 

    function rearmarTabla(filterPersonas){
        filterPersonas.forEach(x => {
            agregarTabla(x.id,x.nombre,x.apellido,x.edad,x.sexo);
        });

    }

    function borrartabla()
    {
        let tCuerpo = document.getElementById("tCuerpo");
        tCuerpo.innerHTML = " ";
    }

    function limpiar()
    {
        console.log("aca");
        document.getElementById("ID").value="";
        document.getElementById("nombre").value="";
        document.getElementById("apellido").value="";
        document.getElementById("edad").value="";
        document.getElementById("sexo").value="";
    }

    function promedioPromesa()
    {
            totalLista(listaPersonas).then(function(response:number){
                var promedio= response / listaPersonas.length;
                console.log("Profe me pasa lo mismo que en el parcial pasado, me concatena los numeros, no me los suma");
                alert(promedio);
              })
        
    }

    function totalLista(lista){
        return new Promise(function(resolve,reject){
            var total  = listaPersonas.reduce(function(total,user){
              return total+=user.edad;
          },0);
            resolve(total);
          })
      }


}
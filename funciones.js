var General;
(function (General) {
    window.addEventListener("load", function () {
        document.getElementById("btnGuardar").addEventListener("click", guardar);
        document.getElementById("promedio").addEventListener("click", promedioPromesa);
        document.getElementById("btnLimpiar").addEventListener("click", limpiar);
        document.getElementById("filtrado").addEventListener("keyup", filtrarTabla);
        document.getElementById("idCheck").addEventListener("change", camposMostrados);
        document.getElementById("nombreCheck").addEventListener("change", camposMostrados);
        document.getElementById("apellidoCheck").addEventListener("change", camposMostrados);
        document.getElementById("edadCheck").addEventListener("change", camposMostrados);
    });
    var listaPersonas = new Array();
    function camposMostrados() {
        var id = document.getElementById("idCheck");
        var nombre = document.getElementById("nombreCheck");
        var apellido = document.getElementById("apellidoCheck");
        var edad = document.getElementById("edadCheck");
        if (id.checked) {
            var tablaId = document.getElementsByName("idTabla");
            tablaId.forEach(function (x) {
                x.hidden = false;
            });
        }
        else {
            var tablaId = document.getElementsByName("idTabla");
            tablaId.forEach(function (x) {
                x.hidden = true;
            });
        }
        if (nombre.checked) {
            var tablaNombre = document.getElementsByName("nombreTabla");
            tablaNombre.forEach(function (x) {
                x.hidden = false;
            });
        }
        else {
            var tablaNombre = document.getElementsByName("nombreTabla");
            tablaNombre.forEach(function (x) {
                x.hidden = true;
            });
        }
        if (apellido.checked) {
            var tablaApellido = document.getElementsByName("apellidoTabla");
            tablaApellido.forEach(function (x) {
                x.hidden = false;
            });
        }
        else {
            var tablaApellido = document.getElementsByName("apellidoTabla");
            tablaApellido.forEach(function (x) {
                x.hidden = true;
            });
        }
        if (edad.checked) {
            var tablaEdad = document.getElementsByName("edadTabla");
            tablaEdad.forEach(function (x) {
                x.hidden = false;
            });
        }
        else {
            var tablaEdad = document.getElementsByName("edadTabla");
            tablaEdad.forEach(function (x) {
                x.hidden = true;
            });
        }
    }
    General.camposMostrados = camposMostrados;
    function guardar() {
        var persona;
        var nombre = document.getElementById("nombre").value;
        var apellido = document.getElementById("apellido").value;
        var edad = document.getElementById("edad").value;
        var id;
        if (document.getElementById("sexo").value == "1") {
            var sexo = document.createTextNode("Masculino");
        }
        else if (document.getElementById("sexo").value == "2") {
            var sexo = document.createTextNode("Femenino");
        }
        id = calcularID();
        var miCliente = new General.Cliente(id, nombre, apellido, edad, sexo);
        listaPersonas.push(miCliente);
        persona = miCliente;
        if (document.getElementById("sexo").value == "1") {
            agregarTabla(miCliente.id.toString(), miCliente.nombre, miCliente.apellido, miCliente.edad.toString(), "Masculino");
        }
        else if (document.getElementById("sexo").value == "2") {
            agregarTabla(miCliente.id.toString(), miCliente.nombre, miCliente.apellido, miCliente.edad.toString(), "Femenino");
        }
    }
    General.guardar = guardar;
    function agregarTabla(id, nombre, apellido, edad, sexo) {
        var tCuerpo = document.getElementById("tCuerpo");
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.setAttribute("name", "idTabla");
        var tdText1 = document.createTextNode(id);
        td1.appendChild(tdText1);
        tr.appendChild(td1);
        var td2 = document.createElement("td");
        td2.setAttribute("name", "nombreTabla");
        var tdText2 = document.createTextNode(nombre);
        td2.appendChild(tdText2);
        tr.appendChild(td2);
        var td3 = document.createElement("td");
        td3.setAttribute("name", "apellidoTabla");
        var tdText3 = document.createTextNode(apellido);
        td3.appendChild(tdText3);
        tr.appendChild(td3);
        var td4 = document.createElement("td");
        td4.setAttribute("name", "edadTabla");
        var tdText4 = document.createTextNode(edad);
        td4.appendChild(tdText4);
        tr.appendChild(td4);
        var td5 = document.createElement("td");
        td5.setAttribute("name", "sexoTabla");
        var tdText5 = document.createTextNode(sexo);
        td5.appendChild(tdText5);
        tr.appendChild(td5);
        var td6 = document.createElement("td");
        var button = document.createElement("button");
        button.addEventListener("click", borrar);
        button.textContent = "Borrar";
        var tdText6 = button;
        td6.appendChild(tdText6);
        tr.appendChild(td6);
        tr.addEventListener("dblclick", clickGrilla);
        tCuerpo.appendChild(tr);
    }
    General.agregarTabla = agregarTabla;
    function clickGrilla(e) {
        var trClick = e.target.parentNode;
        document.getElementById("ID").value = trClick.childNodes[0].innerHTML;
        document.getElementById("nombre").value = trClick.childNodes[1].innerHTML;
        document.getElementById("apellido").value = trClick.childNodes[2].innerHTML;
        document.getElementById("edad").value = trClick.childNodes[3].innerHTML;
        switch (trClick.childNodes[4].innerHTML) {
            case "Masculino":
                document.getElementById("sexo").value = "1";
                break;
            case "Femenino":
                document.getElementById("sexo").value = "2";
                break;
        }
    }
    General.clickGrilla = clickGrilla;
    function borrar(e) {
        var tr = e.target.parentNode.parentNode;
        var item = listaPersonas.find(function (x) { return x.id == tr.childNodes[0].textContent; });
        var indice = listaPersonas.indexOf(item);
        listaPersonas.splice(indice, 1);
        tr.remove();
    }
    General.borrar = borrar;
    function calcularID() {
        var listaId = listaPersonas.map(function (x) { return x.id; });
        var id = listaId.length > 0 ? listaId.reduce(function (edad, user) {
            if (user > edad) {
                return user + 1;
            }
            else {
                return edad + 1;
            }
        }, 0) : 1;
        return id;
    }
    function filtrarTabla() {
        var buscarnombre = document.getElementById("filtrado");
        var filtro = buscarnombre.value;
        if (filtro != "") {
            var filterPersonas = listaPersonas.filter(function (item) {
                if (item.nombre === filtro) {
                    return true;
                }
                else {
                    return false;
                }
            });
            borrartabla();
            rearmarTabla(filterPersonas);
        }
        else {
            borrartabla();
            rearmarTabla(listaPersonas);
        }
    }
    function rearmarTabla(filterPersonas) {
        filterPersonas.forEach(function (x) {
            agregarTabla(x.id, x.nombre, x.apellido, x.edad, x.sexo);
        });
    }
    function borrartabla() {
        var tCuerpo = document.getElementById("tCuerpo");
        tCuerpo.innerHTML = " ";
    }
    function limpiar() {
        console.log("aca");
        document.getElementById("ID").value = "";
        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("edad").value = "";
        document.getElementById("sexo").value = "";
    }
    function promedioPromesa() {
        totalLista(listaPersonas).then(function (response) {
            var promedio = response / listaPersonas.length;
            console.log("Profe me pasa lo mismo que en el parcial pasado, me concatena los numeros, no me los suma");
            alert(promedio);
        });
    }
    function totalLista(lista) {
        return new Promise(function (resolve, reject) {
            var total = listaPersonas.reduce(function (total, user) {
                return total += user.edad;
            }, 0);
            resolve(total);
        });
    }
})(General || (General = {}));

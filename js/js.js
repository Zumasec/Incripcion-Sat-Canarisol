var token = "c52f46bf3aa5c2441847e9fdee3f4583fb77e7aaca0995826d45bc165940fac4";
var idtablero = "5bd6e4728be14d40e88c64fc";
var idlist = "5bd6e4728be14d40e88c64fd";
var appkey = "a358184ea95073f09071d85c1ede7453";
var usuario = "5aabca240fa2e0ee00d049ce";
let spiner = document.getElementById('spiner');

function incidencias() {
    spiner.style.cssText = 'display:block';
    var empresa = document.getElementById('empresa').value;
    var nombre = document.getElementById('nombre').value;
    var mcorreo = document.getElementById('mcorreo').value;
    var telefono = document.getElementById('telefono').value;
    var comentario = document.getElementById('incidencia').value;

    var fecha = new Date();
    var fechaTrello = fecha.getFullYear() + '-' + ("0" + (fecha.getMonth() + 1)).slice(-2) + '-' + ("0" + fecha.getDate()).slice(-2);
    var hora = fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();

    var desc = 'Fecha ' + fechaTrello + ' a las ' + hora + '\n' + ' Empresa: ' + empresa + '\n' + ' Nombre: ' + nombre + '\n' + ' Correo: ' + mcorreo + '\n' + ' Telefono: ' + telefono + '\n' + ' Comentario: ' + comentario;
    crearCarta(desc)
}

function crearCarta(desc) {
    if (empresa.value == "" || nombre.value == "" || mcorreo.value == "" || telefono.value == "" ) {
        swal({
            text: "Rellena todos los campos!",
            icon: "warning",
            button: "Volver a intentar!",
        });
    }

    else {

        var data = null;
        var name = 'Contactar con:';
        var xhr = new XMLHttpRequest();
        var url = "https://api.trello.com/1/cards?name=" + encodeURI(name) + "&desc=" + encodeURI(desc) + "&pos=top&idList=" + idlist + "&keepFromSource=all&key=" + appkey + "&token=" + token;
        url = url.replace(/#/g, '%23');
        xhr.open("POST", url);
        xhr.send(data);
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                //recogemos el id de la carta creada
                var dt = this.responseText;
                h = JSON.parse(dt).id;
                //llamada a las funciones para rellenar la carta
                
                usuarioPredefinido(h, name);
            }
        });



    }
}
function usuarioPredefinido(data, name) {
   
    var arrRQ = [];
    var datas = null;
    var usuRQ1 = new XMLHttpRequest();

    usuRQ1.open("POST", "https://api.trello.com/1/cards/" + data + "/idMembers?value=" + usuario + "&key=" + appkey + "&token=" + token);
    usuRQ1.send(datas);

    usuRQ1.addEventListener("readystatechange", function () {

        if (this.readyState === this.DONE) {
            var finalizado = true;
            for (let i = 0; i < arrRQ.length; i++) {
                if (arrRQ[i].readyState !== this.DONE) {
                    finalizado = false;
                }
            }
            if (finalizado == true ) {
                spiner.style.cssText = 'display:none';
                swal({
                    title: "Inscripción Finalizada!",
                    text: 'Gracias ' + nombre.value + ' contactaremos con usted!',
                    icon: "success",
                    button: "Cerrar",
                })
                    .then(function (value) {
                        swal(location.reload());
                    });
            }
        }
    });
}
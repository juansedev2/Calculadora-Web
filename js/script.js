// ! Script de JavaScript que contendrá la lógica de la aplicación de la calculadora
"use strict"

/* !Para ver que funcione efectivamente el script y esté asociado*/
// document.write("Hola mundo");

// Variable que contendrá al número
const numeros = document.getElementsByName("numero");
const numeros_2 = [];  // El número de la tecla seleccionada
let numero_actual;
// Agregaremos a cada botón el evento de click
for(let numero of numeros){
    numero.addEventListener("click", (evento) => {
        let elemento = evento.target;
        console.log(elemento.innerHTML);
        try{
            // !NOTA: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
            // ! SI USAMOS INNERHTML, hay que eliminar espacios en extremos con trim(), ya que en números no los dejaría parsear
            // TODO: Eliminar try catch
            numero_actual = parseInt(elemento.value);  // * Accedemos al elemento HTML en su atributo value
        }catch(error){
            console.log(error);
        }
    });
}
console.log("El número seleccionado : " + numero_actual);
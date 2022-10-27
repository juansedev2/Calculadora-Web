// ! Script de JavaScript que contendrá la lógica de la aplicación de la calculadora
"use strict";
// ! Obtener los botones de las operaciones de la sección principal (Clear (c), remove(←), decimal(.) e igual(=))
const botones_principales = document.querySelectorAll("button.b_principal");
// ! Obtener los botones de los números)
const botones_numeros = document.querySelectorAll("button.b_numero");
// ! Obtener los botones de las operaciones aritméticas (+, -, * y /))
const botones_operaciones = document.querySelectorAll("button.b_operacion");
// ! Obtener el input que actuará como pantalla de la calculadora
const pantalla = document.getElementById("pantalla");
// * Variables para los valores de las operaciones aritméticas en memoria
let valor_pantalla = null, valor_operacion = null;
let valor_actual = 0, valor_reciente = 0;
let igual = false;  // * Controlar que los resultados puedan concaternarse bien sea con = o una operación aritmética

// ! Añadir el evento de capturar los botones de las operaciones principales
botones_principales.forEach((elemento) => {
  elemento.addEventListener("click", (operacion_principal) => {
    
    let op = operacion_principal.target.value;

    switch (op) {

        case "c":
            valor_actual = 0;
            valor_pantalla = null;
            pantalla.value = "0";
            break;

        case "←":
            
            if(typeof valor_pantalla == "string"){
                
                if(valor_pantalla.length <= 1){
                    valor_pantalla = null;
                    pantalla.value = "0";
                }else{
                    valor_pantalla = valor_pantalla.slice(-1);  //* Eliminar el último caracter de la cadena
                    pantalla.value = valor_pantalla;
                }
            }

            break;

        case "=":
            if(typeof valor_pantalla == "string"){
                valor_reciente = parseInt(valor_pantalla);
                operarNumeros(valor_reciente, valor_actual, valor_operacion);
                igual = true;
                if(valor_actual == 0){
                    valor_pantalla = null;
                    pantalla.value = "0";
                }
            }
            break;

        default:
            console.log(`Operación desconocida`);
            break;
    }
  });
});

// ! Añadir el evento de capturar los botones de los números
botones_numeros.forEach((elemento) => {
  elemento.addEventListener("click", (numero) => {

    if (valor_pantalla == null) {
      valor_pantalla = numero.target.value;
    } else {
      valor_pantalla += numero.target.value;
    }
    pantalla.value = valor_pantalla;
  });
});

// ! Añadir el evento de capturar los botones de las operaciones aritméticas
botones_operaciones.forEach((elemento) => {
  elemento.addEventListener("click", (operacion_aritmetica) => {

    
    if (typeof valor_pantalla == "string") {  // * Solo obtener la operación a realizar si hay valores a operar

        if(valor_actual == 0){ 
            // * Almacenar el primer número que se guarda en memoria
            valor_actual = parseInt(valor_pantalla);

        }else{
            if(!igual){
                // * Almacenar el valor actual obteniendo la operación a realizar sobre ella (anterior operado con el actual)
                valor_reciente = parseInt(valor_pantalla);
                operarNumeros(valor_reciente, valor_actual, valor_operacion);
            }
            igual = false;
        }
        valor_operacion = operacion_aritmetica.target.value;
        valor_pantalla = null;  //  * No permitir que se hagan op
    }
  });
});

function operarNumeros(reciente, actual, operacion) {
    
    console.log(`Calcular los números ${reciente} y ${actual} para hacer: ${operacion}`);
    parseInt(actual);
    
    switch (operacion) {
        
        case "+":
            valor_actual = actual + reciente;
            break;

        case "-":
            valor_actual = actual - reciente;
            break;

        case "x":
            valor_actual = actual * reciente;
            break;

        case "/":

            if(reciente == 0){
                valor_actual = 0;
            }else{
                valor_actual = actual / reciente;
            }
            break;

        default:
            console.log(`Operación desconocida`);
            break;
    }

    pantalla.value = String(valor_actual);
}

"use strict";
const botones_principales = document.querySelectorAll("button.b_principal");
const botones_numeros = document.querySelectorAll("button.b_numero");
const botones_operaciones = document.querySelectorAll("button.b_operacion");
const pantalla = document.getElementById("pantalla");
let valor_pantalla = null, valor_operacion = null;
let valor_almacenado = 0, valor_actual = 0;

botones_principales.forEach((elemento) => {
  elemento.addEventListener("click", (operacion_principal) => {
    
    let op = operacion_principal.target.value;

    switch (op) {

        case "c":
            valor_actual = 0;
            valor_almacenado = 0;
            valor_pantalla = null;
            pantalla.value = "0";
            break;

        case "←":
            if(valor_operacion === null){
                if(typeof valor_pantalla == "string"){

                    if(valor_pantalla.length == 1){
                        pantalla.value = "0";
                        valor_pantalla = null;
                    }else{
                        valor_pantalla = valor_pantalla.slice(0, -1);
                        pantalla.value = valor_pantalla;
                    }
                }
            }else{
                if(valor_pantalla.length == 1){
                        pantalla.value = "0";
                        valor_pantalla = null;
                    }else{
                        valor_pantalla = valor_pantalla.slice(0, -1);
                        pantalla.value = valor_pantalla;
                    }

            }

            break;

        case "=":
            if(typeof valor_pantalla == "string"){
                operarNumeros();
            }
            break;

        case ".":
            if(typeof valor_pantalla == "string"){
                valor_pantalla = valor_pantalla + ".";
                pantalla.value = valor_pantalla;
            }
            break;

        default:
            //console.log(`Operación desconocida`);
            break;
    }
  });
});

botones_numeros.forEach((elemento) => {
  elemento.addEventListener("click", numero => {
    if(typeof valor_pantalla == "string"){
        if(valor_pantalla.length == 0){
            valor_pantalla = numero.target.value;
        }else{
            valor_pantalla += numero.target.value;
        }
    }else{
        valor_pantalla = numero.target.value;
    }
    pantalla.value = valor_pantalla;
  });
});

botones_operaciones.forEach((elemento) => {
  elemento.addEventListener("click", operacion_aritmetica => {
    valor_operacion = operacion_aritmetica.target.value;
    if(valor_almacenado == 0){
        valor_almacenado = parsearNumero(valor_pantalla);
    }
    valor_pantalla = null;
  });
});

function operarNumeros() {

    valor_actual = parsearNumero(valor_pantalla);

    switch (valor_operacion) {
        case "+":
            valor_almacenado = valor_almacenado + valor_actual;
            break;
    
        case "-":
            valor_almacenado = valor_almacenado - valor_actual;
            break;
        
        case "x":
            valor_almacenado = valor_almacenado * valor_actual;
            break;
        case "/":
            valor_almacenado = valor_almacenado / valor_actual;
            break;
        default:
            //console.log(`Operación desconocida`);
            break;
    }
    pantalla.value = String(valor_almacenado);
    valor_operacion = null;
    valor_pantalla = null;
}

function parsearNumero(valor) {

    if(typeof valor == "string"){
        if(valor.includes(".")){
            if(valor.endsWith(".")){
                valor += "0";
            }
            return parseFloat(valor);
        }else{
            return parseInt(valor);
        }
    }
}

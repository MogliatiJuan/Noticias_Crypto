let maxbitcoins = 21000000
let preciobtc = 19200;
let saldoUSD = 0;
let saldoBTC = 0;

let usuario = prompt ("Ingrese su nombre");

while (usuario == ""){
    alert ("No ingresaste nombre de usuario.");
    usuario = prompt ("Ingrese su nombre");
}

alert ("Bienvenido " + usuario + " a Crypto Club News, aquí puedes comprar bitcoins.");
let edad = prompt ("Ingrese su edad (solo mayores de edad pueden comprar).");

do{
    if (edad >= 18 && edad <= 128) {
        alert ("Genial! Puedes comprar bitcoins.");
    }
    else if (edad > 0 && edad < 18) {
        alert ("Eres menor. No puedes comprar bitcoins aquí.");
        edad = prompt ("Ingrese su edad (mayores de edad pueden comprar)."); 
    }
    else if (edad <= 0) {
        alert ("Dato invalido.");
        edad = prompt ("Ingrese su edad (mayores de edad pueden comprar).");
    }
    else if (edad > 128) {
        alert ("Estupendo! Superaste a Johanna Mazibuko, batiste el Record Guinness " + usuario + "!")
    }
}while ((edad <=0) || (edad > 0 && edad < 18))

alert ("Precio de Bitcoin actualmente es de " + preciobtc);

function calculadora(){

    let opcion = Number(prompt("Ingrese si desea comprar o vender. 1- Comprar, 2- Vender"));

    while ((opcion != 1) && (opcion != 2)) {
        alert ("Ha ingresado una opcion no valida");
        opcion = Number(prompt("Ingrese si desea comprar o vender. 1- Comprar, 2- Vender"));
        if ((opcion == 1) || (opcion == 2)){
            break;
        }
    }
    switch (opcion) {
        case 1:
            saldoUSD = Number(prompt ("Ingrese su saldo en USD."));
            let compra = Number(prompt("Ingrese cuantos bitcoins desea comprar."));
            let conversionCompra = compra * preciobtc;
            if (compra > maxbitcoins){
                alert ("No puede comprar mas bitcoins que el suministro maximo.");
                alert ("Vuelva a ingresar los datos.");
            } else if (compra <= 0){
                alert ("No a ingresado cantidad valida de compra.");
                alert ("Vuelva a ingresar los datos.");
            } else if ( saldoUSD <= 0){
                alert ("No a ingresado cantidad valida de saldo.");
                alert ("Vuelva a ingresar los datos.");
            } else if (conversionCompra > saldoUSD){
                alert ("No posee dinero suficiente para comprar bitcoins.");
                alert ("Vuelva a ingresar los datos.");
            } else if (saldoUSD >= conversionCompra){
                let avisoCompra = Number(prompt("Estas seguro de la compra? 1- Si, 2- No"));
                if (avisoCompra == 1){
                    saldoUSD = saldoUSD - conversionCompra;
                    alert ("Compra realizada con exito, ha comprado una cantidad de " + compra + " BTC por un total de $" + conversionCompra + " USD. Su saldo restante es $" + saldoUSD + " USD.");
                } else {
                    alert ("Compra no realizada. Su saldo es " + saldoUSD);
                }
            } 
            break;
        case 2:   
            saldoBTC = Number(prompt ("Ingrese su cantidad de BTC en wallet"));
            let venta = Number(prompt("Ingrese cuantos bitcoins desea vender"));
            let conversionVenta = venta * preciobtc;
            if (venta > saldoBTC){
                alert ("No puede vender mas bitcoins de los que posee")
                alert ("Vuelva a ingresar los datos.")
            } else if (saldoBTC > maxbitcoins){
                alert ("No puede tener mas bitcoins que el suministro maximo")
                alert ("Vuelva a ingresar los datos.")
            } else if (venta <= 0){
                alert ("No a ingresado cantidad valida de venta")
                alert ("Vuelva a ingresar los datos.")
            } else if ( saldoBTC <= 0){
                alert ("No a ingresado cantidad valida de BTC en wallet")
                alert ("Vuelva a ingresar los datos.")
            } else if (saldoBTC >= venta){ 
                let avisoVenta = Number(prompt("Estas seguro de la venta? 1- Si, 2- No"))
                if (avisoVenta == 1) {
                    saldoBTC = saldoBTC - venta;
                    alert ("Venta realizada con exito, ha vendido una cantidad de " + venta + " BTC por un total de $" + conversionVenta + " USD. Su cantidad restante es de " + saldoBTC + " BTC en wallet.");
                } else {
                    alert ("Venta no realizada. Su saldo es " + saldoBTC);
                }
            } 
            break;
    }
}

let utilizarCalculadora = Number(prompt("Desea comprar o vender bitcoins? 1-Si, 2- No"));

while ((utilizarCalculadora < 1) || (utilizarCalculadora > 2)) {
    alert ("Opcion no valida. Ingrese nuevamente")
    utilizarCalculadora = Number(prompt("Desea comprar o vender bitcoins? 1-Si, 2- No"));
}

if (utilizarCalculadora == 1){
    calculadora();
    alert ("Muchas gracias " + usuario + " por utilizar la calculadora de Crypto Club News. Nos vemos pronto!");
} else if (utilizarCalculadora == 2){
    alert ("Muchas gracias " + usuario + " por utilizar la calculadora de Crypto Club News. Nos vemos pronto!");
}
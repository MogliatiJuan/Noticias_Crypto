let saldoUSD = 0;
let saldoVenta = 0;
let comprar = 0;
let vender = 0;
let listingMoneda = [];


class Criptomoneda {
    constructor(precio, moneda, supply) {
        this.precio = precio;
        this.moneda = moneda;
        this.supply = supply;
    }
}

const cripto0 = new Criptomoneda(18284,"BTC",21000000);
const cripto1 = new Criptomoneda(1337,"ETH",120523502);
const cripto2 = new Criptomoneda(1,"USDT",69524492563);
const cripto3 = new Criptomoneda(315,"BNB",200000000);
const cripto4 = new Criptomoneda(0.38,"XRP",100000000000);

const BBDD = [cripto0,cripto1,cripto2,cripto3,cripto4]; //array de objetos

const nombreMoneda = BBDD.map((el) => el.moneda);  //del array de objetos saco el nombre de cada moneda
const precioMoneda = BBDD.map((el) => el.precio);  //del array de objetos saco el precio de cada moneda
const supplyMoneda = BBDD.map((el) => el.supply);  //del array de objetos saco el supply de cada moneda

let usuario = prompt ("Ingrese su nombre");
let password = prompt ("Ingrese su password para confirmar las transacciones")

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


function exchange(){

    let decisionUsuario = prompt("Desea ver la lista de monedas disponibles o desea buscar el nombre de la criptomoneda? \n 1- Deseo ver la lista \n 2- Deseo buscar por mi cuenta");
    if (decisionUsuario == 1){
        alert("Las siguientes monedas estan disponibles en nuestro exchange \n" + nombreMoneda);
        console.log("Datos especificos de las monedas listadas:")
        console.log(BBDD);
    } else if (decisionUsuario == 2) {
        let busquedaMoneda = prompt("Escriba las iniciales del nombre del token o criptomoneda que busca")
        busquedaMoneda = busquedaMoneda.toUpperCase();
        let buscarMoneda = BBDD.some((el) => el.moneda == busquedaMoneda) // false => no existe .... true => si existe
        if (buscarMoneda == false) {
            alert("Lo lamento, esa moneda no esta listada en nuestro exchange")
            let usuarioListarMoneda = prompt("Desea enviarnos esa moneda a nuestra BBDD para que la tengamos en cuenta? \n 1- Si \n 2- No")
            while (usuarioListarMoneda == 1){
                listingMoneda.push(busquedaMoneda);
                usuarioListarMoneda = prompt ("Desea seguir agregando monedas a la lista de espera? \n 1- Si \n 2- No");
                if (usuarioListarMoneda == 1){
                    busquedaMoneda = prompt("Escriba las iniciales del nombre del token o criptomoneda que desea agregar")
                    busquedaMoneda = busquedaMoneda.toUpperCase();
                }
            } 
            alert("Muchas gracias "+ usuario + " por agregar sus monedas preferidas a la lista de espera. \n Dichas monedas son las siguientes: " + listingMoneda);      
        } else if (buscarMoneda == true) {
            alert("Enhorabuena! Esa moneda si esta listada en nuestro exchange")
        }
    }

    let opcion = Number(prompt("Ingrese si desea comprar o vender.\n 1- Comprar \n 2- Vender"));

    while ((opcion != 1) && (opcion != 2)) {
        alert ("Ha ingresado una opcion no valida");
        opcion = Number(prompt("Ingrese si desea comprar o vender.\n 1- Comprar \n 2- Vender"));
    }
    if (opcion == 1) {
       comprar = prompt("Cual desea comprar? \n 0- " + cripto0.moneda + "\n 1- " + cripto1.moneda + "\n 2- " + cripto2.moneda + "\n 3- " + cripto3.moneda + "\n 4- " + cripto4.moneda);
    }
    if (opcion == 2){
        vender = prompt("Cual desea vender? \n 0- " + cripto0.moneda + "\n 1- " + cripto1.moneda + "\n 2- " + cripto2.moneda + "\n 3- " + cripto3.moneda + "\n 4- " + cripto4.moneda);
    }
    
    switch (opcion) {
        case 1:
            saldoUSD = Number(prompt ("Ingrese su saldo en USD."));
            let compra = Number(prompt("Ingrese cuantos " + nombreMoneda[comprar] + " desea comprar. \n El precio de cada "+ nombreMoneda[comprar] + " es de $" + precioMoneda[comprar] +
            "\n Su saldo es de $" + saldoUSD));
            let conversionCompra = compra * precioMoneda[comprar];
            if (compra > supplyMoneda[comprar]){
                alert ("No puede comprar mas " + nombreMoneda[comprar] + " que el suministro maximo.");
                alert ("Vuelva a ingresar los datos.");
            } else if (compra <= 0){
                alert ("No a ingresado cantidad valida de compra.");
                alert ("Vuelva a ingresar los datos.");
            } else if ( saldoUSD <= 0){
                alert ("No a ingresado cantidad valida de saldo.");
                alert ("Vuelva a ingresar los datos.");
            } else if (conversionCompra > saldoUSD){
                alert ("No posee dinero suficiente para comprar " + nombreMoneda[comprar]);
                alert ("Vuelva a ingresar los datos.");
            } else if (saldoUSD >= conversionCompra){
                let avisoCompra = prompt("Estas seguro de la compra? \n Ingrese su password para confirmar");
                if (avisoCompra === password){
                    saldoUSD = saldoUSD - conversionCompra;
                    alert ("Compra realizada con exito, ha comprado una cantidad de " + compra + nombreMoneda[comprar] + " por un total de $" + conversionCompra + " USD. \n Su saldo restante es $" + saldoUSD + " USD.");
                } else {
                    alert ("Password incorrecta. \n Compra no realizada. Su saldo es " + saldoUSD);
                }
            } 
            break;
        case 2:   
            saldoVenta = Number(prompt ("Ingrese su cantidad de " + nombreMoneda[vender] + " en wallet"));
            let venta = Number(prompt("Ingrese cuantos " + nombreMoneda[vender] + " desea vender. \n El precio de cada "+ nombreMoneda[vender] + " es de $" + precioMoneda[vender] + 
            "\n Su saldo es de " + saldoVenta + " " + nombreMoneda[vender]));
            let conversionVenta = venta * precioMoneda[vender];
            if (venta > saldoVenta){
                alert ("No puede vender mas" + nombreMoneda[vender] + " de los que posee")
                alert ("Vuelva a ingresar los datos.")
            } else if (saldoVenta > supplyMoneda[vender]){
                alert ("No puede tener mas " + nombreMoneda[vender] + " que el suministro maximo")
                alert ("Vuelva a ingresar los datos.")
            } else if (venta <= 0){
                alert ("No a ingresado cantidad valida de venta")
                alert ("Vuelva a ingresar los datos.")
            } else if ( saldoVenta <= 0){
                alert ("No a ingresado cantidad valida de " + nombreMoneda[vender] + " en wallet")
                alert ("Vuelva a ingresar los datos.")
            } else if (saldoVenta >= venta){ 
                let avisoVenta = prompt("Estas seguro de la venta? \n Ingrese su password para confirmar")
                if (avisoVenta === password) {
                    saldoVenta = saldoVenta - venta;
                    alert ("Venta realizada con exito, ha vendido una cantidad de " + venta + nombreMoneda[vender] +" por un total de $" + conversionVenta + " USD. \n Su cantidad restante es de " + saldoVenta + nombreMoneda[vender] +" en wallet.");
                } else {
                    alert ("Password incorrecta. Venta no realizada. \n Su saldo es " + saldoVenta);
                }
            }
            break;
    }
}

let utilizarCalculadora = Number(prompt("Desea realizar alguna operacion? \n 1- Si \n 2- No"));

while ((utilizarCalculadora < 1) || (utilizarCalculadora > 2)) {
    alert ("Opcion no valida. Ingrese nuevamente")
    utilizarCalculadora = Number(prompt("Desea  realizar alguna operacion? \n 1- Si \n 2- No"));
}

if (utilizarCalculadora == 1){
    exchange();
    let seguirUtilizando = prompt("Desea seguir utilizando el exchange? \n 1- Si \n 2- No")
    while (seguirUtilizando == 1){
        exchange();
        seguirUtilizando = prompt ("Desea seguir utilizando el exchange? \n 1- Si \n 2- No");
    }    
    alert ("Muchas gracias " + usuario + " por utilizar el exchange de Crypto Club News.\n Nos vemos pronto!");
} else if (utilizarCalculadora == 2){
    alert ("Muchas gracias " + usuario + " por utilizar el exchange de Crypto Club News.\n Nos vemos pronto!");
}
const titulo = document.querySelector("#bienvenida")
const tituloBienvenida = document.querySelector("#iniciarSesion")
const form = document.querySelector("#usuarioForm")
const Usuario = document.querySelector("#usuario")
const Password = document.querySelector("#password")
const inicioSesion = document.querySelector("#login") //capturo los nodos y los guardo en variables
const operacionesExchange = document.querySelector("#operacionesExchange")
const contenedorExchange = document.querySelector("#contenedorExchange")
const lastPrices = document.querySelector("#lastPrices")


let nombreUsuario;
let clavePassword;

const cryptocurrencies = [  // array de objetos
    {id: "1", moneda: "btcusdt", precio: 16529,supply: 21000000},
    {id: "2", moneda: "ethusdt", precio: 1197, supply: 120517315},
    {id: "3", moneda: "xrpusdt", precio: 0.38, supply: 100000000000},
    {id: "4", moneda: "manausd", precio: 0.39,supply: 2193328127},
    {id: "5", moneda: "maticusd", precio: 0.89, supply: 10000000000 },
    {id: "6", moneda: "sushiusd", precio: 1.14, supply: 250000000 },
    {id: "7", moneda: "enjusd", precio: 0.30,supply: 1000000000 },
    {id: "8", moneda: "hbarusd", precio: 0.048, supply: 50000000000 },
    {id: "9", moneda: "alphausd", precio: 0.091, supply: 1000000000 },
    {id: "10", moneda: "axsusd", precio: 8.09, supply: 270000000 },
]


const login = (res) => {    //Promesa para resolver si se inicia sesion
    return new Promise ( (resolve, reject) => {
        if (res) {
            resolve('Sesion iniciada') 
        } else {
            reject('Sesion no iniciada')   
        }
    })
}

let usuarioEnLS = JSON.stringify(localStorage.getItem('usuario'))
if (usuarioEnLS == "null") {
    aVerificar();   // si no hay usuario registrado, agrega evento en boton de iniciar sesion para registrar usuario
} else {
    nombreUsuario = usuarioEnLS     // si hay usuario, lo guarda y cumple la promesa de que hay usuario
    login(true)
    .then(() => inicio())
}


function aVerificar(){
    form.addEventListener("submit", verificacion) // agrego evento al boton
}


function verificacion(e){
    e.preventDefault();
    const datosUsuario = (Usuario.value != "" && Password.value != "") ? true : false // si estan ambos campos llenos, asigna true a datosUsuario
    datosUsuario ? Swal.fire({  // datosUsuario si es true tira alerta exitosa sino error
        title: 'Datos correctos',
        text: 'Inicio de sesión exitoso',
        icon: 'success',
        confirmButtonText: 'Continuar'
    }).then((result) => {
        if (result.isConfirmed) {
            login(true)
            .then(() => inicio(e))
            nombreUsuario = Usuario.value //asigno valor usuario
            clavePassword = Password.value //asigno clave password
            localStorage.setItem("usuario", nombreUsuario)  //guardo en LS el nombre de usuario
            localStorage.setItem("clavePassword", clavePassword)  //guardo de momento en LS -- va en SS
            // .catch(()=>console.log({error:e}))
        }
      }) : Swal.fire({
        title: 'Error!',
        text: 'Ingrese los datos correctamente',
        icon: 'error',
        confirmButtonText: 'Reingresar'
    }).then((result) => {
        if (result.isConfirmed){
            login(false).then((res) => console.log(res))
                .catch((e) => console.log({ error: e }))
        }
    })

}

function inicio(){
    form.reset();
    titulo.innerText =  `Bienvenido ${nombreUsuario} al Exchange de Crypto Club`
    tituloBienvenida.innerHTML += "<p id='textoBienvenida'>Por favor, elija que moneda desea comprar</p>"
    Usuario.remove()
    Password.remove()
    inicioSesion.remove()

    cryptocurrencies.forEach((cripto) =>{  //recorro la cripto imprimiendo las monedas disponibles

        operacionesExchange.innerHTML += `
        <div class="monedasEnExchange"><p>MONEDA: ${cripto.moneda}</p>
        <p> PRECIO: ${cripto.precio}</p></div>
        <button id= "${cripto.id}" class="btn btn-primary btnCustom botonComprar">Comprar</button>
        `;

        let botonComprar = document.querySelectorAll(".botonComprar")   //capto todos los botones de comprar
        botonComprar.forEach(boton => {
                boton.addEventListener("click", agregarAlCarrito)   //le asigno a cada uno el evento de agregar al carrito
            })
        });

    contenedorExchange.innerHTML = `
    <div class="check">
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal10" onclick="sevecarrito()">
            <i class="fa-solid fa-cart-shopping"></i>Carrito <span id="numeroCarrito">0</span>
        </button>
        
        <!-- Modal -->
        <div class="modal fade" id="exampleModal10" tabindex="-1" aria-labelledby="exampleModalLabel10" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel10">Carrito</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="cuerpoModal">
                    <form>
                        <div class="mb-3">
                            <p id="textoCarrito">Elige los productos primero</p>
                        </div>
                        </form>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Aceptar</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="vaciar()">Vaciar Carrito</button>
                </div>
            </div>
            </div>
        </div>
    </div>
    `

    lastPrices.innerHTML= `<h3>Ultimos precios del mercado</h3>`
        cryptocurrencies.forEach(cripto => {
            fetch(`https://www.bitstamp.net/api/v2/ticker/${cripto.moneda}/`)
            .then(response => response.json())
            .then(data => {
                lastPrices.innerHTML +=  `<div class="ultimosPrecios">
                <p>Par: ${cripto.moneda}</p>
                <p>Ultimo precio: ${data.last}</p>
                </div>
            `
            }) //si en ${cripto.moneda} coloco data.pair que es lo que deberia ir, no me lo toma
    });


    let numeroCarrito = document.querySelector("#numeroCarrito")


    let monedasEnCarrito;

    const monedasEnCarritoLS = JSON.parse(localStorage.getItem("criptosCarrito"))
    

    if(monedasEnCarritoLS && monedasEnCarritoLS.length > 0){
        monedasEnCarrito = monedasEnCarritoLS   // si hay algo en el LS que lo asigne al nuevo array
        actualizarNumeroCarrito()
    } else {
        monedasEnCarrito = [];
    }

    function agregarAlCarrito(e){
        
        const idBoton = e.currentTarget.id;
        const monedaAgregada = cryptocurrencies.find((cripto) => cripto.id === idBoton);
        // console.log(monedaAgregada)
        
        if(monedasEnCarrito.some(moneda => moneda.id === idBoton)){ // si encuentra en el carrito ya una moneda existente
            const index = monedasEnCarrito.findIndex(moneda => moneda.id === idBoton)
            monedasEnCarrito[index].cantidad++;
        } else {
            monedaAgregada.cantidad = 1;    //asigno a las monedas del array una propiedad nueva que es cantidad
            monedasEnCarrito.push(monedaAgregada)
        }
        actualizarNumeroCarrito()
        // console.log(monedasEnCarrito)
        localStorage.setItem("criptosCarrito", JSON.stringify(monedasEnCarrito)) // agrego array de monedas del carrito al LS
    }

    function actualizarNumeroCarrito(){
        let numeroCarritoActualizado = monedasEnCarrito.reduce((acc, moneda) => acc + moneda.cantidad, 0);
        numeroCarrito.innerText = numeroCarritoActualizado; 
    }
}

function sevecarrito(){
    const criptosEnCarritoLS = JSON.parse(localStorage.getItem("criptosCarrito"))
    let criptosEnCarrito;
    if(criptosEnCarritoLS){
        criptosEnCarrito = criptosEnCarritoLS;
        cuerpoModal.innerHTML = `<p>Estos son los productos agregados al carrito</p>`
        criptosEnCarritoLS.forEach(cripto => {
            cuerpoModal.innerHTML += `
            <h3>Moneda: ${cripto.moneda}</h3>
            <p>Cantidad: ${cripto.cantidad}</p>
            <p>Precio: $ ${cripto.precio}</p>
            <p>Subtotal: ${cripto.precio * cripto.cantidad} USD</p>
            `
            
        })
        const total = criptosEnCarritoLS.reduce((acc, moneda) => acc + (moneda.precio * moneda.cantidad), 0)
        cuerpoModal.innerHTML += `<h3>Total: ${total} USD</h3>`}else{
        criptosEnCarrito = [];
    }
    if(criptosEnCarrito == ""){
        cuerpoModal.innerHTML=  `<p>No hay productos</p>`
        numeroCarrito.innerText= "0"
    }
}


function vaciar(){
    const monedasEnCarritoLS = JSON.parse(localStorage.getItem("criptosCarrito"))
    monedasEnCarritoLS.length = 0
    localStorage.setItem("criptosCarrito", JSON.stringify(monedasEnCarritoLS))
    numeroCarrito.innerText= "0"
}









// **********CODIGO VIEJO - AÑADIENDOLO PROXIMAMENTE ****************

// class Criptomoneda {
//     constructor(precio, moneda, supply) {
//         this.precio = precio;
//         this.moneda = moneda;
//         this.supply = supply;
//     }
// }

// const cripto0 = new Criptomoneda(16529,"BTC",21000000);
// const cripto1 = new Criptomoneda(1197,"ETH",120517315);

// const BBDD = [cripto0,cripto1]; // agrego en BBDD las criptos
// const BBDDLS = localStorage.setItem("BBDD", JSON.stringify(BBDD)) //guarde en LS en texto plano la BBDD
// const BBDDJSON = JSON.parse(localStorage.getItem("BBDD")) //obtengo la BBDD del LS y lo parseo p' traerlo como objetos literal


// if(criptosEnCarritoLS){
//     // criptosEnCarritoLS.forEach(cripto => {
//     //     let textoCarrito = document.querySelector("#textoCarrito")
//     //     textoCarrito.innerText = "Tienes las siguientes monedas en tu carrito"
//     //     div.innerHTML += `
//     //     <h3>Moneda: ${cripto.moneda}</h3>
//     //     <p>Cantidad: ${cripto.cantidad}</p>
//     //     <p>Precio: ${cripto.precio}</p>
//     //     <p>Subtotal: ${cripto.precio * cripto.cantidad}</p>
//     //     <button type="button" class="btn btn-secondary" id="${cripto.id}"><i class="fa-solid fa-trash"></i>Eliminar</button>
//     //     ` 
//     //     div.append(div)
//     // })
//     cuerpoCarritoModal.innerText = `Se agregan productos aqui`
// }else{
//     cuerpoCarritoModal.innerText = `Elige productos`
// }

        // operacionesExchange.innerHTML += <li>${num.moneda} ${num.precio} </li> //las guardo en una lista
        // let comprar = document.createElement("button")  //creo boton para comprar
        // comprar.setAttribute("id", num.id)
        // comprar.setAttribute("class", "btn btn-primary btnCustom")
        // operacionesExchange.append(comprar)
        // comprar.innerText = "Comprar"
        
        
        // let vender = document.createElement("button")   //creo boton para vender
        // vender.setAttribute("id", "vender")
        // vender.setAttribute("class", "btn btn-primary btnCustom")
        // operacionesExchange.append(vender)
        // vender.innerText = "Vender"

    // let comprar = document.createElement("button")  //creo boton para comprar
    // comprar.setAttribute("id", "comprar")
    // comprar.setAttribute("class", "btn btn-primary btnCustom")
    // operacionesExchange.append(comprar)
    // comprar.innerText = "Comprar"

    // let vender = document.createElement("button")   //creo boton para vender
    // vender.setAttribute("id", "vender")
    // vender.setAttribute("class", "btn btn-primary btnCustom")
    // operacionesExchange.append(vender)
    // vender.innerText = "Vender"

    // const btnComprar = document.querySelector("#comprar")  
    // btnComprar.addEventListener("click", comprarmoneda)   //creo evento por si compra

    // const btnVender = document.querySelector("#vender")
    // btnVender.addEventListener("click", vendermoneda)     //creo evento por si vende


// function comprarmoneda(){
//     console.log("esta comprando")
// }


// function opCompra(){
//     // vender.remove() //elimino boton vender
//     // comprar.remove()    //elimino boton comprar
//     let borrarTB = document.querySelector("#textoBienvenida")
//     borrarTB.remove();  //elimino texto bienvenida

//     form.innerHTML = "<p id='instruccion'>Ingrese cual moneda desea comprar. Estas son las monedas disponibles:</p>"
//     let lista = document.createElement("ul")
//     lista.setAttribute("id", "ul")
//     BBDDJSON.forEach((num) =>{  //recorro la BBDD imprimiendo las monedas disponibles
//         lista.innerHTML += `<li>${num.moneda}</li>` //las guardo en una lista
//     }
//     );

//     form.append(lista)

//     let bitcoin = document.createElement("button")
//     bitcoin.setAttribute("id", "btc")
//     bitcoin.setAttribute("class", "btn btn-primary btnCustom")
//     bitcoin.innerText = "BTC"
//     operacionesExchange.append(bitcoin) //agrego boton de BTC al div operacionesExchange
//     let ethereum = document.createElement("button")
//     ethereum.setAttribute("id", "eth")
//     ethereum.setAttribute("class", "btn btn-primary btnCustom")
//     ethereum.innerText = "ETH"
//     operacionesExchange.append(ethereum)  //agrego boton de ETH al div operacionesExchange

//     let btnBTC = document.querySelector("#btc")
//     btnBTC.addEventListener("click", compraBTC) // si quiere comprar btc ejecuto una funcion
//     let btnETH = document.querySelector("#eth")
//     btnETH.addEventListener("click", compraETH)  // si quiere comprar eth ejecuto una funcion
// }

// function compraBTC(){   //solo dejo un input con la cantidad a comprar y el input submit para que lo envie
//     let cambiarInst = document.querySelector("#instruccion")
//     cambiarInst.innerText = "Muy bien! Ahora solo debe ingresar la cantidad a comprar de BTC"
//     let borrarUl = document.querySelector("#ul")
//     borrarUl.remove();
//     operacionesExchange.innerHTML = '<input type="text" class="form-control" id="cantidadCompra" placeholder="Ingrese cantidad">'
//     operacionesExchange.innerHTML += '<input type="submit" class="form-control" id="enviarCompra" value="Comprar"></input>'
//     let enviarCompra = document.querySelector("#enviarCompra")    //capturo el input de "comprar"
//     enviarCompra.addEventListener("click", validacionCompraBTC) //le asigno un evento que primero valida si es correcto
// }

// function compraETH(){   //solo dejo un input con la cantidad a comprar y el input submit para que lo envie
//     let cambiarInst = document.querySelector("#instruccion")
//     cambiarInst.innerText = "Muy bien! Ahora solo debe ingresar la cantidad a comprar de ETH"
//     let borrarUl = document.querySelector("#ul")
//     borrarUl.remove();
//     operacionesExchange.innerHTML = '<input type="text" class="form-control" id="cantidadCompra" placeholder="Ingrese cantidad">'
//     operacionesExchange.innerHTML += '<input type="submit" class="form-control" id="enviarCompra" value="Comprar"></input>'
//     const enviarCompra = document.querySelector("#enviarCompra")    //capturo el input de "comprar"
//     enviarCompra.addEventListener("click", validacionCompraETH) //le asigno un evento de validacion
// }

// function validacionCompraBTC(){ //valida que la cantidad a comprar sea menor que el supply
//     let compraValida = document.querySelector("#cantidadCompra")
//     if(compraValida.value < BBDDJSON[0].supply){
//        finalizarCompraBTC();    // si es menor ejecuta la finalizacion
//     } else {
//         let capInstruccion = document.querySelector("#instruccion")
//         capInstruccion.innerText = `No puedes comprar mas que el supply existente. Que es de ${BBDDJSON[0].supply} ${ BBDDJSON[0].moneda}`
//     }
// }

// function validacionCompraETH(){ //valida que la cantidad a comprar sea menor que el supply
//     let compraValida = document.querySelector("#cantidadCompra")
//     if(compraValida.value < BBDDJSON[1].supply){
//        finalizarCompraETH();    // si es menor ejecuta la finalizacion
//     } else {
//         let capInstruccion = document.querySelector("#instruccion")
//         capInstruccion.innerText = `No puedes comprar mas que el supply existente. Que es de ${ BBDDJSON[1].supply} ${BBDDJSON[1].moneda}`
//     }
// }

// function finalizarCompraBTC(){  // finaliza la compra
//     let cantCompra = document.querySelector("#cantidadCompra")
//     let capInstruccion = document.querySelector("#instruccion")
//     capInstruccion.innerText = `Felicitaciones! Has comprado ${cantCompra.value} ${BBDDJSON[0].moneda}`
//     capInstruccion.innerHTML += `<p>Muchas gracias ${nombreUsuario} por utilizar nuestro exchange</p>`
//     let capInput = document.querySelector("#cantidadCompra")
//     capInput.remove()
//     enviarCompra.remove()
// }

// function finalizarCompraETH(){  // finaliza la compra
//     let cantCompra = document.querySelector("#cantidadCompra")
//     let capInstruccion = document.querySelector("#instruccion")
//     capInstruccion.innerText = `Felicitaciones! Has comprado ${cantCompra.value} ${BBDDJSON[1].moneda}`
//     capInstruccion.innerHTML += `<p>Muchas gracias ${nombreUsuario} por utilizar nuestro exchange</p>`
//     let capInput = document.querySelector("#cantidadCompra")
//     capInput.remove()
//     enviarCompra.remove()
// }

// function opVenta(){     //misma funcionalidad que opCompra()
//     vender.remove()
//     comprar.remove()
//     let borrarTB = document.querySelector("#textoBienvenida")
//     borrarTB.remove();

//     form.innerHTML = "<p id='instruccion'>Ingrese cual moneda desea vender. Estas son las monedas disponibles:</p>"
//     let lista = document.createElement("ul")
//     lista.setAttribute("id", "ul")
//     BBDDJSON.forEach((num) =>{
//         console.log(num.moneda)
//         lista.innerHTML += `<li>${num.moneda}</li>`
//     }
//     );
//     form.append(lista)

//     let bitcoin = document.createElement("button")
//     bitcoin.setAttribute("id", "btc")
//     bitcoin.setAttribute("class", "btn btn-primary btnCustom")
//     bitcoin.innerText = "BTC"
//     operacionesExchange.append(bitcoin)
//     let ethereum = document.createElement("button")
//     ethereum.setAttribute("id", "eth")
//     ethereum.setAttribute("class", "btn btn-primary btnCustom")
//     ethereum.innerText = "ETH"
//     operacionesExchange.append(ethereum)

//     let btnBTC = document.querySelector("#btc")
//     btnBTC.addEventListener("click", ventaBTC)
//     let btnETH = document.querySelector("#eth")
//     btnETH.addEventListener("click", ventaETH)
// }

// function ventaBTC(){    //same function compraBTC() but sell
//     let cambiarInst = document.querySelector("#instruccion")
//     cambiarInst.innerText = "Muy bien! Ahora solo debe ingresar la cantidad a vender de BTC"
//     let borrarUl = document.querySelector("#ul")
//     borrarUl.remove();
//     operacionesExchange.innerHTML = '<input type="text" class="form-control" id="cantidadVenta" placeholder="Ingrese cantidad">'
//     operacionesExchange.innerHTML += '<input type="submit" class="form-control" id="enviarVenta" value="Vender"></input>'
//     const enviarVenta = document.querySelector("#enviarVenta")    //capturo el input de "venta"
//     enviarVenta.addEventListener("click", validacionVentaBTC) //le asigno un evento validacion
// }

// function ventaETH(){    //same function compraETH() but sell
//     let cambiarInst = document.querySelector("#instruccion")
//     cambiarInst.innerText = "Muy bien! Ahora solo debe ingresar la cantidad a vender de ETH"
//     let borrarUl = document.querySelector("#ul")
//     borrarUl.remove();
//     operacionesExchange.innerHTML = '<input type="text" class="form-control" id="cantidadVenta" placeholder="Ingrese cantidad">'
//     operacionesExchange.innerHTML += '<input type="submit" class="form-control" id="enviarVenta" value="Vender"></input>'
//     const enviarVenta = document.querySelector("#enviarVenta")    //capturo el input de "venta"
//     enviarVenta.addEventListener("click", validacionVentaETH) //le asigno un evento validacion
// }

// function validacionVentaBTC(){  //valida que la venta sea menor que el supply
//     let ventaValida = document.querySelector("#cantidadVenta")
//     if(ventaValida.value < BBDDJSON[0].supply){
//         finalizarVentaBTC();    //llama a la finalizacion de la venta
//     } else {
//         let capInstruccion = document.querySelector("#instruccion")
//         capInstruccion.innerText = `No puedes vender mas que el supply existente. Que es de ${BBDDJSON[0].supply} ${ BBDDJSON[0].moneda}`
//     }
// }

// function validacionVentaETH(){   //valida que la venta sea menor que el supply
//     let ventaValida = document.querySelector("#cantidadVenta")
//     if(ventaValida.value < BBDDJSON[1].supply){
//         finalizarVentaETH();    //llama a la finalizacion de la venta
//     } else {
//         let capInstruccion = document.querySelector("#instruccion")
//         capInstruccion.innerText = `No puedes vender mas que el supply existente. Que es de ${BBDDJSON[1].supply} ${ BBDDJSON[1].moneda}`
//     }
// }

// function finalizarVentaBTC(){   //finaliza la venta
//     let cantVenta = document.querySelector("#cantidadVenta")
//     let capInstruccion = document.querySelector("#instruccion")
//     capInstruccion.innerText = `Felicitaciones! Has vendido ${cantVenta.value} ${BBDDJSON[0].moneda}`
//     capInstruccion.innerHTML += `<p>Muchas gracias ${nombreUsuario} por utilizar nuestro exchange</p>`
//     let capInput = document.querySelector("#cantidadVenta")
//     capInput.remove()
//     enviarVenta.remove()
// }

// function finalizarVentaETH(){   //finaliza la venta
//     let cantVenta = document.querySelector("#cantidadVenta")
//     let capInstruccion = document.querySelector("#instruccion")
//     capInstruccion.innerText = `Felicitaciones! Has vendido ${cantVenta.value} ${BBDDJSON[1].moneda}`
//     capInstruccion.innerHTML += `<p>Muchas gracias ${nombreUsuario} por utilizar nuestro exchange</p>`
//     let capInput = document.querySelector("#cantidadVenta")
//     capInput.remove()
//     enviarVenta.remove()
// }

// let usuario = document.getElementById("usuario")
// let password = document.getElementById("password")

// let operacionesExchange = document.getElementById("operacionesExchange")

// localStorage.setItem("moneda", "BTC")

// class Criptomoneda {
//     constructor(precio, moneda, supply) {
//         this.precio = precio;
//         this.moneda = moneda;
//         this.supply = supply;
//     }
// }

// const cripto0 = new Criptomoneda(18284,"BTC",21000000);

// const enJSON = JSON.stringify(cripto0)


// let saldoUSD = 0;
// let saldoVenta = 0;
// let comprar = 0;
// let vender = 0;
// let listingMoneda = [];


// class Criptomoneda {
//     constructor(precio, moneda, supply) {
//         this.precio = precio;
//         this.moneda = moneda;
//         this.supply = supply;
//     }
// }

// const cripto0 = new Criptomoneda(18284,"BTC",21000000);
// const cripto1 = new Criptomoneda(1337,"ETH",120523502);
// const cripto2 = new Criptomoneda(1,"USDT",69524492563);
// const cripto3 = new Criptomoneda(315,"BNB",200000000);
// const cripto4 = new Criptomoneda(0.38,"XRP",100000000000);

// const BBDD = [cripto0,cripto1,cripto2,cripto3,cripto4]; //array de objetos

// const nombreMoneda = BBDD.map((el) => el.moneda);  //del array de objetos saco el nombre de cada moneda
// const precioMoneda = BBDD.map((el) => el.precio);  //del array de objetos saco el precio de cada moneda
// const supplyMoneda = BBDD.map((el) => el.supply);  //del array de objetos saco el supply de cada moneda

// let usuario = prompt ("Ingrese su nombre");
// let password = prompt ("Ingrese su password para confirmar las transacciones")

// while (usuario == ""){
//     alert ("No ingresaste nombre de usuario.");
//     usuario = prompt ("Ingrese su nombre");
// }

// alert ("Bienvenido " + usuario + " a Crypto Club News, aquí puedes comprar bitcoins.");
// let edad = prompt ("Ingrese su edad (solo mayores de edad pueden comprar).");

// do{
//     if (edad >= 18 && edad <= 128) {
//         alert ("Genial! Puedes comprar bitcoins.");
//     }
//     else if (edad > 0 && edad < 18) {
//         alert ("Eres menor. No puedes comprar bitcoins aquí.");
//         edad = prompt ("Ingrese su edad (mayores de edad pueden comprar)."); 
//     }
//     else if (edad <= 0) {
//         alert ("Dato invalido.");
//         edad = prompt ("Ingrese su edad (mayores de edad pueden comprar).");
//     }
//     else if (edad > 128) {
//         alert ("Estupendo! Superaste a Johanna Mazibuko, batiste el Record Guinness " + usuario + "!")
//     }
// }while ((edad <=0) || (edad > 0 && edad < 18))


// function exchange(){

//     let decisionUsuario = prompt("Desea ver la lista de monedas disponibles o desea buscar el nombre de la criptomoneda? \n 1- Deseo ver la lista \n 2- Deseo buscar por mi cuenta");
//     if (decisionUsuario == 1){
//         alert("Las siguientes monedas estan disponibles en nuestro exchange \n" + nombreMoneda);
//         console.log("Datos especificos de las monedas listadas:")
//         console.log(BBDD);
//     } else if (decisionUsuario == 2) {
//         let busquedaMoneda = prompt("Escriba las iniciales del nombre del token o criptomoneda que busca")
//         busquedaMoneda = busquedaMoneda.toUpperCase();
//         let buscarMoneda = BBDD.some((el) => el.moneda == busquedaMoneda) // false => no existe .... true => si existe
//         if (buscarMoneda == false) {
//             alert("Lo lamento, esa moneda no esta listada en nuestro exchange")
//             let usuarioListarMoneda = prompt("Desea enviarnos esa moneda a nuestra BBDD para que la tengamos en cuenta? \n 1- Si \n 2- No")
//             while (usuarioListarMoneda == 1){
//                 listingMoneda.push(busquedaMoneda);
//                 usuarioListarMoneda = prompt ("Desea seguir agregando monedas a la lista de espera? \n 1- Si \n 2- No");
//                 if (usuarioListarMoneda == 1){
//                     busquedaMoneda = prompt("Escriba las iniciales del nombre del token o criptomoneda que desea agregar")
//                     busquedaMoneda = busquedaMoneda.toUpperCase();
//                 }
//             } 
//             alert("Muchas gracias "+ usuario + " por agregar sus monedas preferidas a la lista de espera. \n Dichas monedas son las siguientes: " + listingMoneda);      
//         } else if (buscarMoneda == true) {
//             alert("Enhorabuena! Esa moneda si esta listada en nuestro exchange")
//         }
//     }

//     let opcion = Number(prompt("Ingrese si desea comprar o vender.\n 1- Comprar \n 2- Vender"));

//     while ((opcion != 1) && (opcion != 2)) {
//         alert ("Ha ingresado una opcion no valida");
//         opcion = Number(prompt("Ingrese si desea comprar o vender.\n 1- Comprar \n 2- Vender"));
//     }
//     if (opcion == 1) {
//        comprar = prompt("Cual desea comprar? \n 0- " + cripto0.moneda + "\n 1- " + cripto1.moneda + "\n 2- " + cripto2.moneda + "\n 3- " + cripto3.moneda + "\n 4- " + cripto4.moneda);
//     }
//     if (opcion == 2){
//         vender = prompt("Cual desea vender? \n 0- " + cripto0.moneda + "\n 1- " + cripto1.moneda + "\n 2- " + cripto2.moneda + "\n 3- " + cripto3.moneda + "\n 4- " + cripto4.moneda);
//     }
    
//     switch (opcion) {
//         case 1:
//             saldoUSD = Number(prompt ("Ingrese su saldo en USD."));
//             let compra = Number(prompt("Ingrese cuantos " + nombreMoneda[comprar] + " desea comprar. \n El precio de cada "+ nombreMoneda[comprar] + " es de $" + precioMoneda[comprar] +
//             "\n Su saldo es de $" + saldoUSD));
//             let conversionCompra = compra * precioMoneda[comprar];
//             if (compra > supplyMoneda[comprar]){
//                 alert ("No puede comprar mas " + nombreMoneda[comprar] + " que el suministro maximo.");
//                 alert ("Vuelva a ingresar los datos.");
//             } else if (compra <= 0){
//                 alert ("No a ingresado cantidad valida de compra.");
//                 alert ("Vuelva a ingresar los datos.");
//             } else if ( saldoUSD <= 0){
//                 alert ("No a ingresado cantidad valida de saldo.");
//                 alert ("Vuelva a ingresar los datos.");
//             } else if (conversionCompra > saldoUSD){
//                 alert ("No posee dinero suficiente para comprar " + nombreMoneda[comprar]);
//                 alert ("Vuelva a ingresar los datos.");
//             } else if (saldoUSD >= conversionCompra){
//                 let avisoCompra = prompt("Estas seguro de la compra? \n Ingrese su password para confirmar");
//                 if (avisoCompra === password){
//                     saldoUSD = saldoUSD - conversionCompra;
//                     alert ("Compra realizada con exito, ha comprado una cantidad de " + compra + nombreMoneda[comprar] + " por un total de $" + conversionCompra + " USD. \n Su saldo restante es $" + saldoUSD + " USD.");
//                 } else {
//                     alert ("Password incorrecta. \n Compra no realizada. Su saldo es " + saldoUSD);
//                 }
//             } 
//             break;
//         case 2:   
//             saldoVenta = Number(prompt ("Ingrese su cantidad de " + nombreMoneda[vender] + " en wallet"));
//             let venta = Number(prompt("Ingrese cuantos " + nombreMoneda[vender] + " desea vender. \n El precio de cada "+ nombreMoneda[vender] + " es de $" + precioMoneda[vender] + 
//             "\n Su saldo es de " + saldoVenta + " " + nombreMoneda[vender]));
//             let conversionVenta = venta * precioMoneda[vender];
//             if (venta > saldoVenta){
//                 alert ("No puede vender mas" + nombreMoneda[vender] + " de los que posee")
//                 alert ("Vuelva a ingresar los datos.")
//             } else if (saldoVenta > supplyMoneda[vender]){
//                 alert ("No puede tener mas " + nombreMoneda[vender] + " que el suministro maximo")
//                 alert ("Vuelva a ingresar los datos.")
//             } else if (venta <= 0){
//                 alert ("No a ingresado cantidad valida de venta")
//                 alert ("Vuelva a ingresar los datos.")
//             } else if ( saldoVenta <= 0){
//                 alert ("No a ingresado cantidad valida de " + nombreMoneda[vender] + " en wallet")
//                 alert ("Vuelva a ingresar los datos.")
//             } else if (saldoVenta >= venta){ 
//                 let avisoVenta = prompt("Estas seguro de la venta? \n Ingrese su password para confirmar")
//                 if (avisoVenta === password) {
//                     saldoVenta = saldoVenta - venta;
//                     alert ("Venta realizada con exito, ha vendido una cantidad de " + venta + nombreMoneda[vender] +" por un total de $" + conversionVenta + " USD. \n Su cantidad restante es de " + saldoVenta + nombreMoneda[vender] +" en wallet.");
//                 } else {
//                     alert ("Password incorrecta. Venta no realizada. \n Su saldo es " + saldoVenta);
//                 }
//             }
//             break;
//     }
// }

// let utilizarCalculadora = Number(prompt("Desea realizar alguna operacion? \n 1- Si \n 2- No"));

// while ((utilizarCalculadora < 1) || (utilizarCalculadora > 2)) {
//     alert ("Opcion no valida. Ingrese nuevamente")
//     utilizarCalculadora = Number(prompt("Desea  realizar alguna operacion? \n 1- Si \n 2- No"));
// }

// if (utilizarCalculadora == 1){
//     exchange();
//     let seguirUtilizando = prompt("Desea seguir utilizando el exchange? \n 1- Si \n 2- No")
//     while (seguirUtilizando == 1){
//         exchange();
//         seguirUtilizando = prompt ("Desea seguir utilizando el exchange? \n 1- Si \n 2- No");
//     }    
//     alert ("Muchas gracias " + usuario + " por utilizar el exchange de Crypto Club News.\n Nos vemos pronto!");
// } else if (utilizarCalculadora == 2){
//     alert ("Muchas gracias " + usuario + " por utilizar el exchange de Crypto Club News.\n Nos vemos pronto!");
// }
//crea arreglos con los ingresos y egresos
const ingresos=[
    new Ingresos('Sueldo', 2100.00),
    new Ingresos('Venta maquina', 1500.00)
];

const egresos=[
    new Egresos("Arriendo", 1900.00),
    new Egresos("Ropa", 1600.00)
];



//carga las funcines para actualizar la información en la pagina
var cargarApp = () =>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

//halla el valor total de egresos e ingresos

let totalIngresos = () =>{
    let totalIngreso = 0;
    for (let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = () =>{
    let totalEgreso = 0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

// Carga la información al cabecero del html 

let cargarCabecero = () =>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
    document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById("ingresos").innerHTML = formatoMoneda(totalIngresos());
    document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
}

// Da formato a los valores economicos y los porcentajes

let formatoMoneda= (valor) =>{
    return valor.toLocaleString("es-CO", {style: "currency", currency: "COP", minimunFractionDigits:2});
}

let formatoPorcentaje = (valor) => {
    return valor.toLocaleString("en-US", {style:"percent", minimunFractionDigits:1});
}

// Agrega dinamicamente los ingresos 

const cargarIngresos = () => {
    let ingresosHtml = "";
    for (let ingreso of ingresos){
        ingresosHtml += crearIngresoHTML(ingreso);
    }
    document.getElementById("lista-ingresos").innerHTML = ingresosHtml;
}

const crearIngresoHTML= (ingreso) =>{
    let ingresoHTML =  `
    <div class='elemento limpiarEstilos'>
        <div class='elemento_descripcion'>${ingreso.tipo}</div>
        <div class='derecha limpiarEstilos'>
            <div class='elemento_valor'>+ ${formatoMoneda(ingreso.valor)}</div>
            <div class='elemento_eliminar'>
                <button class='elemento_eliminar--btn'>
                    <ion-icon name='trash' onclick="eliminarIngreso(${ingreso._idIngreso})"></ion-icon>
                </button>
            </div>
        </div>
    </div>`;
    return ingresoHTML;
}

const eliminarIngreso = (id) => {
    //find funciona como un for
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso._idIngreso === id);
    ingresos.splice(indiceEliminar, 1); //elimina un elemento de la lista 
    cargarCabecero();
    cargarIngresos();
}

// Agrega dinamicamente los egresos

const cargarEgresos = () => {
    let egresoHtml = "";
    for (let egreso of egresos){
        egresoHtml += cargarEgresoHtml(egreso);
    }
    document.getElementById("lista-egresos").innerHTML = egresoHtml;

}

const cargarEgresoHtml = (egreso) =>{
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${egreso.tipo}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">-${formatoMoneda(egreso.valor)}</div>
                        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="trash" onclick="eliminarEgreso(${egreso._idEgreso})"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
    `;
    return egresoHTML;
    
}

const eliminarEgreso = (id) => {
    //find funciona como un for
    let indiceEliminar = egresos.findIndex(egreso => egreso._idEgreso === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}

const agregarDato = () =>{
    let forma = document.forms["forma"];
    let tipo = forma["tipo"];
    let descripcion = forma["descripcion"];
    let valor = forma["valor"];

    if (descripcion.value != "" && valor.value !=""){
        if(tipo.value === "ingreso"){
            ingresos.push(new Ingresos(descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();
        }else if(tipo.value === "egreso"){
            egresos.push(new Egresos(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
        }
    }
}
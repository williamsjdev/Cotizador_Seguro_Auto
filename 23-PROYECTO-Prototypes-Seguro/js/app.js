//! Constructores

function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

//! Realiza la cotizacion con los datos
Seguro.prototype.cotizarSeguro = function() {
    
    let cantidad;
    const base = 2000;
    
    switch(this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;
    }

    //! Leer el año
    const diferencia = new Date().getFullYear() - this.year;

    //! Con cada año menor el valor se va a reducir un 3%
    cantidad -= ((diferencia * 3) * cantidad ) / 100;

    /*
    Si el seguro en basico se aumenta un 30%
    si el seguro es completo se aumenta un 50%
    */

    if(this.tipo === 'basico') {
        cantidad *= 1.30;
    }else {
        cantidad *= 1.50;
    }

    return cantidad;
} 



function UI () {}

//! Llena las opciones de los años

UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear()
          min = max - 20;
          
    const selectYear = document.querySelector('#year');
    
    
    for(let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

//! Muestra alertas en pantalla 
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('div');

    if(tipo === 'error') {
        div.classList.add('error');
    }else {
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    //! Insertar el HTML 
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);
}

UI.prototype.motrarResultado = (total, seguro ) => {

    const { marca, year, tipo } = seguro;

    let textoMarca;

    switch(marca) {
        case '1':
            textoMarca = 'Americano';
            break;
        case '2':
            textoMarca = 'Asiatico';
            break;
        case '3':
            textoMarca = 'Europeo';
            break;
        default:
            break;
    }
    

    //! Crear el resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Marca: <spam class="font-normal"> ${textoMarca} </spam></p>
        <p class="font-bold">Año: <spam class="font-normal"> ${year} </spam></p>
        <p class="font-bold">Tipo: <spam class="font-normal capitalize"> ${tipo} </spam></p>
        <p class="font-bold">Total: <spam class="font-normal"> $ ${total} </spam></p>
    `;

    const resultadoDiv = document.querySelector('#resultado');

    //! Mostrar el spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none'; //! Se borra el spinner 
        resultadoDiv.appendChild(div);  //! Se muestra el resultado
    }, 3000);
}


//! Instanciar UI
const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones();  //! LLena la barra de select con los años
})



eventListener();
function eventListener() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro)
}

function cotizarSeguro (e) {
    e.preventDefault;

    //! Leer la marca seleccionada
    const marca = document.querySelector('#marca').value;
    //! Leer el año seleccionad
    const year = document.querySelector('#year').value;
    //! Leer el tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    

    if(marca === '' || year === '' || tipo === '') {
        ui.mostrarMensaje('Todos los Campos son Obligatorios', 'error');
    }
    
    ui.mostrarMensaje('Cotizando...', 'exito');

    //! Ocultar las cotizaciones pasadas 
    const resultados = document.querySelector('#resultado div');
    if(resultados != null) {
        resultados.remove();
    }

    //! Instanciar el seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();


    //! Utilizar el prototype que va a cotizar
    ui.motrarResultado(total, seguro);
}


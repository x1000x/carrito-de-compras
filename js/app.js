//1.-crea las variables y valida que solo el boton funcione en el evento (evita el bubling)
//2.- lee los datos del curso seleccionado y va al contenido padre con parentElement,crea la funcion leerDatosCurso, crea un objeto infoCurso
//3.- agrega el curso al carro de compras, agrega la variable articulosCarrito vacia y despues la llena
//4.- agrega las demas cosas al carrito, agrega el boton para eliminafr el carrito
//5.- aumenta la cantidad cuando corresponde, hace la funcion existe y cursos
//6.- eliminar elementos del carrito de compras

const carrito = document.querySelector('#carrito');//carrito de la pagina
const contenedorCarrito= document.querySelector('#lista-carrito tbody'); // es donde se pondra la informacion del carrito especificacmente
const vaciarCarrito = document.querySelector('#vaciar-carrito');//boton para vaciar el carrito
const listaCursos = document.querySelector('#lista-cursos');//div donde se encuentran los cursos
let articulosCarrito=[]//arreglo que se llenara desde los datos de las tarjetas 


cargarEventListeners();
 function cargarEventListeners(){
     //agregar un curso presionando agregar carrito
    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso );

    //vaciar el carrito completo
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito=[];//reseteamos el arreglo

        limpiarHtml();//eliminamos todo el html
    } )

}

//funciones

function agregarCurso(e){

    e.preventDefault();    

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCursos(cursoSeleccionado);
    }
   
}
//elimina cursos del carrito de compras
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //elimina del arreglo el articulo seleccionado por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !==cursoId);

        carritoHtml();
    }
    
    
}

//lee el contenido del html al que le dimos click y extrae la informacion
function leerDatosCursos(curso){

 const infoCurso = { 
     imagen : curso.querySelector('img').src,
     titulo: curso.querySelector('h4').textContent,
     precio :curso.querySelector('.precio span').textContent,
     id : curso.querySelector('a').getAttribute('data-id'), 
     cantidad: 1
 }

//ver si el elemento existe en el carrito
const existe= articulosCarrito.some(curso => curso.id ===infoCurso.id);
if(existe){
//actualizamos la cantidad
const cursos = articulosCarrito.map(curso => {
    if (curso.id ===infoCurso.id){
        curso.cantidad++;
        return curso;
    }
    else{
        return curso;
    }
});

articulosCarrito=[...cursos];

}
else{
//agrega elementos al arreglo de carrito
articulosCarrito = [...articulosCarrito, infoCurso];
}




carritoHtml();
}

//crea el carrito de compras para pasarlo html

function carritoHtml(){
//limpia el html
limpiarHtml();

//recorre el carrito
    articulosCarrito.forEach(curso =>{
        const row = document.createElement('tr');
        row.innerHTML=`
        <td><img src=" ${curso.imagen}" width= "100"></td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad}</td>
        <td> <a href ="#" class="borrar-curso" data-id="${curso.id}">X</a> </td>
       
        `;
//Agrega el carrito al html
contenedorCarrito.appendChild(row);

    })
}

function limpiarHtml(){
    contenedorCarrito.innerHTML='';
}
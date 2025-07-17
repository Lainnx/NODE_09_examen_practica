// Javascript del cliente

// Obtener el formulario
const formApellidoLetra = document.getElementById("formApellidoLetra");

function fIniciales (e){
    e.preventDefault()
    let iniciales = document.getElementById("letras-apellido").value
    // alert(iniciales)
    iniciales ="/alumnos/" + iniciales
    window.location.href = iniciales
}

formApellidoLetra.addEventListener("submit",(e)=>{
    fIniciales(e)
})
formApellidoLetra.addEventListener("change",(e)=>{
    fIniciales(e)
})

let registro=document.getElementById("registro")
let oprimido=document.getElementById("oprimido")

oprimido.addEventListener("click",f)
function f(){
    let v=registro.value
    localStorage.setItem("id",v)
}


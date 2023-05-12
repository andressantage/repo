let n = document.querySelector("#n");
let solo = document.querySelector("#solo");
n.innerHTML=localStorage.getItem("id")

let origen = document.querySelector("#origen");
let destino = document.querySelector("#destino");

let myForm = document.querySelector("#myForm");

let config = {
    headers:new Headers({//espera que el API le envuelva un JSON // para decirle que la informacion que le va a mandar es json
        "Content-Type": "application/json"
    }), 
};
const getUserAll1 = async()=>{
    config.method = "GET";//para designar el metodo que se ejecutara
    let res = await ( await fetch("http://localhost:4001/clientes",config)).json();//await es para esperar que algo suceda
    //.json() convierte el archivo a json// 
    for(var i=0;i<res.length;i++){
        if(localStorage.getItem("id")==res[i].id){
            solo.innerHTML=`
            <div class="mb-1">
                <label class="form-label">Nombre: </label>
                <label type="number" id="n1" class="form-control" name="nombre">
            </div>    
            <div class="mb-1">
                <label class="form-label">Apellidos: </label>
                <label type="number" id="n2" class="form-control" name="apellido">
            </div>    
            <div class="mb-1">
                <label class="form-label">Correo electrónico: </label>
                <label type="email" id="n3" class="form-control" name="correo">
            </div>    
            `
            let n1 = document.querySelector("#n1");
            let n2 = document.querySelector("#n2");
            let n3 = document.querySelector("#n3");
            n1.textContent=res[i].nombre
            n2.innerHTML=res[i].apellido
            n3.innerHTML=res[i].correo   
            console.log("si esta")     
        }
    }
    
    console.log(res);
}
getUserAll1()

myForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    opc[e.submitter.dataset.accion](data)    
})

const opc = {
    "GET": () => getUserAll(),
    "PUT": (data) => putUser(data),
    "DELETE": (data) => deleteUser(data),
    "SEARCH": (data) => searchUser(data),
    POST: function(data){
        return postUser(data)
    }
}
// config.body = JSON.stringify();

/* const getUserAll = async()=>{
    config.method = "GET";//para designar el metodo que se ejecutara
    let res = await ( await fetch("http://localhost:4001/etiqueta",config)).json();//await es para esperar que algo suceda
    //.json() convierte el archivo a json// 
    console.log(res);
}
 */
const getUserAll = async()=>{
    config.method = "GET";//para designar el metodo que se ejecutara
    let rutas = await ( await fetch("http://localhost:4001/rutas",config)).json();//await es para esperar que algo suceda
    //.json() convierte el archivo a json// 
    for(var i=0;i<rutas.length;i++){
        if(origen.value==rutas[i].ciudadOrigen && destino.value==rutas[i].ciudadDestino){
            alert("Si coincide con las rutas de origen y destino pára una ruta")
        }
    }

}


const postUser = async(data)=>{
    config.method = "POST";
    config.body = JSON.stringify(data);//config.body = JSON.stringify(data) // convierte un objeto literal en json
    let res = await ( await fetch("http://localhost:4001/etiqueta",config)).json();
    console.log(res);
}
const putUser = async(data)=>{
    config.method = "PUT";
    config.body = JSON.stringify(data);
    let res = await ( await fetch(`http://localhost:4001/etiqueta/${data.id}`,config)).json();
    console.log(res);
}
const deleteUser = async(data)=>{
    config.method = "DELETE";
    let res = await ( await fetch(`http://localhost:4001/etiqueta/${data.id}`,config)).json();
    console.log(res);
}
const searchUser = async(data)=>{
    config.method = "GET";
    let res = await ( await fetch(`http://localhost:4001/etiqueta?q=${Object.values(data).join("")}`,config)).json();
    console.log(res);
}
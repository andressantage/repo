const opc1 = {
    "SEARCH": (data1) => searchUser1(data1),
}
const searchUser1 = async(data1)=>{
    config.method = "GET";
    let res = await ( await fetch(`http://localhost:4001/clientes?q=${Object.values(data1).join("")}`,config)).json();
    console.log(res);
    alert("El usuario es"+res)
}

let  nombre1= document.querySelector("#nombre1");
let  apellido1= document.querySelector("#apellido1");
let  id1= document.querySelector("#id1");
let  valorBuscar= document.querySelector("#valorBuscar");
nombre1.addEventListener("click",f1)
function f1(){
    let x10=nombre1.textContent+':'
    myForm1.innerHTML=
    `
    <div class="mb-3">
        <label class="form-label">${x10}</label>
        <input type="text" class="form-control" name="nombre">
    </div>
    <div class="d-grid">
        <input type="submit" class="btn btn-primary" id="buscar" data-accion="SEARCH" value="Buscar">
    </div>
    `
}
apellido1.addEventListener("click",f2)
function f2(){
    let x10=apellido1.textContent+':'
    myForm1.innerHTML=
    `
    <div class="mb-3">
        <label class="form-label">${x10}</label>
        <input type="text" class="form-control" name="apellido">
    </div>
    <div class="d-grid">
        <input type="submit" class="btn btn-primary" id="buscar" data-accion="SEARCH" value="Buscar">
    </div>
    `
}
id1.addEventListener("click",f3)
function f3(){
    let x10=id1.textContent+':'
    myForm1.innerHTML=
    `
    <div class="mb-3">
        <label class="form-label">${x10}</label>
        <input type="text" class="form-control" name="id">
    </div>
    <div class="d-grid">
        <input type="submit" class="btn btn-primary" id="buscar" data-accion="SEARCH" value="Buscar">
    </div>
    `
}

let myForm1 = document.querySelector("#myForm1");
let buscador = document.querySelector("#buscador")
myForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    let data1 = Object.fromEntries(new FormData(e.target));
    opc[e.submitter.dataset.accion](data)    
})



let myForm = document.querySelector("#myForm");
let rest = document.querySelector(".card")
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
let config = {
    headers:new Headers({//espera que el API le envuelva un JSON // para decirle que la informacion que le va a mandar es json
        "Content-Type": "application/json"
    }), 
};

const getUserAll = async()=>{
    config.method = "GET"
    let res = await ( await fetch("http://localhost:4001/clientes",config)).json();//await es para esperar que algo suceda
    const cliente = res.map(({id,nombre,apellido,telefono,fecha,ciudad,pais,correo}) => ({id,nombre,apellido,telefono,fecha,ciudad,pais,correo}))
    let y1=`
        <div class="card-header">
            Lista de clientes
        </div>
        <div class="p-4">
            <table class="table align-middle">
                <thead>
                    <tr>
                        <th scope="col">Numero de identificación</th>
                        <th scope="col">Nombres</th>
                        <th scope="col">Apellidos</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Fecha de nacimiento</th>
                        <th scope="col">Ciudad de origen</th>
                        <th scope="col">Pais de origen</th>
                        <th scope="col">Correo electronico</th>
                        <th scope="col" colspan="2">Opciones</th>
                    </tr>
                </thead>
                <tbody id="asom">
    `
    let y2=`
        </tbody>
    </table>

    <div class="a3">
    <button class="btn btn-primary" onclick="location.reload()">Volver</button>
    </div>

    </div>
    `
    let x=""
    for(let i=0;i<cliente.length;i++){
        let {id,nombre,apellido,telefono,fecha,ciudad,pais,correo} = cliente[i]
        x=x+`<tr>
                <td scope="row">${id}</td>
                <td>${nombre}</td>
                <td>${apellido}</td>
                <td>${telefono}</td>
                <td>${fecha}</td>
                <td>${ciudad}</td>
                <td>${pais}</td>
                <td>${correo}</td>
                <td><a class="text-success" href=""><i class="bi bi-pencil-square"></i></a></td>
                <td><a class="text-danger" href=""><i class="bi bi-trash"></i></a></td>
            </tr>`
        }
    rest.innerHTML=y1+x+y2
    console.log(res);
    console.log(x);
}

/* const getUserAll = async()=>{
    config.method = "GET";//para designar el metodo que se ejecutara
    let res = await ( await fetch("http://localhost:4001/clientes",config)).json();//await es para esperar que algo suceda
    //.json() convierte el archivo a json// 
    console.log(res);
} */

const postUser = async(data)=>{
    config.method = "POST";
    config.body = JSON.stringify(data);//config.body = JSON.stringify(data) // convierte un objeto literal en json
    let res = await ( await fetch("http://localhost:4001/clientes",config)).json();
    console.log(res);
}
const putUser = async(data)=>{
    config.method = "PUT";
    config.body = JSON.stringify(data);
    let res = await ( await fetch(`http://localhost:4001/clientes/${data.id}`,config)).json();
    console.log(res);
}
const deleteUser = async(data)=>{
    config.method = "DELETE";
    let res = await ( await fetch(`http://localhost:4001/clientes/${data.id}`,config)).json();
    console.log(res);
}
const searchUser = async(data)=>{
    config.method = "GET";
    let res = await ( await fetch(`http://localhost:4001/clientes?q=${Object.values(data).join("")}`,config)).json();
    console.log(res);
}
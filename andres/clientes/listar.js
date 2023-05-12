let  nombre1= document.querySelector("#nombre1");
let  apellido1= document.querySelector("#apellido1");
let  id1= document.querySelector("#id1");
let  valorBuscar= document.querySelector("#valorBuscar");

let rest = document.querySelector(".card")

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
        <a href="clientes.html"><button class="btn btn-primary">Volver</button></a>
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
                <td><a class="text-success" id="editar"><i class="bi bi-pencil-square"></i></a></td>
                <td><a class="text-danger" id="borrar" ><i class="bi bi-trash"></i></a></td>
            </tr>`
        }
    rest.innerHTML=y1+x+y2
    console.log(res);
    console.log(x);
}
getUserAll()


let mostrar= document.querySelector(".a1");
let borrar= document.querySelector("#borrar");
let editar= document.querySelector("#editar");

borrar.addEventListener('click', function() {
    if (mostrar.style.display === 'none') {
        mostrar.style.display = 'grid';
    } else {
        mostrar.style.display = 'none';
    }
});
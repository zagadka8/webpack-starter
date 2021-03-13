import '../css/componentes.css';


export const saludar = (nombre) =>{
    console.log ('creando un H1, desde componentes hola?');
    const h1 = document.createElement('h1');
    h1.innerText = `Hol ${nombre} toda la vida??`;
    document.body.append(h1);
}
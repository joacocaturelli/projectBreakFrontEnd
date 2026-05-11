const linksContainer = document.getElementById('links-generated-container')


export function linksGenerator (linkObj, onDelete) { // Exportamos la funcion para crear los botones de links

    const  {id, title, link} = linkObj; // Desestructuramos el objeto para obtener el id, el nombre del enlace y la URL

    if (!link || !title) return; // Comprobamos que los campos esten completos
    
    const linkGeneratedContainer = document.createElement('div') // Creamos un div para contener la tarjeta con el link
    linkGeneratedContainer.classList.add('linkGeneratedContainer') // Le creamos una clase
    linkGeneratedContainer.dataset.id = id; // Le añadimos un atributo data con el id del enlace para poder identificarlo luego
    linksContainer.appendChild(linkGeneratedContainer) // Lo metemos dentro del contenedor

    const linkGenerated = document.createElement('a') // Creamos un enlace para contener el boton
    linkGenerated.href = link // La direccion del enlace sera la que ingrese el usuario
    linkGenerated.target = '_blank' // Hacemos que el enlace se abra en una nueva pestaña
    linkGenerated.rel = 'noopener noreferrer'; // Y le añadimos seguridad
    linkGeneratedContainer.appendChild(linkGenerated) // Lo metemos dentro del div contenedor

    const btnLink = document.createElement('button') // Creamos el boton
    btnLink.textContent = title // Renderizamos el nombre del enlace que ingreso el usuario
    btnLink.classList.add('btnLink') // Le añadimos las clases
    linkGenerated.appendChild(btnLink) // Lo metemos dentro del enlace

    const btnDeleteLink = document.createElement('button') // Creamos el boton para eliminar el enlace
    btnDeleteLink.classList.add('btnDelete') // Le creamos una clase
    btnDeleteLink.textContent = 'x' // Renderizamos la x para mostrarle al usuario la funcion de eliminar
    linkGeneratedContainer.appendChild(btnDeleteLink) // Lo metemos dentro del contenedor (no del enlace)

    linksContainer.classList.remove('hide') // Quitamos la clase hide para que se vea el contenedor

    btnDeleteLink.addEventListener('click', ()=> { // Añadimos un listener al boton de borrar
            
        linkGeneratedContainer.remove() // Creamos la funcion para elminar la tarjeta con el enlace
        onDelete(id) // Llamamos a la funcion con el id del enlace para eliminarlo del array y del localStorage

       if (linksContainer.children.length === 0) { // Si ya no queda ninguna tarjeta dentro del contenedor

            linksContainer.classList.add('hide'); // Volvemos a añadir la clase hide
        }
    })
}


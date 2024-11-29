// Llama al backend para obtener los libros paginados
const fetchBooks = async (page = 1, limit = 60) => {
    try {
        const response = await fetch(`/libros?page=${page}&limit=${limit}`);
        if (!response.ok) {
            throw new Error(`Error al cargar libros: ${response.statusText}`);
        }

        const data = await response.json();
        renderBooks(data.books);
    } catch (error) {
        console.error(error);
        alert("Hubo un problema al cargar los libros.");
    }
};

// Función para renderizar los libros en la tabla
// Función para renderizar los libros en la tabla
// Función para renderizar los libros en la tabla
const renderBooks = (books) => {
    const tableBody = document.getElementById("resultsTable");
    tableBody.innerHTML = ""; // Limpia los resultados previos

    books.forEach(book => {
        const row = document.createElement("tr");

        // Título del libro
        const titleCell = document.createElement("td");
        titleCell.textContent = book.titulo_libro;

        // Autor(es) del libro
        const authorCell = document.createElement("td");
        authorCell.textContent = book.autores.map(a => a.nombre_autor).join(", ");

        // Género(s) del libro
        const genreCell = document.createElement("td");
        genreCell.textContent = book.generos.map(g => g.nombre_genero).join(", ");

        // Disponibilidad del libro (muestra la cantidad disponible)
        const availabilityCell = document.createElement("td");
        availabilityCell.textContent = book.disponibilidad_libro;  // Aquí se muestra la cantidad de libros disponibles

        // Año de publicación
        const yearCell = document.createElement("td");
        yearCell.textContent = book.fecha_publicacion_libro;

        // Añadir las celdas a la fila
        row.appendChild(titleCell);
        row.appendChild(yearCell); // Añadir la celda del año
        row.appendChild(authorCell);
        row.appendChild(genreCell);
        row.appendChild(availabilityCell); // Añadir la celda de disponibilidad

        // Añadir la fila a la tabla
        tableBody.appendChild(row);
    });
};



// Cargar todos los libros cuando la página se cargue
document.addEventListener("DOMContentLoaded", () => {
    fetchBooks(); // Llama al backend para obtener todos los libros
});

// Busca libros con el formulario
const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const query = document.getElementById("searchQuery").value;
    try {
        const response = await fetch(`/libros?q=${query}`);
        if (!response.ok) {
            throw new Error(`Error en la búsqueda: ${response.statusText}`);
        }

        const data = await response.json();
        renderBooks(data.books);
    } catch (error) {
        console.error(error);
        alert("Hubo un problema con la búsqueda.");
    }
});
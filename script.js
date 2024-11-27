// Inicializamos variables globales
let empleadosRegistrados = 0;
let edadesEmpleados = []; // Array para almacenar las edades de los empleados

// Inicializamos la gráfica
const ctx = document.getElementById('chartCanvas').getContext('2d');
const chart = new Chart(ctx, {
    type: 'bar',  // Usamos barras
    data: {
        labels: [], // Se agregarán las etiquetas de cada empleado
        datasets: [{
            label: 'Edad de los Empleados',
            data: [], // Se llenará con las edades de los empleados
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 100, // Establecemos un límite máximo en el eje Y (para las edades)
                title: {
                    display: true,
                    text: 'Edad'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Empleado'
                }
            }
        }
    }
});

// Elementos del DOM
const form = document.getElementById('employee-form');
const edadesHijosContainer = document.getElementById('edadesHijosContainer');
const mascotas = document.getElementById('mascotas');
const tipoMascotaContainer = document.getElementById('tipoMascotaContainer');

// Manejar la lógica de las edades de los hijos
form.cantidadHijos.addEventListener('input', function () {
    const cantidad = parseInt(this.value, 10) || 0;
    edadesHijosContainer.innerHTML = '';
    for (let i = 1; i <= cantidad; i++) {
        const label = document.createElement('label');
        label.textContent = Edad del Hijo ${i}:;
        const input = document.createElement('input');
        input.type = 'number';
        input.name = edadHijo${i};
        input.required = true;
        edadesHijosContainer.appendChild(label);
        edadesHijosContainer.appendChild(input);
    }
});

// Mostrar tipo de mascota si seleccionan "Sí"
mascotas.addEventListener('change', function () {
    tipoMascotaContainer.style.display = this.value === 'Sí' ? 'block' : 'none';
});

// Procesar el formulario
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Evitamos recargar la página

    // Obtenemos la edad del empleado
    const edad = parseInt(form.edad.value, 10);

    // Aumentamos el contador de empleados registrados
    empleadosRegistrados++;

    // Añadimos la edad a la lista de edades
    edadesEmpleados.push(edad);

    // Actualizamos las etiquetas (Empleados 1, Empleados 2, ...)
    chart.data.labels.push(Empleado ${empleadosRegistrados});

    // Actualizamos los datos de la gráfica con la edad del empleado
    chart.data.datasets[0].data.push(edad);

    // Actualizamos la gráfica
    chart.update();

    // Reiniciar el formulario
    form.reset();
    edadesHijosContainer.innerHTML = '';
    tipoMascotaContainer.style.display = 'none';

    alert('Empleado registrado exitosamente.');
});

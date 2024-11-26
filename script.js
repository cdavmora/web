<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Empleados</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        #reloj {
            font-size: 1.2rem;
            color: #333;
            background-color: #f9f9f9;
            padding: 10px 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            text-align: center;
            margin: 10px auto;
            display: inline-block;
        }
    </style>
</head>
<body>
    <!-- Reloj -->
    <div id="reloj">00:00:00</div>

    <!-- Formulario para registrar empleados -->
    <h1>Registro de Empleados</h1>
    <form id="employee-form">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required><br>

        <label for="edad">Edad:</label>
        <input type="number" id="edad" name="edad" required><br>

        <label for="cantidadHijos">Cantidad de Hijos:</label>
        <input type="number" id="cantidadHijos" name="cantidadHijos" min="0"><br>

        <div id="edadesHijosContainer"></div>

        <label for="mascotas">¿Tiene mascotas?</label>
        <select id="mascotas" name="mascotas">
            <option value="No">No</option>
            <option value="Sí">Sí</option>
        </select><br>

        <div id="tipoMascotaContainer" style="display: none;">
            <label for="tipoMascota">Tipo de mascota:</label>
            <input type="text" id="tipoMascota" name="tipoMascota"><br>
        </div>

        <button type="submit">Registrar Empleado</button>
    </form>

    <!-- Gráfica -->
    <h2>Edades de Empleados Registrados</h2>
    <canvas id="chartCanvas" width="400" height="200"></canvas>

    <script>
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
                label.textContent = `Edad del Hijo ${i}:`;
                const input = document.createElement('input');
                input.type = 'number';
                input.name = `edadHijo${i}`;
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
            chart.data.labels.push(`Empleado ${empleadosRegistrados}`);

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

        // Función para actualizar el reloj
        function actualizarReloj() {
            const ahora = new Date();
            const horas = String(ahora.getHours()).padStart(2, '0');
            const minutos = String(ahora.getMinutes()).padStart(2, '0');
            const segundos = String(ahora.getSeconds()).padStart(2, '0');
            const reloj = document.getElementById('reloj');
            reloj.textContent = `${horas}:${minutos}:${segundos}`;
        }

        // Actualiza el reloj cada segundo
        setInterval(actualizarReloj, 1000);

        // Inicializa el reloj al cargar la página
        actualizarReloj();
    </script>
</body>
</html>

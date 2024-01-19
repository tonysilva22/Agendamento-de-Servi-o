var appointments = JSON.parse(localStorage.getItem('appointments')) || [];
var listContainer = document.getElementById('appointmentsList');
var filterDateSelect = document.getElementById('filterDate');

function displayAppointments() {
    listContainer.innerHTML = '';
    appointments.forEach(appointment => {
        var row = createAppointmentRow(appointment);
        listContainer.appendChild(row);
    });
}

function createAppointmentRow(appointment) {
    var row = document.createElement('tr');
    row.innerHTML = `
        <td>${appointment.clientName}</td>
        <td>${appointment.appointmentDate}</td>
        <td>${appointment.serviceType}</td>
        <td>${appointment.appointmentTime}</td>
        <td><button class="cancel-button" onclick="cancelAppointment('${appointment.appointmentDate}', '${appointment.appointmentTime}')">Cancelar</button></td>
    `;
    return row;
}

function populateFilterDates() {
    var uniqueDates = [...new Set(appointments.map(appointment => appointment.appointmentDate))];
    var filterDateOptions = '<option value="all">Todas as Datas</option>';
    uniqueDates.forEach(date => {
        filterDateOptions += `<option value="${date}">${date}</option>`;
    });
    filterDateSelect.innerHTML = filterDateOptions;
}

function filterAppointments() {
    var selectedDate = filterDateSelect.value;
    if (selectedDate === 'all') {
        displayAppointments();
    } else {
        var filteredAppointments = appointments.filter(appointment => appointment.appointmentDate === selectedDate);
        listContainer.innerHTML = '';
        filteredAppointments.forEach(appointment => {
            var row = createAppointmentRow(appointment);
            listContainer.appendChild(row);
        });
    }
}

function cancelAppointment(date, time) {
    var confirmation = confirm(`Deseja cancelar o agendamento para ${date} às ${time}?`);
    if (confirmation) {
        appointments = appointments.filter(appointment => !(appointment.appointmentDate === date && appointment.appointmentTime === time));
        localStorage.setItem('appointments', JSON.stringify(appointments));
        displayAppointments();
        populateFilterDates();
    }
}

displayAppointments();
populateFilterDates();

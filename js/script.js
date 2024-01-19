document.addEventListener('DOMContentLoaded', function () {
    var select = document.getElementById('appointmentTime');
    for (var hour = 8; hour <= 17; hour++) {
        for (var minute = 0; minute < 60; minute += 30) {
            var time = (hour < 10 ? '0' : '') + hour + ':' + (minute === 0 ? '00' : minute);
            var option = document.createElement('option');
            option.value = time;
            option.text = time;
            select.appendChild(option);
        }
    }
});

function scheduleAppointment() {
    var clientName = document.getElementById('clientName').value;
    var appointmentDate = document.getElementById('appointmentDate').value;
    var serviceType = document.getElementById('serviceType').value;
    var appointmentTime = document.getElementById('appointmentTime').value;

    if (clientName.trim() === '' || appointmentDate === '' || serviceType === '' || appointmentTime === '') {
        alert('Por favor, preencha todos os campos.');
    } else {
        // Construir objeto com os dados do agendamento
        var appointmentData = {
            clientName: clientName,
            appointmentDate: appointmentDate,
            serviceType: serviceType,
            appointmentTime: appointmentTime
        };

        // Obter dados antigos do localStorage (se existirem)
        var existingAppointments = JSON.parse(localStorage.getItem('appointments')) || [];

        // Verificar se o horário já foi reservado para a data específica
        if (isTimeReserved(existingAppointments, appointmentDate, appointmentTime)) {
            alert('Este horário já foi reservado para a data selecionada. Por favor, escolha outro horário.');
            return;
        }

        // Adicionar novo agendamento aos dados existentes
        existingAppointments.push(appointmentData);

        // Armazenar dados atualizados no localStorage
        localStorage.setItem('appointments', JSON.stringify(existingAppointments));

        // Remover o horário escolhido para todas as datas no futuro do menu de seleção
        removeTimeOption(appointmentTime);

        alert('Agendamento confirmado:\n\nNome: ' + clientName + '\nData: ' + appointmentDate +
            '\nTipo de Serviço: ' + serviceType + '\nHorário: ' + appointmentTime);

        // Aqui você pode adicionar a lógica para enviar os dados para o servidor, se necessário.
        document.getElementById('appointmentForm').reset();
    }
}

function isTimeReserved(appointments, date, time) {
    return appointments.some(function (appointment) {
        return appointment.appointmentDate === date && appointment.appointmentTime === time;
    });
}

function removeTimeOption(time) {
    var select = document.getElementById('appointmentTime');
    var options = select.options;
    for (var i = 0; i < options.length; i++) {
        if (options[i].value === time) {
            select.remove(i);
            break;
        }
    }
}

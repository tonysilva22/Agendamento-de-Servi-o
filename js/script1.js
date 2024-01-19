function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Adicione aqui a lógica de autenticação, por exemplo, comparando com credenciais predefinidas
    if (username === 'tony' && password === '357951') {
        // Login bem-sucedido, redirecionar para index.html
        window.location.href = 'a.html';
    } else {
        // Login falhou, exibir uma mensagem de erro
        var errorElement = document.getElementById('error-message');
        errorElement.innerHTML = 'Credenciais inválidas. Tente novamente.';
    }
}

function togglePassword() {
    var passwordInput = document.getElementById('password');
    var passwordToggle = document.getElementById('password-toggle');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordToggle.textContent = 'Ocultar';
    } else {
        passwordInput.type = 'password';
        passwordToggle.textContent = 'Mostrar';
    }
}

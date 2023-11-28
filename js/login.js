window.addEventListener("load", function () {
    document.getElementById("btnLogin").addEventListener("click", fazerLogin);
    const start = new Audio('https://gcarloslima.github.io/Projeto_Final_JSB/msc/game-start-6104.mp3');
    function fazerLogin() {
        var user = document.getElementById("login").value;
        var password = document.getElementById("password").value;
        var users = localStorage.getItem("vetUsuarios");

        if (user == "" || password == "") {
            alertWifi("Preencha todas as informações", false, 0, "", 30, "");
        } else {
            if(users) {
                var vet = JSON.parse(users);
                var usuarioEncontrado = vet.find(function (usuario) {
                    return usuario.nome === user && usuario.senha === password;
                });
    
                if (usuarioEncontrado) {
                    start.play();
                    alertWifi("Usuário encontrado!", false, 0, "", 30, "");
                    setTimeout(function() {
                        window.location.href = "jogo.html";
                    }, 1500);
                } else {
                    alertWifi("Nome de usuário ou senha incorretos", false, 0, "", 30, "");
                }
            } else {
                alertWifi("Nenhum usuário cadastrado ainda", false, 0, "", 30, "");
            }
        }
    }
    document.getElementById("btnCadastro").addEventListener("click", () => window.location.href = "cadastrar.html");

});

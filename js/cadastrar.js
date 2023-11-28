window.addEventListener("load", function () {
    document.getElementById("btnCadastrar").addEventListener("click", cadastrarUsuario);

    function cadastrarUsuario() {
        var user = document.getElementById("user").value;
        var pwd = document.getElementById("pwd").value;
        var checkPwd = document.getElementById("checkPwd").value;
        var padraoUsuario = /^[a-zA-Z0-9]{5,20}$/;
        var padraoSenha = /^[a-zA-Z0-9+\-*/@&]{4,12}$/;
        if (user == "" || pwd == "" || checkPwd == "") {

            alertWifi("Olá, tudo bem?", false, 0, "", 30, "");
        }  

        else {
            if (!padraoUsuario.test(user)) {
                alertWifi("O usuário deve apenas conter de 5 a 20 caracteres apenas alfanuméricos", false, 0, "", 30, "");
            } 
            
            else if (!padraoSenha.test(pwd)) {
                alertWifi("A senha deve conter de 4 a 12 letras, números e/ou um dos seguintes símbolos: + - * / @ &", false, 0, "", 30, "");
            }

            else if (pwd == checkPwd) {
                var usuarioNovo = { nome: user, senha: pwd }
                var vetUsuarios = localStorage.getItem("vetUsuarios");
                
                if (!vetUsuarios) {
                    var vet = [];
                    vet.push(usuarioNovo);
                    localStorage.setItem("vetUsuarios", JSON.stringify(vet));

                }
                else {
                    vet = JSON.parse(vetUsuarios);
                    vet.push(usuarioNovo);
                    localStorage.setItem("vetUsuarios", JSON.stringify(vet));
                }
                alertWifi("Cadastrado com sucesso!", false, 0, "", 30, "");
            }
            else {
                alertWifi("As senhas não conferem", false, 0, "", 30, "");
            }
        }


    }
    document.getElementById("btnVoltar").addEventListener("click", () => window.location.href = "index.html");

});

window.addEventListener("load", function () {
    document.getElementById("btnCadastrar").addEventListener("click", cadastrarUsuario);

    function cadastrarUsuario() {
        var user = document.getElementById("user").value;
        var pwd = document.getElementById("pwd").value;
        var checkPwd = document.getElementById("checkPwd").value;
        
        if (user == "" || pwd == "" || checkPwd == "") {

            alertWifi("Olá, tudo bem?", false, 0, "", 30, "");
        } else {
            if (pwd == checkPwd) {
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
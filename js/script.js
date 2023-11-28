window.addEventListener("load", function () {
    let tempo = 0, acertos = 0, erros = 0, numeroSorteado, numerosParesSorteados = 0, teste = 0;
    botaoIniciar = document.getElementById("iniciar");
    botaoPausar = document.getElementById("pausar");
    botaoParar = document.getElementById("parar");
    selecaoDificuldade = document.getElementById("dificuldade");
    numeroSorteado = document.getElementById("numeroSorteado");
    
    
    selecaoDificuldade.value = "";
    botaoPausar.disabled = true;
    botaoParar.disabled = true;
    botaoIniciar.addEventListener("click", iniciar);
    botaoPausar.addEventListener("click", pausar);
    botaoParar.addEventListener("click", parar);
    selecaoDificuldade.addEventListener("change", setarDificuldade);
    const musicGame = new Audio('https://gcarloslima.github.io/Projeto_Final_JSB/msc/video-game-music-loop-27629.mp3');
    const erro = new Audio('https://gcarloslima.github.io/Projeto_Final_JSB/msc/video-game-hit-noise-001-135821.mp3');
    const acerto = new Audio('https://gcarloslima.github.io/Projeto_Final_JSB/msc/notification-for-game-scenes-132473.mp3');
    const fim = new Audio('https://gcarloslima.github.io/Projeto_Final_JSB/msc/videogame-death-sound-43894.mp3');
    const pauseGame = new Audio('https://gcarloslima.github.io/Projeto_Final_JSB/msc/pauseGame.mp3');
    // const fim = videogame-death-sound-43894
    document.getElementById("botaoFechar").addEventListener("click", () => window.location.href = "index.html");

    function iniciar() {
        
        if (selecaoDificuldade.value == "") {
            Swal.fire({
                text: "Selecione uma dificuldade",
                confirmButtonColor: "#CCCCCC",
                color: "white",
                background: "#000000"
              });
        } else {
            musicGame.loop = true;
            musicGame.play();
            selecaoDificuldade.disabled = true;
            botaoIniciar.disabled = true;
            botaoPausar.disabled = false;
            botaoParar.disabled = false;            
            

            sorteador = setInterval(function () {
                numeroSorteado.classList.remove("green");
                numeroSorteado.classList.remove("red");
                numeroSorteado.classList.remove("bloquearSelecao");
                numeroSorteado.innerHTML = Math.floor(Math.random() * 100) + 1;
                if (parseInt(numeroSorteado.innerHTML) % 2 == 0) {
                    document.getElementById("paresSorteados").innerHTML = ++numerosParesSorteados;
                    document.getElementById("acertos").innerHTML = `${acertos} (${((acertos / numerosParesSorteados) * 100).toFixed(1)}%)`
                }

            }, selecaoDificuldade.value);

            temporizador = setInterval(function () {
                if (tempo > 0) {
                    padronizarTempo(--tempo);
                    teste++;
                }
                 
                if (tempo <= 0) {
                    fim.play();
                    pausar();
                    botaoIniciar.disabled = true;
                    setTimeout(() => {Swal.fire({
                        text: "Fim de jogo",
                        confirmButtonColor: "#CCCCCC",
                        color: "white",
                        background: "#000000"
                      });}, 1);
                }
            }, 1000);

            numeroSorteado.addEventListener("click", checarAcerto);
        }
    }

    function pausar() {
        pauseGame.play();
        musicGame.pause();
        botaoIniciar.disabled = false;
        botaoPausar.disabled = true;
        clearInterval(temporizador);
        clearInterval(sorteador);
        numeroSorteado.removeEventListener("click", checarAcerto);
    }

    function parar() {
        pauseGame.play();
        musicGame.pause();
        musicGame.currentTime = 0;
        setarDificuldade();
        selecaoDificuldade.disabled = false;
        botaoParar.disabled = true;
        pausar();
        selecaoDificuldade.value = "";
        setarDificuldade();
        acertos = 0;
        numerosParesSorteados = 0;
        erros = 0;
        document.getElementById("acertos").innerHTML = "0 (0.0%)";
        document.getElementById("erros").innerHTML = 0;
        document.getElementById("paresSorteados").innerHTML = 0;
        numeroSorteado.innerHTML = "_";

    }
    
    function checarAcerto() {
        if (numeroSorteado.innerHTML % 2 == 0) {
            acerto.pause();
            acerto.currentTime = 0;
            acerto.play();
            numeroSorteado.classList.add("green");
        } else {
            erro.pause();
            erro.currentTime = 0;
            erro.play();
            numeroSorteado.classList.add("red");
        }
        setTimeout(function () {
            numeroSorteado.classList.remove("green");
            numeroSorteado.classList.remove("red");
        }, 200);
        numeroSorteado.classList.add("bloquearSelecao");
        (numeroSorteado.innerHTML % 2 == 0) ? document.getElementById("acertos").innerHTML = `${++acertos} (${((acertos / numerosParesSorteados) * 100).toFixed(1)}%)` : document.getElementById("erros").innerHTML = ++erros;
    }


    function setarDificuldade() {
        if (selecaoDificuldade.value == '900') {
            tempo = 105;
        } else if (selecaoDificuldade.value == '600') {
            tempo = 75;
        } else if (selecaoDificuldade.value == '300') {
            tempo = 30;
        } else if (selecaoDificuldade.value == '') {
            tempo = 0;
        }
        document.getElementById("tempo").innerHTML = `${String(parseInt((tempo / 60))).padStart(2, '0')}:${String(parseInt((parseInt((tempo % 60))))).padStart(2, '0')}`
    }
    
    function padronizarTempo(segundos) {
        document.getElementById("tempo").innerHTML = `${String(parseInt((segundos / 60))).padStart(2, '0')}:${String(parseInt((parseInt((segundos % 60))))).padStart(2, '0')}`
    }

});

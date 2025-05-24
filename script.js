// Inicializando os votos (recuperando do localStorage se existirem)
let votos = {
    1: parseInt(localStorage.getItem('voto_1')) || 0,
    2: parseInt(localStorage.getItem('voto_2')) || 0,
    3: parseInt(localStorage.getItem('voto_3')) || 0
};

// Função para verificar se o usuário já votou
function jaVotou() {
    return localStorage.getItem('votou') === 'true';
}

// Função para votar
function votar(presentationId) {
    // Verifica se o usuário já votou
    if (jaVotou()) {
        mostrarFeedback("Você já votou! Não é possível votar mais de uma vez.");
        return;
    }
    
    // Atualiza os votos
    votos[presentationId]++;
    
    // Atualiza o localStorage com o novo número de votos
    localStorage.setItem('voto_' + presentationId, votos[presentationId]);
    
    // Atualizando a exibição dos votos
    document.getElementById('votes' + presentationId).innerText = 'Votos: ' + votos[presentationId];
    
    // Marca que o usuário votou no localStorage
    localStorage.setItem('votou', 'true');
    
    // Desativa todos os botões de votação
    desativarBotoes();

    // Exibindo o feedback visual
    mostrarFeedback("Seu voto foi registrado com sucesso!");

    // Opcional: Esconder o feedback após 3 segundos
    setTimeout(esconderFeedback, 3000);
}

// Função para desativar os botões de votação
function desativarBotoes() {
    const botoes = document.querySelectorAll('.vote-btn');
    botoes.forEach(botao => botao.disabled = true);
}

// Função para mostrar o feedback
function mostrarFeedback(mensagem) {
    const feedback = document.getElementById('feedback');
    feedback.innerText = mensagem;
    feedback.style.display = "block";
}

// Função para esconder o feedback
function esconderFeedback() {
    const feedback = document.getElementById('feedback');
    feedback.style.display = "none";
}

// Inicialização: Se o usuário já tiver votado, desabilitar os botões de votação
if (jaVotou()) {
    desativarBotoes();
}

// Inicializando a exibição dos votos a partir do localStorage
document.getElementById('votes1').innerText = 'Votos: ' + votos[1];
document.getElementById('votes2').innerText = 'Votos: ' + votos[2];
document.getElementById('votes3').innerText = 'Votos: ' + votos[3];

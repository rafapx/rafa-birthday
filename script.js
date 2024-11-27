// Elementos do DOM
const startButton = document.getElementById('start-button');
const buttonSound = document.getElementById('button-sound');
const initialMusic = document.getElementById('initial-music');
const loadingText = document.getElementById('loading-text');
const progressBar = document.querySelector('.progress-bar');
const screens = document.querySelectorAll('.screen');

// Mensagens de carregamento
const loadingMessages = [
    "Iniciando sistemas...",
    "Carregando sorrisos...",
    "Preparando diversão...",
    "Maximizando alegria...",
    "Ativando modo festa...",
    "Calibrando níveis de empolgação...",
    "Sincronizando bom humor...",
    "Otimizando felicidade...",
    "Configurando comemorações...",
    "Amplificando energia positiva...",
    "Carregando memórias especiais...",
    "Iniciando protocolo de festa...",
    "Ativando sistema de diversão...",
    "Preparando surpresas...",
    "Finalizando configurações..."
];

// Controle de áudio
let isMusicPlaying = false;

// Função para trocar de tela
function showScreen(screenIndex) {
    screens.forEach(screen => screen.classList.remove('active'));
    screens[screenIndex].classList.add('active');
}

// Função para atualizar a barra de progresso
function updateProgressBar(progress) {
    progressBar.style.width = `${progress}%`;
}

// Função para atualizar o texto de carregamento
function updateLoadingText(text) {
    loadingText.textContent = text;
}

// Função para iniciar a sequência de carregamento
function startLoadingSequence() {
    let progress = 0;
    let messageIndex = 0;
    const totalTime = 18000; // 18 segundos
    const messageInterval = 1200; // 1.2 segundos por mensagem
    const progressInterval = 50; // Atualização da barra a cada 50ms

    // Intervalo para mensagens
    const messageTimer = setInterval(() => {
        if (messageIndex < loadingMessages.length) {
            updateLoadingText(loadingMessages[messageIndex]);
            messageIndex++;
        }
    }, messageInterval);

    // Intervalo para barra de progresso
    const progressTimer = setInterval(() => {
        progress += (100 * progressInterval) / totalTime;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressTimer);
            clearInterval(messageTimer);
            setTimeout(() => {
                showScreen(2); // Mostrar tela final
                updateCountdown(); // Iniciar contagem regressiva
            }, 500);
        }
        updateProgressBar(progress);
    }, progressInterval);
}

// Função para formatar número com zero à esquerda
function padNumber(number) {
    return number.toString().padStart(2, '0');
}

// Função para atualizar a contagem regressiva
function updateCountdown() {
    const targetDate = new Date('2024-11-30T12:00:00');
    
    function update() {
        const now = new Date();
        const difference = targetDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById('countdown-timer').textContent = 
                `${padNumber(days)}D ${padNumber(hours)}H ${padNumber(minutes)}M ${padNumber(seconds)}S`;
        } else {
            document.getElementById('countdown-timer').textContent = "FESTA INICIADA! 🎉";
        }
    }

    update();
    setInterval(update, 1000);
}

// Event Listeners
startButton.addEventListener('click', () => {
    buttonSound.play();
    showScreen(1); // Mostrar tela de carregamento
    startLoadingSequence();
    
    // Iniciar música com volume baixo
    if (!isMusicPlaying) {
        initialMusic.volume = 0.3; // 30% do volume
        initialMusic.play();
        isMusicPlaying = true;
    }
});

// Botão de som (opcional, pode ser adicionado no HTML)
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.createElement('button');
    toggleButton.innerHTML = '🔊';
    toggleButton.style.position = 'fixed';
    toggleButton.style.bottom = '20px';
    toggleButton.style.right = '20px';
    toggleButton.style.zIndex = '1000';
    toggleButton.style.background = 'none';
    toggleButton.style.border = 'none';
    toggleButton.style.fontSize = '24px';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.color = '#00ff00';
    
    document.body.appendChild(toggleButton);
    
    toggleButton.addEventListener('click', () => {
        if (initialMusic.paused) {
            initialMusic.play();
            toggleButton.innerHTML = '🔊';
        } else {
            initialMusic.pause();
            toggleButton.innerHTML = '🔈';
        }
    });
});

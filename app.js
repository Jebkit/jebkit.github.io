// Jebkit — WebKit Interface Controller

document.addEventListener('DOMContentLoaded', () => {
    initMatrixBackground();
    initModalEvents();
});

/* -------------------------------------------------------------
 * 1. Animated Matrix Digital Waterfall (Red Glowing Characters)
 * ------------------------------------------------------------- */
function initMatrixBackground() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters (Katakana + Latin alphanumeric)
    const chars = 'アカサタナハマヤラワ0123456789ABCDEFJEBKIT';
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = new Array(columns).fill(1);

    function draw() {
        // Translucent background sweep for trail fading effect
        ctx.fillStyle = 'rgba(5, 0, 0, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#ff1e1e';
        ctx.font = `${fontSize}px monospace`;

        const currentCols = Math.floor(canvas.width / fontSize);
        if (currentCols !== drops.length) {
            columns = currentCols;
            drops = new Array(columns).fill(1);
        }

        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            // Glow effect for lead characters
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#ff0000';
            ctx.fillText(text, x, y);

            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    // 30 FPS targeting to prevent resource exhaustion on embedded WebKit
    setInterval(draw, 33);
}

/* -------------------------------------------------------------
 * 2. Firmware Reminder & Modal Logic
 * ------------------------------------------------------------- */
function initModalEvents() {
    const btnVerify = document.getElementById('btn-verify');
    const btnInfo = document.getElementById('btn-info');
    const fwModal = document.getElementById('fw-modal');
    const infoModal = document.getElementById('info-modal');
    const modalCancel = document.getElementById('modal-cancel');
    const modalOk = document.getElementById('modal-ok');
    const infoClose = document.getElementById('info-close');
    const timerCountdown = document.getElementById('timer-countdown');

    let countdownInterval = null;

    // Show Firmware Verification Modal
    btnVerify.addEventListener('click', () => {
        fwModal.classList.remove('hidden');
        startOkButtonTimer();
    });

    // Close Firmware Modal
    modalCancel.addEventListener('click', () => {
        closeFwModal();
        appendLog('[INFO] Firmware check cancelled by user.');
    });

    modalOk.addEventListener('click', () => {
        if (modalOk.disabled) return;
        closeFwModal();
        appendLog('[SYS] Firmware reference (23.0.1) manually confirmed by user.');
        document.getElementById('system-state').innerText = 'Reference Confirmed';
        document.getElementById('system-state').className = 'value green';
    });

    // Show Info Modal
    btnInfo.addEventListener('click', () => {
        infoModal.classList.remove('hidden');
    });

    infoClose.addEventListener('click', () => {
        infoModal.classList.add('hidden');
    });

    // 5-second delay logic before OK button unlocks
    function startOkButtonTimer() {
        let remaining = 5;
        modalOk.disabled = true;
        modalOk.classList.add('disabled');
        timerCountdown.innerText = remaining;

        if (countdownInterval) clearInterval(countdownInterval);

        countdownInterval = setInterval(() => {
            remaining -= 1;
            if (remaining > 0) {
                timerCountdown.innerText = remaining;
            } else {
                clearInterval(countdownInterval);
                modalOk.disabled = false;
                modalOk.classList.remove('disabled');
                modalOk.innerHTML = 'OK';
            }
        }, 1000);
    }

    function closeFwModal() {
        fwModal.classList.add('hidden');
        if (countdownInterval) clearInterval(countdownInterval);
        modalOk.innerHTML = 'OK (<span id="timer-countdown">5</span>s)';
    }
}

function appendLog(message) {
    const logBox = document.getElementById('console-log');
    const line = document.createElement('div');
    line.className = 'log-line';
    line.innerText = message;
    logBox.appendChild(line);
    logBox.scrollTop = logBox.scrollHeight;
}
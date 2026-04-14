const log = document.getElementById("log");
const input = document.getElementById("input");

// 🔥 FUNÇÃO SEGURA DE LOG (NUNCA SOME NADA)
function logMsg(type, text) {
    try {
        const div = document.createElement("div");
        div.classList.add("line");

        if (type === "ok") div.classList.add("ok");
        if (type === "err") div.classList.add("err");
        if (type === "sys") div.classList.add("sys");

        div.textContent = text;

        log.appendChild(div);
        log.scrollTop = log.scrollHeight;

    } catch (e) {
        alert("ERRO CRÍTICO NO FRONTEND: " + e.message);
    }
}

// 🚀 ENVIO PRINCIPAL
async function enviar() {
    const texto = input.value.trim();

    if (!texto) {
        logMsg("err", "[ERRO] Campo vazio");
        return;
    }

    // 🧹 CLS
    if (texto.toLowerCase() === "cls") {
        log.innerHTML = "";
        logMsg("sys", "> terminal limpo");
        input.value = "";
        return;
    }

    logMsg("sys", "> enviando comando: " + texto);

    try {
        const res = await fetch("http://localhost:3000/processar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                usuario: "op",
                texto
            })
        });

        if (!res.ok) {
            logMsg("err", "[ERRO] servidor respondeu com falha HTTP");
            return;
        }

        const data = await res.json();

        if (!data) {
            logMsg("err", "[ERRO] resposta vazia do servidor");
            return;
        }

        const tipo = data.status === "SEGURO" ? "ok" : "err";

        logMsg(tipo, `[${data.status}] ${data.filtrado}`);

    } catch (e) {
        logMsg("err", "[ERRO] servidor offline ou não respondeu");
        logMsg("err", "DEBUG: " + e.message);
    }

    input.value = "";
}

// 🔥 TESTE AUTOMÁTICO AO ABRIR
window.onload = () => {
    logMsg("sys", "> sistema iniciado com sucesso");
};
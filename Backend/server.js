const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// 🔍 filtro simples
function analisar(texto) {
    const termos = [/senha/gi, /gps/gi, /vazamento/gi];

    let filtrado = texto;
    let status = "SEGURO";

    termos.forEach(t => {
        if (t.test(texto)) {
            filtrado = filtrado.replace(t, "[BLOQUEADO]");
            status = "RISCO";
        }
    });

    return { filtrado, status };
}

// 🔥 rota teste
app.get("/", (req, res) => {
    res.send("SERVER OK");
});

// 🔥 processamento
app.post("/processar", (req, res) => {
    const { texto } = req.body;

    if (!texto) {
        return res.json({
            status: "ERRO",
            filtrado: "texto vazio"
        });
    }

    const result = analisar(texto);

    res.json(result);
});

// 🚀 start server
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
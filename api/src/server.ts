import express from 'express';

const app = express();

/**
 * GET => Buscar
 * POST => Incluir
 * PUT => Alterar
 * DELETE => Apagar
 * PATCH => Alteração específica
 */

app.get("/", (req, res) => {
    return res.json({ message: "Hello World NLW04" });
});

// 1asda sd as
// asdas asd asd

app.post("/", (req, res) => {
    return res.json({ message: "Dados gravados com sucesso!" });
});

app.listen(3333, () => console.log('Server is running!'));

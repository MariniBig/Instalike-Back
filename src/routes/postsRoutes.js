import express from "express";
import multer from "multer";
import { atualizarNovoPost, listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSucessStatus: 200
}
// Configura o armazenamento de arquivos enviados pelo usuário (imagens)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório onde os arquivos serão salvos
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Define o nome do arquivo, mantendo o nome original
    cb(null, file.originalname);
  }
});

// Cria uma instância do Multer com a configuração de armazenamento definida
const upload = multer({ dest: "./uploads", storage });

// Define as rotas da aplicação Express
const routes = (app) => {
  // Habilita o parse de dados JSON no corpo das requisições
  app.use(express.json());
  app.use(cors((corsOptions)))

  // Rota para listar todos os posts (implementada no controlador)
  app.get("/posts", listarPosts);

  // Rota para criar um novo post (implementada no controlador)
  app.post("/posts", postarNovoPost);

  // Rota para fazer upload de uma imagem (implementada no controlador)
  // Exige um arquivo único chamado "imagem" no corpo da requisição
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)
};

export default routes;
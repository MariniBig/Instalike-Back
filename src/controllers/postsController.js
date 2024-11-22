import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiservice.js";

// Função assíncrona para listar todos os posts
export async function listarPosts(req, res) {
  // Busca todos os posts do banco de dados (ou outra fonte de dados)
  const posts = await getTodosPosts();
  // Envia os posts como resposta em formato JSON com status 200 (sucesso)
  res.status(200).json(posts);
}

// Função assíncrona para criar um novo post
export async function postarNovoPost(req, res) {
  // Obtém os dados do novo post enviados no corpo da requisição
  const novoPost = req.body;
  try {
    // Chama a função para criar o post no banco de dados
    const postCriado = await criarPost(novoPost);
    // Envia o post criado como resposta em formato JSON com status 200 (sucesso)
    res.status(200).json(postCriado);
  } catch (erro) {
    // Caso ocorra algum erro durante a criação do post, registra o erro no console e envia uma mensagem de erro ao cliente
    console.error(erro.message);
    res.status(500).json({"Erro":"Falha na requisição"});
  }
}

// Função assíncrona para fazer upload de uma imagem e criar um novo post
export async function uploadImagem(req, res) {
  // Cria um objeto com os dados do novo post, incluindo a URL da imagem
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: ""
  };

  try {
    // Chama a função para criar o post no banco de dados
    const postCriado = await criarPost(novoPost);
    // Constrói o novo nome do arquivo da imagem com o ID do post criado
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    // Renomeia o arquivo da imagem para o novo nome
    fs.renameSync(req.file.path, imagemAtualizada);
    // Envia o post criado como resposta em formato JSON com status 200 (sucesso)
    res.status(200).json(postCriado);
  } catch (erro) {
    // Caso ocorra algum erro durante o processo, registra o erro no console e envia uma mensagem de erro ao cliente
    console.error(erro.message);
    res.status(500).json({"Erro":"Falha na requisição"});
  }
}

// Função assíncrona para atualizar um novo post
export async function atualizarNovoPost(req, res) {
  // Obtém os dados do novo post enviados no corpo da requisição
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.png`;
    const post = {
    imgUrl: urlImagem,
    descricao: req.body.descricao,
    alt: req.body.alt
  }
  try {
    const imageBuffer = fs.readFileSync(`uploads/${id}.png`)
    const descricao = await gerarDescricaoComGemini(imageBuffer)
    const post = {
      imgUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt
    }
    // Chama a função para criar o post no banco de dados
    const postCriado = await atualizarPost(id, post);
    // Envia o post criado como resposta em formato JSON com status 200 (sucesso)
    res.status(200).json(postCriado);
  } catch (erro) {
    // Caso ocorra algum erro durante a criação do post, registra o erro no console e envia uma mensagem de erro ao cliente
    console.error(erro.message);
    res.status(500).json({"Erro":"Falha na requisição"});
  }
}
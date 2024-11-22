import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js";
// Conecta ao banco de dados usando a string de conexão obtida da variável de ambiente STRING_CONEXAO
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts do banco de dados
export async function getTodosPosts() {
  // Seleciona o banco de dados 'imersao-instabytes'
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção 'posts' dentro do banco de dados
  const colecao = db.collection("posts");
  // Busca todos os documentos (posts) da coleção e retorna como um array
  return colecao.find().toArray()
}

export async function criarPost(novoPost) {
  // Seleciona o banco de dados 'imersao-instabytes'
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção 'posts' dentro do banco de dados
  const colecao = db.collection("posts");
  // Insere um novo documento (post) na coleção e retorna o resultado da inserção
  return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost) {
  // Seleciona o banco de dados 'imersao-instabytes'
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção 'posts' dentro do banco de dados
  const colecao = db.collection("posts");
  // Pega a ID recebida e anota para uso futuro no mongoDB
  const objID = ObjectId.createFromHexString(id);
  // Insere um novo documento (post) na coleção e retorna o resultado da inserção
  return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost})
}
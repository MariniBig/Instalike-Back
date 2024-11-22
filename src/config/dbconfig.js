import { MongoClient } from 'mongodb';

// Função assíncrona para conectar ao banco de dados MongoDB
export default async function conectarAoBanco(stringConexao) {
  // Inicializa uma variável para armazenar o cliente MongoDB
  let mongoClient;

  try {
    // Cria uma nova instância do cliente MongoDB, passando a string de conexão
    mongoClient = new MongoClient(stringConexao);
    // Exibe uma mensagem no console indicando que a conexão está sendo estabelecida
    console.log('Conectando ao cluster do banco de dados...');
    // Tenta estabelecer a conexão com o banco de dados
    await mongoClient.connect();
    // Exibe uma mensagem de sucesso caso a conexão seja estabelecida com sucesso
    console.log('Conectado ao MongoDB Atlas com sucesso!');

    // Retorna o cliente MongoDB para que possa ser utilizado em outras partes do código
    return mongoClient;
  } catch (erro) {
    // Caso ocorra algum erro durante a conexão, exibe uma mensagem de erro no console e encerra o processo
    console.error('Falha na conexão com o banco!', erro);
    process.exit();
  }
}
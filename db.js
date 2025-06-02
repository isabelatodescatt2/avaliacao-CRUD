async function connect() {  
    const { Pool } = require("pg");

    if(global.connection)
        return global.connection.connect();

    const pool = new Pool({
      user: process.env.USER_NAME,
      host: process.env.HOST_NAME,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      dialect: process.env.DB_DIALECT,
      port: process.env.PORT_NUMBER
    });
    
    const client = await pool.connect();
    console.log("O Pool de conexão foi criado com sucesso!")
    client.release();

    global.connection = pool;
    
    return pool.connect();
  }

// Função para listar clientes
async function selectCustomers() {
    // Estabelecer conexão com o banco de dados
    const client = await connect();
    // Enviar comando SQL para o banco de dados
    const res = await client.query("SELECT * FROM client");
    // Retorna as linhas (registros) da tabela
    return res.rows;
    }

// Função para listar um cliente
async function selectCustomer(id) {
    // Estabelece a conexão com o banco de dados
    const client = await connect();
    // Executa a query SQL usando declaração preparada para evitar SQL Injection
    const res = await client.query("SELECT * FROM client WHERE cpf=$1", [id]);
    // Retorna as linhas (dados do cliente)
    return res.rows;

  async function insertCustomer(customer) {
    const client = await connect();
    const sql = "INSERT INTO clientes(cpf, nome, email, idade, profissao, c8, c9, c10) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
    const values = [customer.nome, customer.idade, customer.uf];
    await client.query(sql, values)
}

module.exports = {
    connect,
    insertCustomer,
    selectCustomers,
}

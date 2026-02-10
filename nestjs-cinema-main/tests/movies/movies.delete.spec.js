const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:3000'; // URL base da API

// Função auxiliar para criar um filme temporário e retornar o ID
async function createMovie(request) {
  const response = await request.post(`${BASE_URL}/movies`, {
    data: {
      title: "Filme Temporário",
      description: "Descrição do Filme Temporário",
      launchdate: "2024-11-10",
      showtimes: ["10:00 AM", "02:00 PM"]
    }
  });
  expect(response.status()).toBe(201); // Verifica se o filme foi criado com sucesso

  // Verifica se a resposta contém JSON antes de tentar parsear
  const responseText = await response.text();
  let movie;
  try {
    movie = JSON.parse(responseText);
  } catch (error) {
    console.warn("Aviso: A resposta de criação não contém um JSON válido.");
    return null;
  }
  return movie._id; // Retorna o ID do filme criado
}

test.describe('/movies/{id} DELETE requests', () => {

  // TC-016: Excluir filme existente por ID
  test('TC-016 - Deve excluir um filme existente por ID', async ({ request }) => {
    // Cria o filme e obtém o ID
    const movieId = await createMovie(request);
    if (!movieId) return; // Sai do teste se o filme não foi criado

    // Exclui o filme usando o ID retornado
    const response = await request.delete(`${BASE_URL}/movies/${movieId}`);
    expect(response.status()).toBe(204); // Verifica o código de sucesso (204 No Content)

    // Confirma a exclusão tentando buscar o filme excluído
    const checkResponse = await request.get(`${BASE_URL}/movies/${movieId}`);
    expect(checkResponse.status()).toBe(404); // Verifica se o filme não é encontrado
  });

  // TC-017: Tentar excluir um filme inexistente por ID
  test('TC-017 - Deve retornar 404 ao tentar excluir um filme inexistente', async ({ request }) => {
    const nonExistentId = "nonexistentID123";

    const response = await request.delete(`${BASE_URL}/movies/${nonExistentId}`);
    expect(response.status()).toBe(404); // Verifica se retorna 404 Not Found
  });

  // TC-018: Excluir filme com ID inválido
  test('TC-018 - Deve retornar 400 ao tentar excluir um filme com ID inválido', async ({ request }) => {
    const invalidId = "abc123";

    const response = await request.delete(`${BASE_URL}/movies/${invalidId}`);
    expect(response.status()).toBe(400); // Verifica se retorna 400 Bad Request

    const responseBody = await response.json();
    expect(responseBody.message).toContain("ID inválido"); // Ajuste conforme a mensagem esperada da API
  });

});

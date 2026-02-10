const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:3000'; // URL base da API

// Função auxiliar para criar um filme e retornar o ID
async function createMovie(request) {
  const response = await request.post(`${BASE_URL}/movies`, {
    data: {
      title: "Filme Temporário",
      description: "Descrição do Filme Temporário",
      launchdate: "2024-11-10T00:00:00.000Z",
      showtimes: ["10:00 AM", "02:00 PM"]
    }
  });

  console.log("Status da resposta de criação:", response.status());

  // Verifica se o Content-Type é JSON
  const contentType = response.headers()['content-type'] || '';
  if (!contentType.includes('application/json')) {
    console.warn("A resposta não contém JSON válido. Content-Type:", contentType);
    return null;
  }

  // Tenta interpretar a resposta como JSON
  try {
    const movie = await response.json();
    console.log("Filme criado com sucesso:", movie);
    return movie._id;
  } catch (error) {
    console.warn("Erro ao interpretar a resposta JSON:", error);
    return null;
  }
}

// Teste PUT com verificação adicional
test('TC-010 - Deve atualizar um filme com dados válidos', async ({ request }) => {
  const movieId = await createMovie(request);
  expect(movieId).not.toBeNull(); // Verifica que o filme foi criado
  console.log("ID do filme criado para atualização:", movieId);

  // Aguarda um curto intervalo para garantir que o filme foi persistido
  await new Promise(resolve => setTimeout(resolve, 500));

  // Tenta atualizar o filme criado
  const updateResponse = await request.put(`${BASE_URL}/movies/${movieId}`, {
    data: {
      _id: movieId,
      title: "Inception - Updated",
      description: "Updated Dream Heist",
      launchdate: "2010-07-16T00:00:00.000Z",
      showtimes: ["12:00 PM", "04:00 PM"]
    }
  });

  console.log("Status da resposta de atualização (PUT):", updateResponse.status());
  expect(updateResponse.status()).toBe(200); // Verifica o código de sucesso esperado
});

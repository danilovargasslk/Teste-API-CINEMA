const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:3000'; // URL base da API

// Função auxiliar para criar um filme temporário e retornar o ID
async function createMovie(request) {
  const createResponse = await request.post(`${BASE_URL}/movies`, {
    data: {
      title: "Filme Temporário",
      description: "Descrição do Filme Temporário",
      launchdate: "2024-11-10T00:00:00.000Z",
      showtimes: ["10:00 AM", "02:00 PM"]
    }
  });
  expect(createResponse.status()).toBe(201); // Verifica se o filme foi criado com sucesso

  try {
    const responseText = await createResponse.text();
    const createdMovie = JSON.parse(responseText);
    return createdMovie._id; // Retorna o ID do filme criado
  } catch (error) {
    console.warn("Aviso: A resposta de criação não contém um JSON válido:", error);
    return null;
  }
}

// TC-010: Atualizar um filme com dados válidos
test('TC-010 - Deve atualizar um filme com dados válidos', async ({ request }) => {
  const movieId = await createMovie(request);

  if (!movieId) {
    console.error("Falha ao criar o filme para o teste TC-010");
    return;
  }

  const updateResponse = await request.put(`${BASE_URL}/movies/${movieId}`, {
    data: {
      _id: movieId,
      title: "Inception - Updated",
      description: "Updated Dream Heist",
      launchdate: "2010-07-16T00:00:00.000Z",
      showtimes: ["12:00 PM", "04:00 PM"]
    }
  });
  expect(updateResponse.status()).toBe(200); // Verifica o código de sucesso
});

// TC-011: Tentar atualizar um filme inexistente
test('TC-011 - Deve retornar 404 ao atualizar filme inexistente', async ({ request }) => {
  const response = await request.put(`${BASE_URL}/movies/999999999999`, {
    data: {
      _id: "999999999999",
      title: "Nonexistent Movie",
      description: "This movie does not exist",
      launchdate: "2022-07-16T00:00:00.000Z",
      showtimes: ["10:00 AM", "02:00 PM"]
    }
  });
  expect(response.status()).toBe(404);
});

// TC-012: Atualizar um filme com ID malformado
test('TC-012 - Deve retornar 400 ao atualizar filme com ID malformado', async ({ request }) => {
  const response = await request.put(`${BASE_URL}/movies/abc123`, {
    data: {
      _id: "abc123",
      title: "Invalid ID Movie",
      description: "Testing with invalid ID",
      launchdate: "2022-07-16T00:00:00.000Z",
      showtimes: ["10:00 AM", "02:00 PM"]
    }
  });
  expect(response.status()).toBe(400);
});

// TC-013: Atualizar um filme com dados inválidos
test('TC-013 - Deve retornar 400 ao atualizar filme com dados inválidos', async ({ request }) => {
  const movieId = await createMovie(request);

  if (!movieId) {
    console.error("Falha ao criar o filme para o teste TC-013");
    return;
  }

  const updateResponse = await request.put(`${BASE_URL}/movies/${movieId}`, {
    data: {
      _id: movieId,
      title: "", // Título inválido
      description: "Updated Dream Heist",
      launchdate: "data_invalida", // Data inválida
      showtimes: ["12:00 PM", "04:00 PM"]
    }
  });
  expect(updateResponse.status()).toBe(400);
});

// TC-014: Atualizar um filme com campo extra
test('TC-014 - Deve retornar erro ao tentar atualizar filme com campo extra', async ({ request }) => {
  const movieId = await createMovie(request);

  if (!movieId) {
    console.error("Falha ao criar o filme para o teste TC-014");
    return;
  }

  const updateResponse = await request.put(`${BASE_URL}/movies/${movieId}`, {
    data: {
      _id: movieId,
      title: "Inception - Updated",
      description: "Updated Dream Heist",
      launchdate: "2010-07-16T00:00:00.000Z",
      showtimes: ["12:00 PM", "04:00 PM"],
      genre: "Sci-Fi" // Campo extra não permitido
    }
  });
  expect(updateResponse.status()).toBe(400);

  const responseBody = await updateResponse.json();
  expect(responseBody.message).toBe("Campo não permitido"); // Ajuste conforme a resposta da API
});

// TC-015: Atualizar um filme sem campos obrigatórios
test('TC-015 - Deve retornar erro ao tentar atualizar filme sem campos obrigatórios', async ({ request }) => {
  const movieId = await createMovie(request);

  if (!movieId) {
    console.error("Falha ao criar o filme para o teste TC-015");
    return;
  }

  const updateResponse = await request.put(`${BASE_URL}/movies/${movieId}`, {
    data: {
      _id: movieId,
      // Omitindo title e description
      launchdate: "2010-07-16T00:00:00.000Z",
      showtimes: ["12:00 PM", "04:00 PM"]
    }
  });
  expect(updateResponse.status()).toBe(400);
});

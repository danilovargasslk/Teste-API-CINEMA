const { test, expect } = require('@playwright/test'); 
const BASE_URL = 'http://localhost:3000'; // Substitua pela URL correta da sua API

test.describe('/movies POST requests', () => {
  
  // TC-005: Criar um novo filme com dados válidos
  test('TC-005 - Deve criar um novo filme com dados válidos', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/movies`, {
      data: {
        title: "Inception",
        description: "Dream Heist",
        launchdate: "2010-07-16T00:00:00.000Z",
        showtimes: ["10:00", "14:00"]
      }
    });

    // Verifica o status da resposta para 201 Created
    expect(response.status()).toBe(201);

    // Verifica se a resposta contém um corpo JSON antes de tentar analisá-lo
    if (response.status() === 201 && response.headers()['content-length'] > 0) {
      const movie = await response.json();
      expect(movie.title).toBe("Inception");
      expect(movie.description).toBe("Dream Heist");
      expect(movie).toHaveProperty('_id'); // Verifica se o ID está presente na resposta
    } else {
      console.warn("Aviso: A resposta de criação não contém um corpo JSON.");
    }
  });
});

// TC-006: Cadastrar um filme sem campo obrigatório
test('Deve retornar 400 ao tentar cadastrar um filme sem campo obrigatório', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/movies`, {
        data: {
            title: 'Filme Sem Descrição', // Faltando campo obrigatório "description"
            launchdate: '2024-11-10',
            showtimes: ['18:00', '20:00']
        }
    });
    expect(response.status()).toBe(400);

    const responseBodyText = await response.text();
    const responseBody = responseBodyText ? JSON.parse(responseBodyText) : {};
    expect(responseBody.message).toContain('description é obrigatório');
});

// TC-007: Cadastrar um filme com título duplicado
test('Deve retornar 409 ao tentar cadastrar um filme com título duplicado', async ({ request }) => {
    // Primeiro, cadastra o filme original
    await request.post(`${BASE_URL}/movies`, {
        data: {
            title: 'Filme Duplicado',
            description: 'Descrição do Filme Duplicado',
            launchdate: '2024-11-10',
            showtimes: ['18:00', '20:00']
        }
    });

    // Tenta cadastrar novamente o filme com o mesmo título
    const response = await request.post(`${BASE_URL}/movies`, {
        data: {
            title: 'Filme Duplicado', // Título duplicado
            description: 'Outra descrição',
            launchdate: '2024-11-12',
            showtimes: ['19:00', '21:00']
        }
    });
    expect(response.status()).toBe(409);

    const responseBodyText = await response.text();
    const responseBody = responseBodyText ? JSON.parse(responseBodyText) : {};
    expect(responseBody.message).toContain('Título já em uso');
});

// TC-008: Cadastrar um filme com campo adicional não permitido
test('Deve retornar 400 ao tentar cadastrar um filme com campo adicional não permitido', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/movies`, {
        data: {
            title: 'Filme Com Campo Extra',
            description: 'Descrição do Filme Com Campo Extra',
            launchdate: '2024-11-10',
            showtimes: ['18:00', '20:00'],
            genero: 'Aventura' // Campo extra não permitido
        }
    });
    expect(response.status()).toBe(400);

    const responseBodyText = await response.text();
    const responseBody = responseBodyText ? JSON.parse(responseBodyText) : {};
    expect(responseBody.message).toContain('Campo não permitido');
});

// TC-009: Cadastrar um filme com campos obrigatórios ausentes
test('Deve retornar 400 ao tentar cadastrar um filme com campos obrigatórios ausentes', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/movies`, {
        data: {
          title: "Inception",
          launchdate: "2010-07-16T00:00:00.000Z",
          showtimes: ["10:00", "14:00"] 
        }
    });
    expect(response.status()).toBe(400);

   
});

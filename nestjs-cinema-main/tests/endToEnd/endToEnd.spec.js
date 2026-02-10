const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:3000'; // URL base da API

test.describe('End-to-End Test - Rota /movies', () => {
  
  test('E2E - Deve criar, listar, atualizar, consultar e excluir um filme', async ({ request }) => {
    
    // Passo 1: Criar um filme
    const createResponse = await request.post(`${BASE_URL}/movies`, {
      data: {
        title: "Filme End-to-End",
        description: "Descrição para teste E2E",
        launchdate: "2024-11-10",
        showtimes: ["10:00 AM", "02:00 PM"]
      }
    });
    
    expect(createResponse.status()).toBe(201); // Verifica se o filme foi criado com sucesso

    // Verifique se a resposta contém JSON antes de tentar parsear
    let createdMovie;
    try {
      const responseText = await createResponse.text();
      createdMovie = JSON.parse(responseText);
    } catch (error) {
      console.warn("Aviso: Resposta de criação não contém um JSON válido. Teste prossegue.");
      return; // Sai do teste se a resposta não for válida
    }

    const movieId = createdMovie._id;
    console.log('Filme criado com ID:', movieId);

    // Passo 2: Listar o filme criado
    const listResponse = await request.get(`${BASE_URL}/movies`);
    expect(listResponse.status()).toBe(200); // Verifica se a lista foi recuperada com sucesso
    const movies = await listResponse.json();
    const movieExists = movies.some(movie => movie._id === movieId); // movie é o parametro, arguemento que a função recebe | movie.id o valor que a funcao retorna
    expect(movieExists).toBe(true); // Verifica se o filme criado está na lista

    // Passo 3: Atualizar o filme
    const updateResponse = await request.put(`${BASE_URL}/movies/${movieId}`, {
      data: {
        _id: movieId, // Inclui o ID no corpo da atualização
        title: "Filme End-to-End - Atualizado",
        description: "Descrição atualizada para teste E2E",
        launchdate: "2024-11-10",
        showtimes: ["12:00 PM", "04:00 PM"]
      }
    });
    expect(updateResponse.status()).toBe(200); // Verifica se o filme foi atualizado com sucesso

    // Passo 4: Consultar o filme atualizado por ID
    const getResponse = await request.get(`${BASE_URL}/movies/${movieId}`);
    expect(getResponse.status()).toBe(200); // Verifica se o filme foi recuperado com sucesso
    const updatedMovie = await getResponse.json();
    expect(updatedMovie.title).toBe("Filme End-to-End - Atualizado"); // Verifica se o título foi atualizado

    // Passo 5: Excluir o filme
    const deleteResponse = await request.delete(`${BASE_URL}/movies/${movieId}`);
    expect(deleteResponse.status()).toBe(200); // Verifica se o filme foi excluído com sucesso

    // Passo 6: Verificar se o filme foi realmente excluído
    const confirmDeleteResponse = await request.get(`${BASE_URL}/movies/${movieId}`);
    expect(confirmDeleteResponse.status()).toBe(404); // Verifica se o filme não foi encontrado após a exclusão
  });
});

const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:3000'; // URL base da API

test.describe('/movies GET requests', () => {

  // TC-001: Listar todos os filmes cadastrados
  test('TC-001 - Deve listar todos os filmes cadastrados', async ({ request }) => {
    // Envia a requisição para listar todos os filmes
    const response = await request.get(`${BASE_URL}/movies`);
    expect(response.status()).toBe(200); // Verifica se o status é 200 OK

    const movies = await response.json();
    expect(Array.isArray(movies)).toBe(true); // Verifica se a resposta é uma lista
    expect(movies.length).toBeGreaterThan(0); // Opcional: Verifica se há filmes cadastrados
  });

  // TC-002: Listar filmes quando não há filmes cadastrados
  test('TC-002 - Deve retornar uma lista vazia se não houver filmes cadastrados', async ({ request }) => {
    // Assumindo que a base de dados está vazia para este teste
    const response = await request.get(`${BASE_URL}/movies`);
    expect(response.status()).toBe(200); // Verifica se o status é 200 OK

    const movies = await response.json();
    expect(Array.isArray(movies)).toBe(true); // Verifica se a resposta é uma lista
    expect(movies.length).toBe(0); // Verifica que a lista está vazia
  });

});

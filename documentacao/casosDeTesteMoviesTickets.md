Aqui está a matriz de casos de teste em Gherkin, com os novos cenários de PUT organizados e numerados corretamente:

---

### **Cenário 1: Listar todos os filmes cadastrados**

```gherkin
Cenário: Listar todos os filmes cadastrados
  Dado que existem filmes cadastrados na API
  Quando eu envio uma requisição GET para o endpoint /movies
  Então o sistema deve retornar uma lista de filmes com o status 200 OK
  E a resposta deve conter detalhes de cada filme
```

### **Cenário 2: Consultar filme inexistente por ID**

```gherkin
Cenário: Consultar filme inexistente por ID
  Dado que o ID fornecido não corresponde a nenhum filme cadastrado
  Quando eu envio uma requisição GET para o endpoint /movies/{id} com esse ID
  Então o sistema deve retornar o status 404 Not Found
  E a mensagem "Filme não encontrado" deve ser exibida
```

### **Cenário 3: Consultar filme existente por ID**

```gherkin
Cenário: Consultar filme existente por ID
  Dado que existe um filme com um ID específico cadastrado na API
  Quando eu envio uma requisição GET para o endpoint /movies/{id} com esse ID
  Então o sistema deve retornar o status 200 OK
  E a resposta deve conter os detalhes completos do filme
```

### **Cenário 4: Consultar filme com ID inválido**

```gherkin
Cenário: Consultar filme com ID inválido
  Dado que o ID fornecido está em um formato inválido (por exemplo, vazio ou com caracteres especiais)
  Quando eu envio uma requisição GET para o endpoint /movies/{id} com esse ID inválido
  Então o sistema deve retornar o status 400 Bad Request
```

### **Cenário 5: Cadastrar um novo filme com dados válidos**

```gherkin
Cenário: Cadastrar um novo filme com dados válidos
  Dado que eu tenho os dados do filme com título, descrição, data de lançamento e horários de exibição
  Quando eu envio uma requisição POST para o endpoint /movies com esses dados
  Então o sistema deve criar o filme e retornar o status 201 Created
  E a resposta deve conter o ID do novo filme
```

### **Cenário 6: Cadastrar filme sem campo obrigatório**

```gherkin
Cenário: Cadastrar filme sem campo obrigatório
  Dado que os dados do filme estão faltando um campo obrigatório (como title, description, launchdate ou showtimes)
  Quando eu envio uma requisição POST para o endpoint /movies com os dados incompletos
  Então o sistema deve retornar o status 400 Bad Request
  E a resposta deve indicar qual campo obrigatório está ausente
```

### **Cenário 7: Cadastrar filme com título duplicado**

```gherkin
Cenário: Cadastrar filme com título duplicado
  Dado que já existe um filme cadastrado com o título especificado
  Quando eu envio uma requisição POST para o endpoint /movies com o mesmo título
  Então o sistema deve retornar o status 409 Conflict
  E a resposta deve indicar que o título do filme já está em uso
```

### **Cenário 8: Cadastrar filme com campo adicional não permitido**

```gherkin
Cenário: Cadastrar filme com campo adicional não permitido
  Dado que os dados do filme incluem um campo extra (como "genero") que não está documentado
  Quando eu envio uma requisição POST para o endpoint /movies com o campo extra
  Então o sistema deve retornar o status 400 Bad Request
  E a resposta deve indicar que o campo adicional não é permitido
```

### **Cenário 9: Cadastrar filme com campos obrigatórios ausentes**

```gherkin
Cenário: Cadastrar filme com campos obrigatórios ausentes
  Dado que estou enviando um filme com um ou mais campos obrigatórios ausentes
  Quando eu envio uma requisição POST para o endpoint /movies
  Então o sistema deve retornar o status 400 Bad Request
  E a resposta deve listar os campos ausentes obrigatórios
```

### **Cenário 10: Atualizar filme com dados válidos**

```gherkin
Cenário: Atualizar filme com dados válidos
  Dado que existe um filme com um ID específico
  E eu tenho novos dados válidos para atualizar esse filme
  Quando eu envio uma requisição PUT para o endpoint /movies/{id} com os dados atualizados
  Então o sistema deve retornar o status 200 OK
  E a resposta deve conter os dados atualizados do filme
```

### **Cenário 11: Atualizar filme inexistente**

```gherkin
Cenário: Atualizar filme inexistente
  Dado que o ID fornecido não corresponde a nenhum filme existente
  Quando eu envio uma requisição PUT para o endpoint /movies/{id} com esse ID
  Então o sistema deve retornar o status 404 Not Found
  E a resposta deve indicar que o filme não foi encontrado
```

### **Cenário 12: Atualizar filme com ID malformado**

```gherkin
Cenário: Atualizar filme com ID malformado
  Dado que o ID fornecido está em um formato inválido
  Quando eu envio uma requisição PUT para o endpoint /movies/{id} com esse ID malformado
  Então o sistema deve retornar o status 400 Bad Request
  E a resposta deve indicar que o ID é inválido
```

### **Cenário 13: Atualizar filme com dados inválidos**

```gherkin
Cenário: Atualizar filme com dados inválidos
  Dado que eu envio uma atualização com dados inválidos (como título vazio ou data de lançamento inválida)
  Quando eu envio uma requisição PUT para o endpoint /movies/{id} com esses dados
  Então o sistema deve retornar o status 400 Bad Request
  E a resposta deve indicar que os dados fornecidos são inválidos
```

### **Cenário 14: Atualizar filme com campo extra**

```gherkin
Cenário: Atualizar filme com campo extra
  Dado que eu envio uma atualização para um filme com um campo adicional não permitido (como "genero")
  Quando eu envio uma requisição PUT para o endpoint /movies/{id} com o campo extra
  Então o sistema deve retornar o status 400 Bad Request
  E a resposta deve indicar que o campo extra não é permitido
```

### **Cenário 15: Atualizar filme sem campos obrigatórios**

```gherkin
Cenário: Atualizar filme sem campos obrigatórios
  Dado que eu envio uma atualização para um filme sem alguns campos obrigatórios (como title ou description)
  Quando eu envio uma requisição PUT para o endpoint /movies/{id} com os campos obrigatórios ausentes
  Então o sistema deve retornar o status 400 Bad Request
  E a resposta deve listar os campos obrigatórios ausentes
```

### **Cenário 16: Excluir filme existente por ID**

```gherkin
Cenário: Excluir filme existente por ID
  Dado que existe um filme com um ID específico cadastrado na API
  Quando eu envio uma requisição DELETE para o endpoint /movies/{id} com esse ID
  Então o sistema deve retornar o status 204 No Content
  E o filme deve ser removido do banco de dados
```

### **Cenário 17: Excluir filme inexistente por ID**

```gherkin
Cenário: Excluir filme inexistente por ID
  Dado que o ID fornecido para exclusão não corresponde a nenhum filme
  Quando eu envio uma requisição DELETE para o endpoint /movies/{id} com esse ID
  Então o sistema deve retornar o status 404 Not Found
  E a resposta deve indicar que o filme não foi encontrado
```

### **Cenário 18: Excluir filme com ID inválido**

```gherkin
Cenário: Excluir filme com ID inválido
  Dado que o ID fornecido está em um formato inválido (como vazio ou com caracteres especiais)
  Quando eu envio uma requisição DELETE para o endpoint /movies/{id} com esse ID inválido
  Então o sistema deve retornar o status 400 Bad Request
  E a resposta deve indicar que o ID fornecido não é válido
```

--- 

Esta estrutura segue a sequência numérica correta para os casos de teste no formato Gherkin.

---

### **Casos de Teste em Gherkin para a Rota `/tickets`**

Aqui está a suíte de casos de teste para a rota `/tickets` no modelo Gherkin, com base nos detalhes fornecidos e similar à estrutura dos casos de teste da rota `/movies`:

### **Cenário 19: Reservar um novo ticket com dados válidos**

```gherkin
Cenário: Reservar um novo ticket com dados válidos
  Dado que eu tenho os detalhes do ticket com movieId, userId, seatNumber, price e showtime
  Quando eu envio uma requisição POST para o endpoint /tickets com esses dados
  Então o sistema deve criar o ticket e retornar o status 201 Created
  E a resposta deve conter o ID do novo ticket
```

### **Cenário 20: Reservar um ticket com dados incompletos**

```gherkin
Cenário: Reservar um ticket com dados incompletos
  Dado que os detalhes do ticket estão faltando um campo obrigatório (como movieId, userId, seatNumber, price ou showtime)
  Quando eu envio uma requisição POST para o endpoint /tickets com os dados incompletos
  Então o sistema deve retornar o status 400 Bad Request
  E a resposta deve indicar qual campo obrigatório está ausente
```

### **Cenário 21: Reservar um ticket com valores fora do intervalo permitido**

```gherkin
Cenário: Reservar um ticket com valores fora do intervalo permitido
  Dado que o número de assento é 150 e o preço é 70
  Quando eu envio uma requisição POST para o endpoint /tickets com esses dados
  Então o sistema deve retornar o status 400 Bad Request
  E a resposta deve indicar que os valores fornecidos estão fora dos limites permitidos
```

### **Cenário 22: Listar todos os tickets reservados**

```gherkin
Cenário: Listar todos os tickets reservados
  Dado que existem tickets reservados na API
  Quando eu envio uma requisição GET para o endpoint /tickets
  Então o sistema deve retornar uma lista de tickets com o status 200 OK
  E a resposta deve conter detalhes de cada ticket
```

### **Cenário 23: Consultar um ticket por ID válido**

```gherkin
Cenário: Consultar um ticket por ID válido
  Dado que existe um ticket com um ID específico reservado na API
  Quando eu envio uma requisição GET para o endpoint /tickets/{id} com esse ID
  Então o sistema deve retornar o status 200 OK
  E a resposta deve conter os detalhes completos do ticket
```

### **Cenário 24: Consultar um ticket inexistente por ID**

```gherkin
Cenário: Consultar um ticket inexistente por ID
  Dado que o ID fornecido não corresponde a nenhum ticket reservado
  Quando eu envio uma requisição GET para o endpoint /tickets/{id} com esse ID
  Então o sistema deve retornar o status 404 Not Found
  E a mensagem "Ticket não encontrado" deve ser exibida
```

### **Cenário 25: Consultar um ticket com ID inválido**

```gherkin
Cenário: Consultar um ticket com ID inválido
  Dado que o ID fornecido está em um formato inválido (como vazio ou com caracteres especiais)
  Quando eu envio uma requisição GET para o endpoint /tickets/{id} com esse ID inválido
  Então o sistema deve retornar o status 400 Bad Request
```

### **Cenário 26: Atualizar um ticket com dados válidos**

```gherkin
Cenário: Atualizar um ticket com dados válidos
  Dado que existe um ticket com um ID específico
  E eu tenho novos dados válidos para atualizar esse ticket (como seatNumber, price e showtime)
  Quando eu envio uma requisição PUT para o endpoint /tickets/{id} com os dados atualizados
  Então o sistema deve retornar o status 200 OK
  E a resposta deve conter os dados atualizados do ticket
```

### **Cenário 27: Atualizar um ticket com ID diferente na URL e no corpo**

```gherkin
Cenário: Atualizar um ticket com ID diferente na URL e no corpo
  Dado que eu forneci um ID no caminho da URL e um ID diferente no corpo da requisição
  Quando eu envio uma requisição PUT para o endpoint /tickets/{id} com IDs diferentes
  Então o sistema deve retornar o status 400 Bad Request
  E a resposta deve indicar a inconsistência de IDs
```

### **Cenário 28: Atualizar um ticket com campos obrigatórios vazios**

```gherkin
Cenário: Atualizar um ticket com campos obrigatórios vazios
  Dado que eu envio uma atualização para um ticket com um ou mais campos obrigatórios vazios (como seatNumber ou price)
  Quando eu envio uma requisição PUT para o endpoint /tickets/{id} com os campos vazios
  Então o sistema deve retornar o status 400 Bad Request
  E a resposta deve indicar que os campos obrigatórios não podem estar vazios
```

### **Cenário 29: Excluir um ticket existente por ID**

```gherkin
Cenário: Excluir um ticket existente por ID
  Dado que existe um ticket com um ID específico reservado na API
  Quando eu envio uma requisição DELETE para o endpoint /tickets/{id} com esse ID
  Então o sistema deve retornar o status 204 No Content
  E o ticket deve ser removido do banco de dados
```

### **Cenário 30: Excluir um ticket inexistente por ID**

```gherkin
Cenário: Excluir um ticket inexistente por ID
  Dado que o ID fornecido para exclusão não corresponde a nenhum ticket reservado
  Quando eu envio uma requisição DELETE para o endpoint /tickets/{id} com esse ID
  Então o sistema deve retornar o status 404 Not Found
  E a resposta deve indicar que o ticket não foi encontrado
```

### **Cenário 31: Excluir um ticket com ID inválido**

```gherkin
Cenário: Excluir um ticket com ID inválido
  Dado que o ID fornecido está em um formato inválido (como vazio ou com caracteres especiais)
  Quando eu envio uma requisição DELETE para o endpoint /tickets/{id} com esse ID inválido
  Então o sistema deve retornar o status 400 Bad Request
  E a resposta deve indicar que o ID fornecido não é válido
```

Essa suíte de casos de teste cobre os principais cenários para a rota `/tickets`, incluindo criação, consulta, atualização e exclusão de tickets, assim como a validação de erros de entrada.

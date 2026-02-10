
### Relatório de Bug - Rota **/movies**

---

#### Bug #1
- **ID do Bug:** RF004
- **Descrição:** Retorno incorreto ao consultar filme com ID inválido.
- **Cenário:** Consulta de filme com ID malformado (GET /movies/{id}).
- **Descrição do Problema:** A API deveria retornar **400 Bad Request** ao receber um ID inválido, mas retorna **404 Not Found**.
- **Resultado Esperado:** Retorno **400 Bad Request** para IDs inválidos.
- **Resultado Atual:** Retorno **404 Not Found**.
- **Impacto:** Usuários não conseguem diferenciar entre IDs malformados e IDs inexistentes, o que pode causar confusão.

---

#### Bug #2
- **ID do Bug:** RF006
- **Descrição:** Mensagens de erro para campos obrigatórios ausentes não documentadas no Swagger.
- **Cenário:** Cadastro de filme com campo obrigatório ausente (POST /movies).
- **Descrição do Problema:** A API retorna um erro **400 Bad Request** ao tentar cadastrar um filme com campos obrigatórios ausentes, mas as mensagens de erro correspondentes não estão documentadas no Swagger.
- **Resultado Esperado:** Mensagens de erro para campos obrigatórios ausentes devidamente documentadas no Swagger.
- **Resultado Atual:** Mensagens de erro ausentes na documentação.
- **Impacto:** Dificulta o entendimento e a utilização correta da API pelos desenvolvedores.

---

#### Bug #3
- **ID do Bug:** RF007
- **Descrição:** Permissão de cadastro de filmes com título duplicado.
- **Cenário:** Cadastro de filmes duplicados (POST /movies).
- **Descrição do Problema:** A API permite a criação de filmes com títulos duplicados, quando deveria rejeitar o cadastro com um erro **409 Conflict**.
- **Resultado Esperado:** Retorno **409 Conflict** ao tentar cadastrar filme com título duplicado.
- **Resultado Atual:** Filme é cadastrado mesmo com título duplicado.
- **Impacto:** Dados duplicados no banco podem levar a inconsistências e problemas na gestão de filmes.

---

#### Bug #4
- **ID do Bug:** RF008
- **Descrição:** Aceitação de campos adicionais não documentados no cadastro de filme.
- **Cenário:** Cadastro de filme com campo extra não permitido (POST /movies).
- **Descrição do Problema:** A API permite a criação de um filme com campos adicionais não documentados, como "genero", ao invés de rejeitar a requisição com um erro **400 Bad Request**.
- **Resultado Esperado:** Retorno **400 Bad Request** ao incluir campos extras.
- **Resultado Atual:** Filme é criado com campos extras não permitidos.
- **Impacto:** Dados adicionais podem causar problemas de compatibilidade e inconsistências no sistema.

---

#### Bug #5
- **ID do Bug:** RF013
- **Descrição:** Atualização de filme com dados inválidos retorna código de sucesso incorreto.
- **Cenário:** Atualização de filme com dados inválidos (PUT /movies/{id}).
- **Descrição do Problema:** A API deveria retornar **400 Bad Request** ao enviar dados inválidos, mas retorna **200 OK**.
- **Resultado Esperado:** Retorno **400 Bad Request** para dados inválidos.
- **Resultado Atual:** Retorno **200 OK**.
- **Impacto:** Pode levar a um banco de dados com informações incorretas, dificultando o gerenciamento e a confiabilidade dos dados.

---

#### Bug #6
- **ID do Bug:** RF014
- **Descrição:** Inclusão de campo extra na atualização de filme não gera erro esperado.
- **Cenário:** Atualização de filme com campo extra não permitido (PUT /movies/{id}).
- **Descrição do Problema:** A API permite a atualização de um filme com campos extras, como "genero", retornando **200 OK** ao invés de **400 Bad Request**.
- **Resultado Esperado:** Retorno **400 Bad Request** ao incluir campos extras não permitidos.
- **Resultado Atual:** Retorno **200 OK**.
- **Impacto:** A falta de validação para campos extras pode causar inconsistências e complicações ao gerenciar os dados.

---

#### Bug #7
- **ID do Bug:** RF015
- **Descrição:** Atualização de filme sem campos obrigatórios retorna código de sucesso incorreto.
- **Cenário:** Atualização de filme com ausência de campos obrigatórios (PUT /movies/{id}).
- **Descrição do Problema:** Ao tentar atualizar um filme sem preencher campos obrigatórios, a API retorna **200 OK** em vez de **400 Bad Request**.
- **Resultado Esperado:** Retorno **400 Bad Request** ao omitir campos obrigatórios.
- **Resultado Atual:** Retorno **200 OK**.
- **Impacto:** Dados incompletos podem ser salvos no banco, dificultando o gerenciamento de filmes.

---

#### Bug #8
- **ID do Bug:** RF016
- **Descrição:** Documentação incorreta para o retorno da exclusão de filme.
- **Cenário:** Exclusão de filme com ID válido (DELETE /movies/{id}).
- **Descrição do Problema:** A documentação indica o retorno **201 Created** para a exclusão de filme, mas o correto seria **200 OK** ou **204 No Content**.
- **Resultado Esperado:** Correção na documentação para indicar **200 OK** ou **204 No Content** ao excluir um filme.
- **Resultado Atual:** Documentação incorreta com **201 Created**.
- **Impacto:** A documentação errada pode confundir desenvolvedores que utilizam a API e dificultar a depuração.

---

#### Bug #9
- **ID do Bug:** RF018
- **Descrição:** Retorno incorreto ao tentar excluir com ID inválido.
- **Cenário:** Exclusão de filme com ID malformado (DELETE /movies/{id}).
- **Descrição do Problema:** A API deveria retornar **400 Bad Request** ao receber um ID inválido para exclusão, mas retorna **404 Not Found**.
- **Resultado Esperado:** Retorno **400 Bad Request** para IDs inválidos.
- **Resultado Atual:** Retorno **404 Not Found**.
- **Impacto:** Dificulta o tratamento de erros pelos clientes da API, uma vez que não há diferenciação clara entre IDs malformados e inexistentes.
### Relatório de Bug - Rotas **/movies** e **/tickets**

---

### Rota **/tickets**

#### Bug #10
#### Bug Crítico
- **Descrição:** API fecha ao fazer requisições na rota **/tickets**.
- **Cenário:** Qualquer requisição para a rota **/tickets**.
- **Descrição do Problema:** Todas as tentativas de requisição para a rota **/tickets** causam uma falha crítica que desliga o servidor. Este problema ocorre independentemente do tipo de requisição (GET, POST, PUT, DELETE).
- **Resultado Esperado:** A API deve responder normalmente para as requisições na rota **/tickets**.
- **Resultado Atual:** A API encerra o funcionamento, o que impede a execução e validação de testes para essa rota.
- **Impacto:** O problema impede qualquer tipo de teste e uso da funcionalidade de tickets, tornando a funcionalidade inutilizável e comprometendo a estabilidade da API.

---

### Ausência de Rotas para **Login** e **Usuários**

#### Bug #11
- **Descrição:** Ausência das rotas de **login** e **usuários** para diferenciação de acesso.
- **Cenário:** A API deveria oferecer rotas para login e gerenciamento de usuários.
- **Descrição do Problema:** Não há rotas para gerenciar diferentes tipos de usuário (comum e administrador), o que impede a aplicação de permissões diferenciadas para operações críticas.
- **Resultado Esperado:** Existência de rotas de login e usuários para autenticação e controle de acesso.
- **Resultado Atual:** A API não possui essas rotas, impossibilitando a distinção de permissões entre tipos de usuário.
- **Impacto:** Compromete a segurança e o gerenciamento de permissões dentro do sistema, tornando-o vulnerável a acessos indevidos a operações administrativas.

---

Este relatório apresenta um resumo dos principais problemas encontrados nas rotas **/movies** e **/tickets**, além da ausência de rotas de **login** e **usuários**. A falta dessas funcionalidades impede uma diferenciação de permissões e compromete a segurança e usabilidade da API, sendo fundamentais para a estruturação e operação segura do sistema.

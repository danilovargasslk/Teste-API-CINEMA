### **Plano de Teste para API Cinema**

---

### **1. Objetivo**
O objetivo deste plano de teste é validar as funcionalidades de CRUD (Create, Read, Update, Delete) para filmes e a criação e gerenciamento de tickets na API Cinema, assegurando que todos os critérios de aceitação sejam atendidos. O plano inclui estratégias para automação de testes, cenários macro e a criação de uma matriz de rastreabilidade.

### **2. Escopo**

#### **2.1 Funcionalidades a Serem Testadas**
- **Gerenciamento de Filmes:** Criação, atualização, leitura e exclusão de filmes.
- **Reserva de Ingressos:** Criação de reservas de tickets com validações de assento, preço e data.
- **Listagem e Consulta:** Listagem paginada de filmes e consulta de filmes e tickets por ID.

#### **2.2 Funcionalidades Não Incluídas**
- **Autenticação:** Observação importante - **não foi criada uma rota de login para autenticação de usuário.** Para o teste, todos os usuários são considerados autenticados, o que simplifica a automação mas pode ser um ponto a considerar para segurança futura.

### **3. User Stories**

#### **User Stories para a Rota `/movies`**
1. **Como usuário**, quero visualizar uma lista de todos os filmes cadastrados para consultar os disponíveis.
2. **Como administrador**, quero cadastrar um novo filme para manter o catálogo atualizado.
3. **Como usuário**, quero consultar detalhes de um filme específico usando o ID para obter informações completas.
4. **Como administrador**, quero atualizar os detalhes de um filme já cadastrado para corrigir ou atualizar informações.
5. **Como administrador**, quero excluir um filme específico pelo ID para remover registros desatualizados ou incorretos.

#### **User Stories para a Rota `/tickets`**
1. **Como usuário**, quero reservar um ticket para assistir a um filme em um assento específico, com data e horário definidos.
2. **Como usuário**, quero consultar a lista de tickets que reservei.
3. **Como usuário**, quero consultar um ticket específico usando o ID para confirmar os detalhes da reserva.
4. **Como administrador**, quero atualizar um ticket reservado para alterar detalhes como assento ou horário.
5. **Como administrador**, quero cancelar (excluir) um ticket reservado pelo ID.

### **4. Definition of Ready (DoR)**
Para considerar um item pronto para teste, o seguinte deve ser atendido:
   - A documentação da API está completa e atualizada.
   - Todos os requisitos funcionais e não funcionais foram definidos e aprovados.
   - A equipe de desenvolvimento disponibilizou o ambiente de testes e dados simulados.
   - As dependências de outras equipes ou serviços estão alinhadas e disponíveis.

### **5. Definition of Done (DoD)**
Para considerar o teste completo, o seguinte deve ser atendido:
   - Todos os casos de teste foram executados, e os resultados foram documentados.
   - Todos os bugs encontrados foram registrados no Relatório de Bugs.
   - A Matriz de Rastreabilidade foi preenchida, relacionando os casos de teste aos requisitos e critérios de aceitação.
   - Todos os critérios de aceitação foram cumpridos, sem pendências críticas.

### **6. Acceptance Criteria**

#### **Rota `/movies`**
1. **Criar Filme**: Quando o administrador envia uma solicitação POST com dados válidos, o sistema retorna status 201 e ID único do filme.
2. **Ler Lista de Filmes**: Quando o usuário envia uma solicitação GET, o sistema retorna uma lista de filmes em páginas de 20 itens.
3. **Consultar Filme por ID**: Quando o usuário envia uma solicitação GET com um ID válido, o sistema retorna os detalhes do filme.
4. **Atualizar Filme**: Quando o administrador envia uma solicitação PUT com ID válido e dados de atualização, o sistema retorna status 200 e dados atualizados.
5. **Excluir Filme**: Quando o administrador envia uma solicitação DELETE com ID válido, o sistema retorna status 204 e remove o filme do banco de dados.

#### **Rota `/tickets`**
1. **Reservar Ticket**: Quando o usuário envia uma solicitação POST com dados válidos (ID do filme, ID do usuário, assento, preço e horário), o sistema retorna status 201 e ID único do ticket.
2. **Listar Tickets**: Quando o usuário envia uma solicitação GET para listar todos os tickets, o sistema retorna uma lista paginada de tickets.
3. **Consultar Ticket por ID**: Quando o usuário envia uma solicitação GET com um ID de ticket válido, o sistema retorna os detalhes do ticket.
4. **Atualizar Ticket**: Quando o administrador envia uma solicitação PUT com ID válido e dados de atualização, o sistema retorna status 200 e os dados atualizados.
5. **Cancelar Ticket**: Quando o administrador envia uma solicitação DELETE com ID válido, o sistema retorna status 204 e remove o ticket do banco de dados.

### **7. Resumo da Estratégia de Teste**
A estratégia de teste para a API Cinema envolverá uma combinação de testes manuais e automatizados para cobrir todos os cenários críticos de filmes e tickets. O foco será em testar as funcionalidades de CRUD para filmes e tickets, garantindo que as reservas possam ser criadas, lidas, atualizadas e excluídas corretamente, incluindo a validação de cenários negativos e os bugs identificados.

### **8. Cenário Macro na Suíte de Testes**

#### **Cadastro, Consulta, Atualização e Exclusão de Filme e Ticket**

8.1 **Fluxo Completo de Gerenciamento de Filme**
   - **Objetivo**: Verificar o fluxo completo de criação de um novo filme, consulta dos detalhes, atualização de informações e exclusão subsequente.
   - **Etapas**:
     1. **Cadastro de Novo Filme**
     2. **Consulta do Filme Cadastrado**
     3. **Atualização do Filme**
     4. **Exclusão do Filme**

8.2 **Fluxo Completo de Reserva e Gerenciamento de Tickets**
   - **Objetivo**: Verificar o fluxo completo de criação de um novo ticket, consulta dos detalhes, atualização de informações e cancelamento subsequente.
   - **Etapas**:
     1. **Reserva de Novo Ticket**
     2. **Consulta do Ticket Cadastrado**
     3. **Atualização do Ticket**
     4. **Cancelamento do Ticket**

### **9. Automação de Testes**

#### **Ferramentas Utilizadas**
- **Postman** (com Newman para automação) para executar os testes de API de forma automatizada.
- **Jenkins** ou **GitLab CI/CD** para configurar pipelines de integração contínua e garantir a execução dos testes a cada alteração no código.

#### **Testes Candidatos à Automação**

1. **Para a Rota /movies**:
   - **POST /movies**
     - **Cadastro de Filme com Dados Válidos**: Verificar se um filme pode ser cadastrado com todos os dados válidos.
     - **Cadastro de Filme com Campos Obrigatórios Ausentes**: Verificar a rejeição de cadastros quando campos obrigatórios estão faltando.
     - **Cadastro de Filme com Campo Extra**: Validar se a API rejeita requisições com campos adicionais não documentados.

   - **GET /movies**
     - **Listar Todos os Filmes**: Verificar se a listagem de filmes é retornada com sucesso.
     - **Consulta de Filme por ID**: Validar a recuperação de um filme específico pelo ID.
     - **Consulta de Filme com ID Inválido**: Verificar se a API retorna o erro correto para um ID malformado.

   - **PUT /movies/{id}**
     - **Atualização de Filme com Dados Válidos**: Verificar se um filme pode ser atualizado corretamente com novos dados válidos.
     - **Atualização com IDs Diferentes na URL e no Corpo**: Validar o comportamento da API ao receber IDs diferentes na URL e no corpo da requisição.
     - **Atualização com Campos Obrigatórios Vazios**: Verificar se a API rejeita atualizações com campos obrigatórios vazios.

   - **DELETE /movies/{id}**
     - **Exclusão de Filme com ID Válido**: Verificar se um filme pode ser excluído com um ID válido.
     - **Exclusão de Filme com ID Inexistente**: Validar a resposta da API ao tentar excluir um filme inexistente.
     - **Exclusão de Filme com ID Inválido**: Verificar se a API rejeita a exclusão com um ID malformado.

2. **Para a Rota /tickets**:
   - **POST /tickets**
     - **Reserva de Ticket com Dados Válidos**: Verificar se um ticket é reservado com sucesso quando todos os dados obrigatórios estão presentes e válidos.
     - **Reserva de Ticket com Dados Incompletos**: Validar a resposta da API ao tentar criar um ticket com campos obrigatórios ausentes.
     - **Reserva de Ticket com Valores Fora do Intervalo**: Verificar se a API rejeita reservas com números de assento ou preço fora dos intervalos permitidos.

   - **GET /tickets**
     - **Listar Todos os Tickets**: Verificar se a listagem de tickets reservados é retornada corretamente.
     - **Consulta de Ticket por ID**: Validar a recuperação de um ticket específico pelo ID.
     - **Consulta de Ticket com ID Inválido**: Verificar se a API retorna o erro correto para um ID malformado.

   - **PUT /tickets/{id}**
     - **Atualização de Ticket com Dados Válidos**: Verificar se um ticket pode ser atualizado corretamente com novos dados válidos.
     - **Atualização de Ticket com ID Inválido**: Validar a resposta da API ao tentar atualizar um ticket com um ID malformado.
     - **Atualização com Dados Fora dos Limites**: Testar se a API rejeita atualizações com valores inválidos para assento ou preço.

   - **DELETE /tickets/{id}**
     - **Cancelamento de Ticket com ID Válido**: Verificar se um ticket pode ser cancelado com um ID válido.
     - **Cancelamento de Ticket Inexistente**: Validar a resposta da API ao tentar cancelar um ticket inexistente.
     - **Cancelamento com ID Inválido**: Verificar se a API rejeita o cancelamento com um ID malformado.

#### **Objetivos da Automação**
- **Prevenção de Regressões**: Assegurar que as funcionalidades essenciais e requisitos sejam testados continuamente, reduzindo o risco de regressões.
- **Eficiência e Repetibilidade**: Automatizar testes repetitivos e críticos para que a equipe de QA possa se concentrar em testes exploratórios e de maior valor agregado.
- **Execução Contínua em CI/CD**: Configurar os testes automatizados para serem executados a cada alteração de código no pipeline de integração contínua, proporcionando feedback imediato sobre a qualidade da API.





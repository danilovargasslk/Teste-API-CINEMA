# Justificativa para Não Implementação de Testes na Rota `/tickets`

## Visão Geral

Durante o desenvolvimento e testes da API Cinema, identificamos um problema crítico na rota `/tickets`. Todas as tentativas de requisições para esta rota causam um erro grave, que acaba derrubando o servidor.

## Motivo para a Exclusão dos Testes

Devido a esse comportamento inesperado e ao impacto significativo que ele causa na estabilidade da API, decidimos **não incluir testes para a rota `/tickets`** neste projeto. Essa decisão foi tomada para garantir que os testes em outras rotas (como `/movies`) pudessem ser executados com confiabilidade e sem interrupções.

## Próximos Passos

Recomendamos que, uma vez que os problemas críticos na rota `/tickets` sejam resolvidos, ela seja considerada para cobertura de testes futuros, a fim de garantir o bom funcionamento da API como um todo.

## Formas alternativas

Com a instabilidade da rota `/tickets` um teste alternativo foi realizado utilizando Postman, nele as resposta da rota `/tickets` foram recebidas sem danificar a estabilidade das outras rotas
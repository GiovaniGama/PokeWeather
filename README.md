# Projeto Angular de Previsão do Tempo e Pokémon

## Visão Geral

Este é um projeto Angular que combina a previsão do tempo local com a exibição de Pokémon com base na temperatura atual. Ele usa o Angular Material para criar uma interface do usuário amigável.

## Funcionalidades

- Os usuários podem inserir o nome de uma cidade.
- O projeto obtém a previsão do tempo para essa cidade.
- Com base na temperatura, o projeto seleciona um Pokémon correspondente.
- A interface do usuário exibe informações sobre a cidade, temperatura, descrição do clima e o Pokémon selecionado.

## Tecnologias Utilizadas

- Angular: Framework front-end.
- Angular Material: Biblioteca de design e UI.
- PokeAPI: API de informações sobre Pokémon.
- OpenWeatherMap API: API de previsão do tempo.

## Estrutura do Projeto

A estrutura do projeto inclui os seguintes componentes:

- `PokeWeatherPageComponent`: O componente principal que lida com a lógica da aplicação e a exibição da interface.
- `PokeWeatherService`: Um serviço que faz chamadas à PokeAPI e OpenWeatherMap API para obter dados.
- `LoadingComponent`: Um componente de carregamento exibido durante as solicitações assíncronas.
- Outros componentes, módulos e arquivos relacionados à interface do usuário.

## Fluxo de Trabalho

1. O usuário insere o nome de uma cidade na interface.
2. O aplicativo faz uma solicitação à API de previsão do tempo (OpenWeatherMap API) para obter informações sobre a temperatura e o clima da cidade.
3. Com base na temperatura, o aplicativo determina um tipo de Pokémon correspondente.
4. O aplicativo faz uma solicitação à API de informações sobre Pokémon (PokeAPI) para obter Pokémon do tipo correspondente.
5. Os dados da cidade, temperatura, clima e Pokémon são exibidos na interface do usuário.

## Configuração do Projeto

Certifique-se de que o projeto esteja configurado com o Angular e o Angular Material instalados. Os serviços de API também devem ser configurados corretamente.

## Instruções de Execução

1. Clone o repositório do projeto.

2. Navegue até a raiz do projeto no terminal e rode npm install.

3. Execute o comando `ng serve` para iniciar o servidor de desenvolvimento.

4. Abra um navegador e acesse `http://localhost:4200/` para usar o aplicativo.

5. Execute o comando `docker build . -f Dockerfile -t poke-weather` para criar a imagem docker.

6. Execute o comando `docker compose up` para iniciar o servidor usando a imagem docker.


## Autores

- [Giovani Gama]


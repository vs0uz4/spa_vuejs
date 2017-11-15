# spa_vuejs (work in progress)
Single Page Aplication com Vue.js em Ambiente Dockerizado

> Este projeto foi desenvolvido durante o acompanhamento do curso de SPA com Vue.js no site da [Edukee](http://www.treinatom.com.br/pt/edukee/detalhes-do-evento/190edc6b7593e3081a858f55652abd92a9d07353).

## Sobre o Curso
TL;DR 

O objetivo do curso é habilitar o aluno a desenvolver uma single page application com Vue.js, Vuex e Webpack. 

Durante o curso os seguintes conceitos serão abordados e perguntas serão respondidas: 
- Por que escolher o Vue.js;
- Ferramentas necessárias (Node.js, npm/yarn, Webpack, vue-cli);
- Por que precisamos de dois projetos separados (Web Service e SPA);
- Visão geral do Vue.js (Quais Problemas ele Resolve);
- Principais recursos (Data Binding, Componentes, Template, Diretivas, State e Events).

## Temas abordados
- Criação do projeto com o **vue-cli**;
- Análise da estrutura de **pastas** e **arquivos** fornecida com o projeto;
- Criação de **componentes** principais de cada uma das duas funcionalidades previstas;
- Análise dos recursos gerados pelo **Webpack** e explicações de como ele trabalha;
- Análise do **web service** responsável pela persistência dos dados no server;
- Implementação do login com JSON Web Token (**JWT**);
- Implementação da navegação com **vue-router**;
- ~~Implementação do visual com **Element.io**;~~
- Desenvolvimento da primeira funcionalidade;
- Trabalhar com listas (**v-for**);
- Criar e validar **formulário**;
- Enviar as informações para o web service;
- Compartilhar informações dentro da app (intro ao **Vuex**);
- Desenvolvimento da segunda funcionalidade;
- Dashboard;
- Componentes e CSS;
- Chart com **Highcharts**;
- Proteger **rotas**.
- ...

## Pré-requisitos do Curso
Espera-se que o aluno já tenha o conhecimento prévio de `Javascript` e do ambiente do `Browser`. E ter assistido ao screencast e série respectivamente relacionados nos links abaixo:

- JSON Web Tokens - **[JWT](https://www.youtube.com/watch?v=k3KfK0ZS_FY&t=716s)**;
- Webservice RESTful com Node.js, Restify e MySQL - **[API](https://www.youtube.com/playlist?list=PLFJmwzuHdBRTBbkyH0gATtDhj6ikOIkMy)**

> Cabe resaltar que este repositório tem por finalidade eliminar a obrigatoriedade de preparação de todo um ambiente de desenvolvimento `node.js`. A única obrigatoriedade para executar o projeto, será a de ter minimamente instalados e devidamente configurados em sua máquina os serviços/ferramentas `docker` e `docker-compose`. 

## Adaptações
Como tenho preferência por trabalhar em ambientes dockerizados, fiz algumas adaptações no projeto, implementando `containers` docker, para rodar a aplicação. Para isto, fiz uso do **[Ambientum](https://github.com/codecasts/ambientum)**.

> E qual a vantagem dessas adaptações que fiz? Existem diversas vantagens, além da já citada anteriormente sobre o ambiente de desenvolvimento, temos a flexibilidade de poder roda-lo em qualquer plataforma, desde que tenhamos minimamente instaladas e configuradas as ferramentas: **[docker](https://www.docker.com)** e **[docker-compose](https://docs.docker.com/compose)**.

## Mas o que é? E o que faz esse tal Ambientum?
O Ambientum é um conjunto de imagens **Docker** desenvolvidas, mantidas e distribuidas pelo **[CODECASTS](https://codecasts.com.br)**. E ele pode lhe ajudar com algumas coisas incríveis, os 3 cenários mais comuns estão listados a seguir:

- **Rodar Laravel e/ou Vue.JS em Desenvolvimento.**
- **Rodar Laravel e/ou Vue.JS em Produção (Includindo Integração Contínua).**
- **Substituir dependências locais com comandos que rodam no Docker.**

## Blz, e o que eu Preciso Saber Antes de Começar?

Sem sombra de dúvidas, o Ambientum irá facilitar a sua vida em muito, principalmente no que diz respeito a ambientes de desenvolvimento dockerizados, mas antes de você começar a brincar com o Ambientum, alguns conhecimentos são necessários:

* O básico sobre Docker e Containers.
* Estar confortável usando a linha de comando.
* Saber operar o docker-compose.
* Ler o **README** do Ambientum.

Mas não se preocupem, o readme está escrito em dois idiomas: Inglês e Português.

## Instalação e Execução

1. Faça o clone do repositório e no terminal navegue até a pasta criada com os comandos abaixo:

```
git clone git@github.com:vs0uz4/spa_vuejs.git
cd spa_vuejs
```

2. Faça uma cópia do `docker-compose.yaml.example` para um novo arquivo com nome de `docker-compose.yaml`, abra em um editor de sua preferência e faça a troca de toda ocorrência de `sandbox` para algo que referêncie melhor o projeto, como por exemplo, `spavuejs`. 

```
cp docker-compose.yaml.example docker-compose.yaml
```

Exemplo de configuração das variáveis.
```
version: '2'

volumes:
  spa_vuejs-config:
    driver: local

  spa_vuejs-cache:
    driver: local

  spa_vuejs-local:
    driver: local

  spa_vuejs-yarn:
    driver: local

  spa_vuejs-npm:
    driver: local

services:
  dev:
    image: ambientum/node:8
    container_name: spa_vuejs-dev
    command: npm run dev
    volumes:
      - .:/var/www/app
      - spa_vuejs-config:/home/ambientum/.config
      - spa_vuejs-cache:/home/ambientum/.cache
      - spa_vuejs-local:/home/ambientum/.local
      - spa_vuejs-yarn:/home/ambientum/.yarn
      - spa_vuejs-npm:/home/ambientum/.npm
    ports:
      - "8080:8080"

  production-server:
    image: nginx:stable-alpine
    container_name: spa_vuejs-server
    volumes:
      - ./dist:/usr/share/nginx/html
    ports:
      - "9090:80"
```

3. Atualize o `npm` e instale todas as dependências do `node` com os comandos abaixo:

```
docker-compose create
docker-compose run dev npm install -g npm
docker-compose run dev npm install
```

4. Inicialize os containers, disponibilizando a aplicação em `localhost:8080`.

```
docker-compose up
```

> O comando acima, irá criar e inicializar todos os containers definidos no arquivo `docker-compose.yml`, e logo após irá executar internamente o comando `npm run dev`.


## Gerando o Build para produção
Para gerarmos o build do projeto para ser colocado em produção, basta executarmos o comando abaixo:

```
docker-compose run dev npm run build
```

> Caso necessite acompanhar com mais detalhes o processo de build para produção, você pode facilmente gerar um relatório ao criar o build de produção, seguindo o comando abaixo:

```
docker-compose run dev npm run build --report
```


## Sugestão
Caso necessite de uma explicação detalhada sobre como as coisas funcionam, confira o
[guia](http://vuejs-templates.github.io/webpack/) e [documentação do vue-loader](http://vuejs.github.io/vue-loader).


## Telas

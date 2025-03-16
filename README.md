# Radio Browser

>  This is a challenge by [Coodesh](https://coodesh.com/)

Uma aplicação web para explorar e gerenciar estações de rádio online com recursos de favoritos.

[Projeto](https://vercel.com/cesars-projects-a58c6c33/radio-browser/2dJTLxR2KBJs5kpTLcDHeLizzFZT)

## Tecnologias Usadas

- **Linguagens**:
  - TypeScript
  - JavaScript (ES6+)
  
- **Frameworks**:
  - [Next.js](https://nextjs.org/) (React Framework)

- **Bibliotecas**:
  - [React](https://reactjs.org/)
  - [Tailwind CSS](https://tailwindcss.com/)

- **Outras Tecnologias**:
  - [Node.js](https://nodejs.org/)
  - [Docker](https://www.docker.com/)

## Como Instalar e Usar o Projeto

### 1. Clonar o Repositório

Primeiro, clone o repositório para o seu ambiente local:

```bash
git clone https://github.com/SEU_USUARIO/radio-browser.git
cd radio-browser
```

## Como executar o projeto localmente

### Método nativo

Para executar o projeto de forma nativa, realize o clone do projeto e execute so seguintes comandos dentro da pasta:
```
npm install 

npm build

npm start
```
ou

```
yarn install

yarn build

yarn start
```

### Docker

Para executar o projeto com docker, realize o clone do projeto e execute os seguintes comandos dentro da pasta raíz do projeto:
```
docker build -t radio-browser .
docker run -p 3000:3000 radio-browser
```

Após isso, basta abrir no navegador na porta:
````
localhost:3000
````

**Tenha certeza de que possua o `Docker` de seu sistema operacional instalado na máquina.**

Após isso, basta abrir no navegador a `URL localhost` na porta `8080` e o retorno inicial irá aparecer.

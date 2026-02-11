# farmacia-online
Teste técnico para desenvolvimento de uma aplicação web com backend em Laravel e frontend em Angular, focado no gerenciamento de produtos.

O objetivo do projeto é disponibilizar uma API para cadastro, listagem com paginação, atualização e busca de produtos, além de um frontend para consumo dessa API.

## Organização das pastas

O projeto está organizado em um único repositório, separado por responsabilidades:

Árvore de arquivos :
```
farmacia-online
│
├── backend/ # API desenvolvida em Laravel
│   
└── frontend/ # Aplicação frontend desenvolvida em Angular

```

## 🚀 Tecnologias Utilizadas

### Backend
- PHP
- Laravel
- MySQL

### Frontend
- Angular
- TypeScript
- HTML / CSS

## Estrutura da Tabela products
```
- id (int)
- name (string)
- price (decimal 10,2)
- description (text)
- category (string)
- active (boolean)
- created_at
- updated_at
```

## 📦 Backend (Laravel)

O backend é responsável por expor uma API REST para o gerenciamento de produtos, incluindo:

- Cadastro de produtos
- Listagem de produtos com paginação
- Atualização de produtos
- Busca de produtos por nome

A aplicação utiliza MySQL como banco de dados.

### Pré-requisitos
- PHP 8.1+
- Composer
- MySQL

## 🔗 Endpoints da API

Base URL:
http://localhost:8000/api

### 📌 Listar produtos (com paginação)
GET /products

Parâmetros opcionais:
- page (int)
- search (string)

Exemplo:
- GET /products?page=1
- GET /products?search=analgesico
- GET /products?search=a&page=2

---

### 📌 Cadastrar produto
POST /products

Body (JSON):
```
{
  "name": "Dipirona",
  "price": 12.90,
  "description": "Analgésico",
  "category": "Medicamento",
  "active": true
}
```
Retorno:
201 Created

---

### 📌 Atualizar produto
PUT /products/{id}
```
Body (JSON):
{
  "name": "Dipirona 500mg",
  "price": 14.90,
  "description": "Analgésico atualizado",
  "category": "Medicamento",
  "active": true
}
```
Retorno:
200 OK

### Como rodar o backend localmente

1. Clone o repositório:

```
git clone https://github.com/maxzdosreis/farmacia-online.git
```
Esse comando cria a pasta:
```
farmacia-online/
```

2. Acesse a pasta do projeto:
```
cd farmacia-online
```

3. Acesse a pasta backend:
```
cd backend
```

4. Instale as dependências:
```
composer install
```
Obs: sem isso o Laravel não irá funcionar.

5. Crie manualmente um banco de dados no MySQL com o nome farmacia_online:
```
farmacia_online
```

6. Crie o arquivo de ambiente:
```
cp .env.example .env
```
Obs: esse comando cria o arquivo de configuração local conforme o .env.example.

7. Gere a chave da aplicação:
```
php artisan key:generate
```

8. Abra o arquivo de ambiente, que está dentro do projeto em:
```
farmacia-online/backend/.env
```
Obs: Esse arquivo é local, não vai para o GitHub.

9. Localize a seção de banco de dados dentro do .env:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=farmacia_online
DB_USERNAME=root
DB_PASSWORD=
```
Obs: Siga o exemplo de .env.example e configure conforme o exemplo.

O que cada coisa significa (importante entender):

- DB_CONNECTION
→ tipo do banco (mysql)

- DB_HOST
→ onde o banco está rodando
→ normalmente 127.0.0.1 ou localhost

- DB_PORT
→ porta padrão do MySQL (3306)

- DB_DATABASE
→ nome do banco que você criou manualmente

- DB_USERNAME / DB_PASSWORD
→ credenciais do MySQL da sua máquina

10. Salve o arquivo .env.

11. Rode as migrations:
```
php artisan migrate
```

12. Suba o servidor:
```
php artisan serve
```

13. Acesse o navegador:
```
http://localhost:8000
```

## 🖥️ Frontend (Angular)

O frontend será responsável por consumir a API do backend e disponibilizar uma interface para gerenciamento dos produtos.

> O frontend ainda deverá ser desenvolvido.

## 🧠 Decisões de Projeto

- O backend e o frontend foram separados em projetos distintos, comunicando-se via API REST.
- O banco de dados é criado manualmente, enquanto as tabelas são gerenciadas pelo Laravel.
- O escopo do projeto foi mantido simples, focando exclusivamente na entidade Produto.
- Foram priorizados clareza, organização e facilidade de manutenção do código.

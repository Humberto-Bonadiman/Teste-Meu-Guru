# Boas vindas ao repositório do projeto Teste MeuGuru

![MeuGuru](MeuGuru.png)

---

## Descrição do Projeto
Nesse projeto, eu construi um back-end usando `ORM` com o pacote `prisma` do `npm`, e fui capaz de:
 - Criar a tabela de usuários
 - Realizar a busca de usuários com a funcionalidade de paginação
 - Realizar a alteração de dados e excluir usuários

Já no front-end eu criei uma aplicação React com TypeScript e fui capaz de:
 - Montar uma tabela de usuários com os dados vindos do back-end
 - Buscar pelo nome no back-end e mostar os dados dos usuários encontrados
 - Realizar paginação a cada 10 usuários

---

## Imagem da Aplicação

![Tabela_de_Usuários](Tabela_Usuarios.png)

## Instalação do projeto localmente

1. Abra o terminal e realize o clone do projeto:
```javascript
  git clone git@github.com:Humberto-Bonadiman/Teste-Meu-Guru.git
```

2. Acesse o diretório do projeto e depois utilize o comando **npm run install-all** para instalar todas as dependências necessárias:
```javascript
  cd Teste-Meu-Guru
  npm run install-all
```

3. No arquivo **.env.example** localizada na pasta backend, troque onde contém **userPostgres** pelo seu usuário do postgresql e onde contém **passwordPostgres** mude para a sua senha do postgres.
```javascript
DATABASE_URL="postgresql://userPostgres:passwordPostgres@localhost:5432/mydb?schema=public"
```

4. Por último, abra duas abas do terminal e em uma rode o comando **npm run start-back** e na outra rode o comando **npm run start-front** acesse o projeto via browser, no caminho `http://localhost:3000/`.
```javascript
  npm run start-back
```
```javascript
  npm run start-front
```

---

## Testes

### Para testar a aplicação frontend utilize os comandos abaixo no terminal a partir da raiz do projeto

OBS.: Para rodar estes testes é necessário que tanto o frontend quanto o backend do projeto estejam rodando.

```javascript
  cd frontend
  npm run cypress:run
```

### Para testar a aplicação frontend utilize os comandos abaixo no terminal a partir da raiz do projeto

OBS.: Para rodar estes testes é necessário que o backend do projeto **NÃO** esteja rodando.

```javascript
  cd backend
  npm run test
```

---

## Exemplos de uso da API no terminal

OBS.: Para realizar os comandos abaixo você deve abrir duas abas do terminal e digitar os comandos a partir da pasta raiz
</br>
Terminal 1
```javascript
  npm run start-back
```
Terminal 2
```javascript
  cd backend
```
Os próximos passos serão realizados no terminal 2

OBS.: O body das requisições de criação e atualização de usuários seguem as seguintes regras:
 - **name**, **email** e **password** são obrigatórios
 - O campo **email** é único por usuário
 - O campo **name** deve conter pelo menos 8 caracteres
 - O campo **password** deve conter pelo menos 6 caracteres
 - O campo **email** deve conter um e-mail válido no seguinte formato -> usuario@email.com

### Digite o comando abaixo para criar um usuário
```javascript
http :3001/user name='Bianca Araujo Monteiro' email='bianca_monteiro@email.com' password='12345678'
```

### Digite o comando abaixo para visualizar todos os usuários cadastrados
```javascript
http :3001/user
```
### Digite o comando abaixo para visualizar os primeiros 10 usuários cadastrados
```javascript
http :3001/user/search/1
```

### Digite o comando abaixo para visualizar o usuário conforme o nome ou e-mail
```javascript
http :3001/user/search queryString==Bianca
```

### Digite o comando abaixo para atualizar os dados do usuário criado
OBS.: Utilizar o id gerado na criação do usuário no lugar de :id
```javascript
http PUT :3001/user/:id email='bianca_araujo@email.com' name='Bianca Araujo Monteiro' password='123456789'
```

### Digite o comando abaixo para deletar os dados do usuário
OBS.: Utilizar o id gerado na criação do usuário no lugar de :id
```javascript
http DELETE :3001/user/:id
```

---

## Exemplos de uso da API em programas de requisições de HTTP (Ex.: Postman, Insomnia, Thunder Client)
</br>
Terminal

```javascript
  npm run start-back
```

OBS.: O body das requisições de criação e atualização de usuários seguem as seguintes regras:
 - **name**, **email** e **password** são obrigatórios
 - O campo **email** é único por usuário
 - O campo **name** deve conter pelo menos 8 caracteres
 - O campo **password** deve conter pelo menos 6 caracteres
 - O campo **email** deve conter um e-mail válido no seguinte formato -> usuario@email.com

### Digite os comandos abaixo para criar um usuário
```javascript
http://localhost:3001/user
```
body
```javascript
{
    "email": "bianca_monteiro@email.com",
    "name": "Bianca Araujo Monteiro",
    "password": "12345678"
}
```
![CREATE](CREATE.png)

### Digite os comandos abaixo para visualizar todos os usuários cadastrados
```javascript
http://localhost:3001/user
```

![GET_ALL](GET_All.png)

### Digite os comandos abaixo para visualizar os primeiros 10 usuários cadastrados
```javascript
http://localhost:3001/user/search/1
```

![GET_Pagination](GET_Pagination.png)


### Digite os comandos abaixo para visualizar o usuário conforme o nome ou e-mail
```javascript
http://localhost:3001/user/search?queryString=Bianca
```

![GET_QueryString](GET_QueryString.png)

### Digite os comandos abaixo para atualizar os dados do usuário criado
OBS.: Utilizar o id gerado na criação do usuário no lugar de :id

```javascript
http://localhost:3001/user/:id
```

body
```javascript
{
    "email": "bianca_araujo@email.com",
    "name": "Bianca Araujo Monteiro",
    "password": "12345678"
}
```

![UPDATE](UPDATE.png)

### Digite o comando abaixo para deletar os dados do usuário
OBS.: Utilizar o id gerado na criação do usuário no lugar de :id
```javascript
http://localhost:3001/user/:id
```

![DELETE.png](DELETE.png)

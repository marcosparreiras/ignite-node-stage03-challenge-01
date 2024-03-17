# API para a adoção de animais, a FindAFriend API, utiliza de conceitos SOLID e testes.

### Regras da aplicação

- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG

### Regras de negócio

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

# Teste a aplicação em sua máquina

Certifique-se de ter o Docker e o Node.js instalados em sua máquina antes de prosseguir.

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)

1. Faça o clone do projeto

```bash
git clone https://github.com/marcosparreiras/ignite-node-stage03-challenge-01.git
```

2. Navegue até diretório do projeto e instale as dependências com o comando:

```bash
npm install
```

3. Renomeie o arquivo `.env.example` para `.env` e complete as variaveis de ambiente com informações válidas

4. Suba o banco de dados utilizando Docker Compose:

```bash
docker compose up -d
```

5. Inicie a aplicação em modo de desenvolvimento:

```bash
npm run dev
```

ou, rode os testes de unidade com o comando:

```bash
npm run test
```

ou, rode os testes end-to-end com o comando:

```bash
npm run test:e2e
```

# Endpoints

### Criar uma Org

- Endpoint: `/orgs`
- Método: POST
- Descrição: Este endpoint é usado para criar uma nova org
- Corpo da requisição

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "whatsapp": "string",
  "address": {
    "city": "string",
    "state": "string",
    "street": "string",
    "number": "number"
  }
}
```

---

### Login como uma Org

- Endpoint: `/orgs/sessions`
- Método: POST
- Descrição: Este endpoint é utilizado para fazer login como uma org
- Corpo da requisição

```json
{
  "email": "string",
  "password": "string"
}
```

---

### Buscar um Pet por ID

- Endpoint: `/pets/:id`
- Método: GET
- Descrição: Este endpoint é utilizado para buscar um pet com base na sua ID

---

### Buscar Pets em uma Cidade

- Endpoint: `/pet/search/:city`
- Método: GET
- Descrição: Este endpoint é utilizado para buscar pets em uma cidade com base em diferentes parâmetros
- Parâmetros de consulta:
  -- age: "puppy" | "juvenile" | "adult" | "senior"
  -- size: "small" | "medium" | "big"
  -- energyLevel: "low" | "medium" | "high"
  -- LevelOfIndependence: "low" | "medium" | "high"
  -- typeOfEnvironment: "closed" | "open"

---

### Criar um Pet

- Endpoint: `/pets`
- Método: POST
- Descrição: Este endpoint é utilizado para criar um novo pet
- Corpo da requisição

```typescript
{
  "name": "string",
  "description": "string",
  "age": "puppy" | "juvenile" | "adult" | "senior",
  "size": "small" | "medium" | "big",
  "energyLevel": "low" | "medium" | "high",
  "levelOfIndependence": "low" | "medium" | "high",
  "typeOfEnvironment": "closed" | "open",
}
```

- Cabeçalhos da requisição: É necessário estar autenticado como uma org para esta ação

```json
{
  "Authorization": "Bearer token"
}
```

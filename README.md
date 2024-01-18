API para a adoção de animais, a FindAFriend API, utiliza de conceitos SOLID e testes.

### Regras da aplicação

[x] Deve ser possível cadastrar um pet
[x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
[x] Deve ser possível filtrar pets por suas características
[x] Deve ser possível visualizar detalhes de um pet para adoção
[x] Deve ser possível se cadastrar como uma ORG
[x] Deve ser possível realizar login como uma ORG

### Regras de negócio

[x] Para listar os pets, obrigatoriamente precisamos informar a cidade
[x] Uma ORG precisa ter um endereço e um número de WhatsApp
[x] Um pet deve estar ligado a uma ORG
[x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
[x] Todos os filtros, além da cidade, são opcionais
[x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## Endpoints

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

### Buscar um Pet por ID

- Endpoint: `/pets/:id`
- Método: GET
- Descrição: Este endpoint é utilizado para buscar um pet com base na sua ID

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

### Criar um Pet

- Endpoint: `/pets`
- Método: POST
- Descrição: Este endpoint é utilizado para criar um novo pet
- Corpo da requisição

```json
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

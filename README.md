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

```typescript
interface Pet {
  id: string;
  props: {
    name: string;
    description: string;
    age: "puppy" | "juvenile" | "adult" | "senior";
    size: "small" | "medium" | "big";
    energyLevel: "low" | "medium" | "high";
    LevelOfIndependence: "low" | "medium" | "high";
    typeOfEnvironment: "closed" | "semi-open" | "open";
    photos: string[];
    requirementsForAdoption: string[];
    orgId: string;
    createdAt: Date;
    updatedAt?: Date;
  };
}

interface Org {
  id: string;
  props: {
    name: string;
    email: string;
    password: string;
    whatsapp: string;
    address: {
      city: string;
      state: string;
      street: string;
      number: number;
    };
    createdAt: Date;
    updatedAt?: Date;
  };
}
```
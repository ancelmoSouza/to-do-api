# TO-DO API

API para gerenciamento de tarefas (To-Do), desenvolvida usandoom Node.js e TypeScript.

---

## 🚀 Tecnologias escolhidas

-   **Node.js** – Biblioteca JavaScript usada no servidor
-   **TypeScript** – Usado para tipagem JavaScript
    **Motivo da escolha**: Escolhi estas tecnologias ao invés de NestJS pois são tecnologias que passei a estudar a algum tempo e tenho familiaridade e preferência no uso das mesmas. Optei por usá-las ao invés do NestJS uma vez que não tenho conhecimento suficiente, tanto prático quanto teórico, sobre a tecnologia tendo tido um contato mínimo com a mesma, por isso optei por usar as tecnologias que tenho mais familiaridade.

---

## 📦 Setup do projeto

Após clonar o repositório, execute o comando abaixo no diretório raiz do projeto para instalar todas as dependências :

```bash
npm install
```

Se estiver usando yarn, use:

```bash
yarn install
```

Certifique-se de que o Node esteja instalado.

## 🛠️ Inicialização do Banco de Dados

Na raiz do projeto, há uma pasta chamada `/script` que contém o arquivo `database.sql`.  
Esse arquivo possui os comandos SQL necessários para criar a estrutura do banco de dados.

### Como executar:

Você pode utilizar qualquer cliente MySQL (como MySQL Workbench, DBeaver, ou o terminal) para executar o script:

**Via terminal MySQL:**

```bash
mysql -u seu_usuario -p < script/database.sql
```

Não esqueça de configurar as variáveis de ambiente em uma arquivo .env basta remover o .example do arquivo **.env.example** e terá o arquivo pronto para configuração

---

## 🚀 Como testar

No diretorio raiz do projeto há uma pasta insomnia_examples, la contem um arquivo com todas as rotas de teste do projeto, basta exportar no insomnia e testá-las

---

## 🚀 Comandos para rodar localmente

Após instalar as dependências, rode o seguinte comando para executar o servidor em ambiente de desenvolvimento:

```bash
npm start
```

---

## 📌 Decisões Técnicas

-   **Fastify ao invés de Express**: escolhido por ser mais rápido que o express alem de ter suporte nativo par JsonSchema, além disso eu prefiro (pessoalmente) o uso do fastify ao express

-   **Yup para validação**: optado por ser leve e facilmente integrável ao Fastify. Sendo simples de adicionar ao projeto e uma escolha pessoal.

-   **Separação em camadas (Controller, Service, etc.)**: permite organizar melhor a distribuição de responsabilidades, oarganização do própio código e permite que a estrutura do projeto seja entendida com mais clareza. A escolha de usar uma construção em MVC se dá devido ao fato de que o padrão permite uma clareza de estrutura de forma simples além de se adequar facilmente a outros padrões como SOLID e também uma escolha pessoal.

-   **TypeScript**: adotado para aumentar a segurança do código e oferecer suporte completo a tipagem estática, reduzindo erros em tempo de desenvolvimento.

-   **Acesso direto ao banco de dados (sem ORM)**: escolhido para construir a conexão afim de evitar uso de ferramentas automáticas, além de permitir um maior controle sobre as operações reaizadas.

-   **JWT para autenticação**: escolhido por ser um padrão seguro e amplamente adotado para autenticação.

-   **Dotenv**: usado para manter as variáveis mais delicadas longe do código fonte, facilitando a configuração entre os ambientes de desenvolvimento e produção.

---

## 🔮 Melhorias Futuras

-   **Validação de tipos mais avançada** usando JSON Schema diretamente com Fastify para melhor integração e performance.
-   **Criação de testes automatizados** (unitários e de integração) com ferramentas como Jest ou Vitest.
-   **Documentação automática da API** utilizando Swagger ou Fastify Swagger Plugin.
-   **Paginação e ordenação em listagens** de tarefas para melhor controle de grandes volumes de dados.
-   **Implementar um sistema de permissões/roles** para usuários com diferentes níveis de acesso.
-   **Melhorar o nível de segurança de dados** a fim de garantir maior proteção para dados sensíveis.
-   **Criar sistema de logs** para menter um registro das operações realizadas e das mudanças nos dados
-   **Aumentar as opções de filtros** permitindo uma busca mais detalhada

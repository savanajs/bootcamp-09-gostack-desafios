# Gympoint

A aplicação que iremos dar início ao desenvolvimento a partir de agora é um app gerenciador de academia, o Gympoint.

## Tecnologias

#### Pacotes

- NODEJS
- Express
- Sequelize
- PostgreSQL
- yarn

#### Instalar o node
https://github.com/nvm-sh/nvm

#### Instalar o nvm
https://github.com/coreybutler/nvm-windows

#### Instalalar Yarn
https://yarnpkg.com/en/docs/install#windows-stable

## Dependecias

#### Criar package.json

```sh
yarn init -y
```

#### Instalação

```sh
yarn install
```

## App

#### Rodar servidor

```sh
yarn dev
```

#### Endereço do servidor

http://localhost:3333

## Ambiente de desenvolvimento

#### Adicionar Emmit nos JSX e configs

No vscode aperte crtl + shift + p, e insira
esse codigo

```javascript
"emmet.syntaxProfiles": {
    "javascript": "jsx",
},
"emmet.includeLanguages": {
    "javascript": "javascriptreact",
},
"javascript.updateImportsOnFileMove.enabled": "never",
"editor.parameterHints.enabled": false,
"breadcrumbs.enabled": true,
"javascript.suggest.autoImports": false
```

#### Extensoes para o chrome

- React developer tools

#### Ferramentas

- Insomnia (Client http)
- DevDocs - https://devdocs.egoist.moe/ ou https://devdocs.io/

## Instalações e configurações

#### Eslint

ESLint é uma ferramenta para identificar e relatar padrões encontrados no código ECMAScript / JavaScript.

```sh
yarn add eslint-plugin-import eslint@5.16.0 -D
```

É preciso instalar a extensão do eslint no vscode também.

##### Criar arquivo de configuração do eslint

```sh
yarn eslint --init

# How would you like to use ESLint?
# To check syntax, find problems, and enforce code style

# What type of modules does your project use? (Use arrow keys)
# JavaScript modules (import/export)

# Which framework does your project use? (Use arrow keys)
# None of these

# Does your project use TypeScript?
# No

# Where does your code run?
# Node

# How would you like to define a style for your project? (Use arrow keys)
# Use a popular style guid > airbnb

# What format do you want your config file to be in? (Use arrow keys)
# JavaScript

# Would you like to install them now with npm?
# Y
```

##### VScode autocorretor

Abrir o arquivo settings.json (crtl + shift + p).

```json
"eslint.autoFixOnSave": true,
"eslint.validate": [
    {
        "language": "javascript",
        "autoFix": true
    },
    {
        "language": "javascriptreact",
        "autoFix": true
    },
    {
        "language": "typescript",
        "autoFix": true
    },
    {
        "language": "typescriptreact",
        "autoFix": true
    }
]
```

** Consertar todos os arquivos **

```sh
yarn eslint --fix src --ext .js
```

#### PRETTIER

##### Verificar de tamanho de linhas

```sh
yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
```

##### E insira o prettier no .eslintrc.js

```js
{
 extends: [
    'airbnb-base',
    'prettier'
  ],
  plugins: [
    'prettier'
  ],
}
```

##### Criar arquivo no root chamado .prettierrc

```json
{
    "singleQuote": true,
    "trailingComma": "es5"
}
```

#### Servidor

##### Instalar Express

```sh
yarn add express
```

##### Instalar Nodemon & Sucrase

Para funcionar os imports no node

```sh
yarn add sucrase nodemon -D
```

##### Criar um arquivo nodemon.json

```json
{
    "execMap": {
        "js": "node -r sucrase/register"
    }
}
```

##### No package.json

```json
"scripts": {
    "dev": "nodemon src/server.js",
    "dev:debug": "nodemon --inspect src/server.js"
}
```

##### Configurações de debug

VSCODE > Launch Program > Adicionar nova configuração > node

```json
{
    // Use o IntelliSense para aprender sobre possíveis atributos.
    // Passe o mouse para ver as descrições dos atributos existentes.
    // Para obter mais informações, visite: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "attach",
            "name": "Launch Program",
            "restart": true,
            "protocol": "inspector"
        }
    ]
}
```

#### Database

##### Instalar Sequelize

```sh
yarn add sequelize
yarn add sequelize-cli -D
```

##### Instalar BD postgrees

```sh
yarn add pg pg-hstore
```

Crie um arquivo de configuração (.sequelizerc)

## Comandos no Sequelize

#### Criar Seed

```sh
yarn sequelize seed:generate --name admin-user
```

#### Executar Seeds

```sh
yarn sequelize db:seed:all
```

#### Criar migration

```sh
yarn sequelize migration:create --name=create-users
```

#### Criar migrations

```sh
yarn sequelize db:migrate
```

#### Remover a ultima migration adicionada

```sh
yarn sequelize db:migrate:undo
```

#### Remover todas as migrations

```sh
yarn sequelize db:migrate:undo:all
```

## MD5 Gerar secret

https://www.md5online.org/

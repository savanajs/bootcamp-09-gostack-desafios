# Gympoint

## Back-end

### Database

Postgree

#### Nome do banco de dados

gympoint

#### Rodar migrates

```sh
yarn sequelize db:migrate:undo:all
```

#### Rodar seeds

- Usuário
- Estudantes
- Planos

```sh
yarn sequelize db:seed:all
```

### App

#### Instalar dependencias

```sh
yarn install
```

#### Rodar o app

```sh
yarn dev
```

#### Rodar as filas

```sh
yarn queue
```

## Front-end

#### Instalar dependencias

```sh
yarn install
```

#### Rodar o app

```sh
yarn start
```

## Mobile (Only Android)

#### Instalar dependencias

1.Copy gradle folder inside android/ from my existing working project root

2.Go to android directory and run this: ./gradlew installDebug

3.Now copy your gradle folder back to the original location.

4.Delete node_modules e yarn install

```sh
yarn install
```

#### Rodar o app

```sh
react-native run-android
```
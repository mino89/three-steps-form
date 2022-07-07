# three-steps-form

A simple three steps form in Vue
## Project setup
```
yarn install
```
### Compiles, hot-reloads app and server mock for development
it serve the project on `localhost:3000` by default
```
yarn dev
```
### Compiles and minifies for production
```
yarn build
```
### Serve builded package and run server mock
Remember to build before run this command.
it serve the project on `localhost:8080` by default
```
yarn serve
```
### Run your unit tests
```
yarn test:unit
```
### Lints and fixes files
```
yarn lint
```
## Valid Values

I have create a server mock in `server.js` here i will simulate the behavior of an 
hypothetical backend service.
### Available Options
the only available options: request params don't match returns error

```
{
  size: ['M', 'L', 'XXL'],
  color: ['red', 'yellow', 'green'],
  emote: ['cactus', 'pine', 'palm']
}
```
### Users
if request param matches one of these returns error

```
[
  {
    name: 'Mario Rossi',
    email: 'existing-mail@mail.com'
  },
  {
    name: 'Francesco Bianchi',
    email: 'other-existing-mail@mail.com'
  }
]
```
### Addresses
if request param matches one of these returns error

```
[
  'existing street 122',
  'main street 46'
]
```

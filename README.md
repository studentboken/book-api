# Book API for Node JS
### A fully async API written in ES6 for fetching books from various sources
***
![npm badge](https://img.shields.io/npm/v/book-api.svg)

### Setting up

##### Installing

```
npm install book-api
```

##### Quickstart


```JavaScript
const {Akademibokhandeln, Adlibris} = require('book-api');

const source = new Adlibris();

// Search for books
source.search('Test Driven Development')
.then(books => {
  console.log(books);
});
```

```
[
  {
    images: { small:
        '<image-url>.jpg'
      },
    url: '<url>',
    title: 'C# and .NET Core Test-Driven Development',
    authors: [ 'Ayobami Adewole' ],
    description:
     'Learn how to apply a test-driven development process by building  ready C# 7 and .NET Core applications.Key Features Create tests to quickly detect and resolve issues when writing...',
    formfactor: 'paperback',
    published: '2018',
    language: 'Engelska',
    isbn: '9781788292481',
    price: '364',
    priceUnit: 'sek'
  },
  ...
]
```

### Contributing

Any contribution is welcome. If you're not able to code it yourself, perhaps someone else is - so post an issue if there's anything on your mind.

###### Development

Clone the repository:
```
git clone https://github.com/AlexGustafsson/book-api.git && cd book-api
```

Set up for development:
```
npm install
```

Follow the conventions enforced:
```
npm run lint
npm run test
npm run coverage
npm run check-duplicate-code
```

### Disclaimer

_Although the project is very capable, it is not built with production in mind. Therefore there might be complications when trying to use the API for large-scale projects meant for the public. The API was created to easily fetch information about books programmatically and as such it might not promote best practices nor be performant. This project is not in any way affiliated with Akademibokhandeln or Adlibris._

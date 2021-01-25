# CalOSBA Service Centers Finder

Survey to help find eligible CalOSBA service centers.

## Development

On the first run:

  $ yarn install 

Build the app:

  $ yarn build

Start a dev server on localhost:3000:

  $ yarn start

## Development

Data is json

## Headers

```javascript
{
  "Basic Information": { header: true }
  ...
}
```

## Translations

Update UI options:

```javascript
var language_defaults = {
  en: {
    yes_text: "Yes",
    no_text: "No",
    ...
  }
};
```

Add to questions and headers:

```javascript
{
  "Section Title": {
    header: true,
    es: "Spanish Section Title"
  },
  test: {
    html: "English text",
    yes_text: "English: yes button",
    es: {
      html: "Spanish text",
      yes_text: "Spanish: yes button"
    }
  },
}
```

# Contributing
We welcome contributions to open source code and documentation

See [CONTRIBUTING.md](CONTRIBUTING.md) for additional information.

# License

Creative Commons Zero license

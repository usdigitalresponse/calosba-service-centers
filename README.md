# CalOSBA Service Centers Finder

Survey to help find eligible CalOSBA service centers.

# Docs v2

This describes the new React-based form interface.

## Development

On the first run:

  $ yarn install

And then to test the form interface:

  $ yarn start

This will open a browser window with just the form.

The contents of the form itself are defined in src/form.json

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

[![Continuous Integration](https://github.com/ludibel/calendar/actions/workflows/CI.yml/badge.svg?branch=main)](https://github.com/ludibel/calendar/actions/workflows/CI.yml)

## Installation des dépendances

### Docker

### Vite

### Material UI

### Emotion

### Linter

1. ESLint

`yarn add --dev eslint`

`yarn eslint --init`

### Vitest

1. Installation

`yarn add -dev vitest`

et

jsdom aide à obtenir l'environnement de test dans le DOM, émule l'environnement du navigateur en fournissant l'API du navigateur

Testing-library/React permet d'avoir des fonctions utilitaires pour tester des composant

`yarn add --dev jsdom @testing-library/react`

Testing-library/jest-dom bibliotheque complémentaire à Testing-library qui fournit des correspondances d'élement iDOM personnalisés pour Jest

`yarn add --dev jsdom @testing-library/jest-dom`

2. Configuration

Dans le fichier vite.config.ts ajouter

```
/// <reference types="vitest" />
/// <reference types="vite/client" />
```

et

`test: { globals: true, environment: 'jsdom', } `

Dans package.json on ajoute la commande de test dans le script
`test: "vitest"`

3. Creation du test

Création d'un fichier test par ici ConvertionDate.test.tsx

```
import {describe, test} from 'vitest';

describe("Convertion Date test", () => {
test("Convert Date ", () => {

    })
})
```

4. Lancement du test
   `yarn run test`

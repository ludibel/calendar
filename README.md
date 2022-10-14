[![Continuous Integration](https://github.com/ludibel/calendar/actions/workflows/CI.yml/badge.svg?branch=main)](https://github.com/ludibel/calendar/actions/workflows/CI.yml)

# Application de prise de rendez-vous

![cover](https://github.com/ludibel/calendar/public/calendar_availability.png)

Application de prise de rendez-vous à la façon "doctolib" dans le but de mettre en
relation des profils similaires qui peuvent s'exercer aux entretiens d'embauche en s'appuyant sur la solution de visioconférence open source JITSI.

Les technologies, languages et frameworks utilisés sont :

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Emotion](https://img.shields.io/badge/EMOTION-C43BAD.svg?style=for-the-badge&logo=&logoColor=white)
![Vitest](https://img.shields.io/badge/VITEST-729b1b.svg?style=for-the-badge&logo=''&logoColor=white)

## Installation de Docker

1. Création d'un fichier Dockerfile
2. Création du fichier docker-compose
3. Exécutez les commandes suivantes (sous linux):

Ne pas oublier de changer les arguments ARG et les paramétres git dans le fichier Dockerfile

```
USER_ID=$(id -u) GROUP_ID=$(id -g) docker-compose build
```

```
docker-compose up -d
```

Cette commande permet de rentrer en shell dans notre conteneur Node qui héberge l'application

```
docker exec -it docker_node sh
```

Vous devriez voir apparaitre l'invité de commande ci-dessous

```
/app $
```

# Tech:Lounge Summer Edition - Fullstack-Testen - von der Unit bis zur UI

Dieses repository enthält den Beispielcode für das Webinar zum Thema Fullstack-Testen.

Es besteht aus einem Backend, in dem mit express.js in Typescript eine kleine Ticket-Buchungs-API umgesetzt ist, sowie einem Frontend, das mit webpack, TypeScript und React gebaut ist und mit dem Backend interagiert.

Der Fokus liegt hierbei auf sauberem Code und vorzeigbaren Tests, nicht auf Featureumfang.

## Starten der Anwendung

Um den ticketeer mit backend, frontend und datenbank zu starten, kann das `docker-compose.yml` Manifest im Projekt-Root verwendet werden:

```shell
$ docker-compose build && docker-compose up
```

Das frontend ist dann erreichbar unter `http://localhost:8080`.

## Ausführen der Tests

- Das Backend hat eine [eigene kurze Readme](./backend/README.md) mit einer Anleitung zum Ausführen der Tests.
- Das Frontend hat hat ebenfalls eine [eigene Readme](./frontend/README.md), welche das Ausführen der im Frontend etwas komplexeren Tests beschreibt.
- Die Ausführung der E2E Tests ist [in dieser Readme](./e2e/readme.md) beschrieben.

# E2E Tests

In diesem Ordner befinden sich die E2E-Tests, welche mit Cypress implementiert sind.

## Install

Zuerst müssen die Abhängigkeiten installiert werden:

```shell
$ npm install
```

Da Cypress ein recht großes Binary runterlädt und installiert, kann die Installation etwas länger dauern.

## Tests ausführen

Die E2E Tests erwarten eine laufende Anwendung unter `http://localhost:8080` - am einfachsten geht das, in dem die Gesamt-Anwendung per `docker-compose` startet, sowie es in der [übergeordneten Readme](../README.md) beschrieben ist.

Danach kann man Cypress entweder **Headless** oder mit der **Cypress-GUI** starten.

### Headless

Tests werden nur in der CLI ausgeführt (meistens in CI Umgebungen verwendet).

```shell
npm run test
```

*Eine Info: Die Test-Ausführung wird im Headless-Mode als Video aufgezeichnet und in [cypress/videos](cypress/videos/appTest.cy.js.mp4) hinterlegt.*

### Cypress GUI

Die Cypress-GUI ist eine Applikation, bei der die Testausführung gestartet sowie live beobachtet werden kann.

```shell
npm run cypress:open
```

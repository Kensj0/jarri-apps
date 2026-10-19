# jarri-apps

Jarris visualiseringar av apparna. Varje mapp innehåller panelkoden för en app, och `apps.json` listar alla appar.

Backend för varje app ligger i sitt eget repo och körs utan Jarri. Panelerna pratar med backend över lokal HTTP på `127.0.0.1` och port enligt respektive `jarri.json`.

| App | Backend | Port | Typ |
|---|---|---|---|
| terminal | github.com/Kensj0/terminal | 8781 | native |
| phone | github.com/Kensj0/phone | 8782 | native |
| ai-usage | github.com/Kensj0/ai-usage | 8783 | native |
| claude-history | github.com/Kensj0/claude-history | 8784 | native |
| module-store | github.com/Kensj0/module-store | 8785 | native |
| browser | github.com/Kensj0/claude-in-brave | 8786 | native |
| clipboard | github.com/Kensj0/zorin-clipboard-pling | 8787 | native |
| kennystuner | github.com/Kensj0/kennystuner | (webb) | embed |

- **native:** Jarris egen visualisering i React. Beror på Jarri Core (`core/types`, `core/panelSemantics`) och på `@xterm` för terminalen.
- **embed:** appen har eget UI på webben, och Jarri visar det i en ruta.

## Licens

Visualiseringarna i den här mappen är under MIT (se [LICENSE](LICENSE)). Backend för varje app har sin egen licens i sitt repo.

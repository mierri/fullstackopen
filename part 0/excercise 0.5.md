sequenceDiagram
    participant browser
    participant server
    Note right of browser: El usuario escribe texto y hace clic en Save
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note right of server: El servidor guarda la nueva nota
    server-->>browser: 302 redireccion a /notes
    deactivate server
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: el archivo css
    deactivate server
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: el archivo JavaScript
    deactivate server
    Note right of browser: El navegador ejecuta el JS que pide el JSON al servidor
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ content: HTML is easy, date: 2023-1-1 }, ..., la nota nueva]
    deactivate server
    Note right of browser: El navegador ejecuta el callback que renderiza las notas, incluida la nueva
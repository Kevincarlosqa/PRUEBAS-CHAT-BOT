## ESTRUCTURA BASE DE DATOS
### Tablas Principales
  - Respuestas (answer) => Guarda todas las respuestas a los diagnosticos de todos los casos
  - Casos (case) => Guarda toda la informacion de los casos (titulo, examen, historial, antecedentes, tarea, dolor)
  - Imagenes (image) => Guarda la informacion de las imagenes (url, titulo, tipo, informacion, caso asignado)
  - Bibliografia (paper) => Guarda la informacion de los papers a consultar (titulo y autor)
  - Consultas IA (Question) => Guarda todas las consultas hechas por los usuarios a la IA (question, userId, date)
  - Pasos (Step) => Guarda el nivel en el que estan los usuarios en los chats (errores, user, tema, caso, paper, stage)
  - Temas (Theme) => Guarda los temas de cada chat (name, botIndex)
  - Usuarios (User) => Guarda los usuarios que usan el chat (telegramId, name)

### Tablas relacionadas
  - Respuestas y Casos (AnsersOnCases) => Guarda las opciones de respuesta que van a aparecer en cada caso, ademas de cual es la correcta (answerId, caseId, isCorrect)
  - Temas y Casos (ThemesOnCases) => Guarda los casos que van a aparecer en tema o cada chat (themeId, caseId)
  - Temas y Bibliografias (ThemesOnPapers) => Guarda las bibliografias que van a aparecer en cada tema o chat (themeId, paperId)


### INSTRUCTIVO
  - Exsite un chat general que en cada mensaje va a enviar un indice con los chats disponibles.
#### CHATS
  - El usuario proveedor (doctor) debe definir cuantos temas va a tener en total
  - Debe crear el bot para cada tema, subir las credenciales al archivo .env usando el nombre patron **TELEGRAM_TEMA_nn_KEY**.
  - En la ruta **src/helpers/db/keys** se debe agregar si el valor no existe
    - key: para la variable de entorno con la credencial del chat
    - link: el enlace del chat
    - webhook: el nombre de la ruta sin considerar **app/api/webhook/**
    - name: El nombre del tema que va a aparecer en el chat general
  - Para setear los webhooks se tiene la ruta GET **api/setWebhooks**, la cual va a revisar que exista *key* y *webhook*

  - Cada chat va a mostrar los casos asignados al tema

### RUTAS
  - Todas las rutas para obtener, editar o agregar informacion estaran en la carpeta **api/info**
  - Todos los datos devueltos estan en la propiedad **data**

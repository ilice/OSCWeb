# OSCWeb

## Desarrollo

Lo primero es instalar todas las librerias necesarias

```
$ npm install
```

Se puede arrancar un sencillo servidor que abre el navegador y lo deja sincronizado con el código de forma que si modificamos el ódigo, automáticamente se construye lo necesario y se actualiza el navegador.

```
$ gulp serve
```

## Stack

### Front End

#### [<img src="https://docs.npmjs.com/images/npm.svg" alt="npm" style="height: 16px;"/>](https://www.npmjs.com/)

[npm](https://www.npmjs.com/) será nuestro gestor de paquetes para Front End, la descripción del proyecto está en el archivo package.json, la documentación al respecto está en ["Using a package.json"](https://docs.npmjs.com/getting-started/using-a-package.json).

Para utilizarlo es necesario tener instalado [node.js](https://nodejs.org/en/).

Una vez que tenemos estos paquetes necesitamos construirlos. Para ello utilizaremos [Browserify](http://browserify.org/).

#### [<img alt="browserify" src="https://carlosazaustre.es/blog/content/images/2015/03/687474703a2f2f737562737461636b2e6e65742f696d616765732f62726f777365726966795f6c6f676f2e706e67.png" alt="Browserify" style="height: 20px;"/>](http://browserify.org/)

[Browserify](http://browserify.org/) será el encargado de generar el archivo de javascript que tendrá nuestro código, las dependencias y demás.

[Webpack](https://webpack.github.io/) (parece que se está convirtiendo en el estándar) además nos permitiría generar transformaciones a nuestro código , por ejemplo para utilizar coffescript y generar el js. También permite requerir assets como .png. Es bastante más avanzado, de momento con Browserify tenemos suficiente.

Esto generaría tareas repetitivas, para eso utilizamos un automatizador.

#### [<img height="40" alt="Gulp" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">](http://gulpjs.com/)

Usaremos [Gulp](http://gulpjs.com/) que utiliza el archivo [gulpfile.js](/.gulpfile.js) para saber paso a paso lo que tiene que ejecutar. Por ejemplo le diremos que utilice browserify para generar el js, que copie las imágenes o los css a la carpeta que digamos. Esto nos permite tener mejor organizado nuestro código. Otra alternativa es [grunt](http://gruntjs.com/).

Lo utilizaremos solo en desarrollo por lo que lo ponemos como dependencia solo de desarrollo.

```
$ npm install gulp --save-dev
```

Además utilizaremos un preprocesador para css para que en desarrollo sea más fácil escribir el código css, por ejemplo añadiendo variables o campos calculados y una sintaxis más sencilla en general.

#### [<img src="http://sass-lang.com/assets/img/logos/logo-b6e1ef6e.svg" alt="Sass" style="height: 18px;"/>](http://sass-lang.com/)

Utilizaremos [Sass](http://sass-lang.com/) en desarrollo como preprocesador css para que quede más organizado.

```
$ npm install gulp-sass --save-dev
```

### [<img src="https://raw.githubusercontent.com/babel/logo/master/babel.png" alt="babel" style="height: 20px;"/>](https://babeljs.io/)

Lo utilizaremos para poder usar código java nuevo en navegadores que no lo tienen implementado, como las arros functions

Utilizaremos babelify que nos permite usar babel en browserify.

```
$ npm install --save-dev  browserify babelify vinyl-source-stream  babel-preset-es2015
```

### [<img src="http://f.cl.ly/items/3i3n001d0s1Q031r2q1P/page.png" alt="pagejs" style="height: 35px;"/>](https://visionmedia.github.io/page.js/)
[pagejs](https://visionmedia.github.io/page.js/) nos permitirá construir la aplicación como una single page, sin recargar cada vez.
```
$ npm install --save page
```

### [<img src="https://raw.githubusercontent.com/maxogden/yo-yo/master/yoyojs.png" alt="pagejs" style="height: 35px;"/>](https://www.npmjs.com/package/yo-yo)

Utilizaremos esta librería [yo-yo](https://www.npmjs.com/package/yo-yo) para ayudarnos mantener el código modularizado al estilo React.

### Back End

#### python - Servidor
Como servidor utilizaremos a futuro Django, temporalmente utilizaremos [SimpleHTTPServer](https://docs.python.org/2/library/simplehttpserver.html) como una forma muy sencilla de empezar, levanta un servidor que sirve el contenido del directorio actual. Para ejecutalo le pasamos el puerto:

```
$ python -m SimpleHTTPServer 8000
```
En el directorio raiz hay un [ejecutable (startserver.bat)](./startserver.bat) para lanzarlo en windows de manera sencilla.

## Diseño

De momento no se usa nada en especial, puede ser interesante Materialize o Material Design Lite, este último es del equipo de google. Está pendiente de decisión. Puede ser interesante mirar cómo está [aquí](https://github.com/google/web-starter-kit/blob/master/docs/mdl-sass.md)

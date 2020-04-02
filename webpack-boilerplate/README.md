# Стартовый репозиторий с webpack

**Основная идея проекта — разделение кода конфигурационного файла сборщика для удобства использования и дальнейшего расширения, а также содержание файла конфига в порядке.
Необходимые модули загрузчиков, плагинов, опций и пресетов сборщика находятся в папке webpack. Для соединения файлов используется плагин [webpack-merge](https://github.com/survivejs/webpack-merge).
Проект является стартовым шаблоном для frontend-разработки c webpack. Клонируйте репозиторий на свой компьютер, и положите исходные файлы вашего проекта в папку src.**

Общий код для продакшена и для разработки находится в отдельном объекте "commonConfig".
Код отдельно для продакшена и отдельно для разработки будет добавлен в зависимости от значения переменной ```mode```.
Переменная ```mode``` передается через скрипты в ```package.json``` и доступна глобально в коде файлов конфига сборщика
через ```process.env.mode``` (```env``` - свойство глобального объекта process в nodejs ).

#### Используемые в проекте технологии:
##### Загрузчики ( loaders ):
1. [babel-loader](https://github.com/babel/babel-loader) — загрузчик js-файлов
2. [css-loader](https://github.com/webpack-contrib/css-loader) — загрузчик css-файлов
3. [eslint-loader](https://github.com/webpack-contrib/eslint-loader) — линтер js-файлов
4. [file-loader](https://github.com/webpack-contrib/file-loader) — загрузчик файлов статических ресурсов, таких как шрифты, изображения и т.д.
5. [html-loader](https://github.com/webpack-contrib/html-loader) — заргузчик html-файлов
6. [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader) — оптимизатор файлов изображений
7. [postcss-loader](https://github.com/postcss/postcss-loader) — постпроцессор стилевых файлов
8. [pug-html-loader](https://github.com/willyelm/pug-html-loader) — загрузчик pug-файлов
9. [sass-loader](https://github.com/webpack-contrib/sass-loader) — загрузчик sass/scss-файлов
10. [style-loader](https://github.com/webpack-contrib/style-loader) — загрузчик стилевых файлов

##### Плагины ( plugins ):
1. [browser-sync-webpack-plugin](https://github.com/Va1/browser-sync-webpack-plugin) — локальный сервер разработки с [browser-sync](https://www.browsersync.io/)
2. [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin) — очищает папку сборки перед каждой пересборкой
3. [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin) — копирует отдельные файлы или целые каталоги, которые уже существуют, в каталог сборки
4. [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) — генерирует html-файл в папке сборки
5. [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) — извлекает css-файлы в папку назначения
6. [stylelint-webpack-plugin](https://github.com/webpack-contrib/stylelint-webpack-plugin) — подключате к проекту stylelint - линтер стилевых файлов
7. [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin) — оптимизатор js-файлов

##### Опции настроек сборщика:
1. [entry](https://webpack.js.org/concepts/entry-points/) — точка входа ( entry point )
2. [output](https://webpack.js.org/concepts/output/) — опция устанавливает имя конечного файла бандла и имя папки сборки
3. [optimization](https://webpack.js.org/configuration/optimization/) — включает оптимизацию js-файлов
4. [devtool](https://webpack.js.org/configuration/devtool/) — генерирует карты кода ( source map ) для js/css-файлов

##### Пресеты — указывают, какие загрузчики использовать для файлов с тем или иным расширением:
1. css — пресет для css-файлов
2. font — пресет для файлов шрифтов
3. img — пресет для файлов изображений
4. js — пресет для js-файлов
5. pug — пресет для pug-файлов
6. sass-scss — пресет для sass/scss-файлов

## Команды

```bash
npm run prod         # сборка проекта
npm run dev-server   # запуск сервера разработки
npm run browser-sync # запуск сервера разработки с browser-sync
npm run deploy       # отправка содержимого папки сборки на gh-pages
```

## Структура

```bash
dist/                # папка сборки
src/                 # исходники
  pages/             # папка с примерами разбиения страниц на блоки
    blog/            # блок blog
      index.html     # страница блока
      index.js       # скрипт блока
    index/           # блок index
      index.html     # страница блока 
      index.js       # скрипт блока
webpack/             # папка с отдельными модулями сборщика
  configs/           # папка с конфигами для линтеров, постпроцессора и babel-loader'а
  loaders/           # папка с модулями загрузчиков (loaders)
  options/           # папка с модулями опций сборщика
  plugins/           # папка с модулями плагинов
  presets/           # папка с модулями пресетов  
```
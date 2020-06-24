Эта статья – пошаговое исчерпывающее руководство по созданию собственной системы сеток с использованием препроцессора 
Sass. Подробно, шаг за шагом я покажу, как создать модульную, гибкую и легко кастомизируемую библиотеку, реализующую 
адаптивную сетку, наподобие той, что используется в фреймворках Bootstrap, Foundation, Bulma и многих других.
Библиотека позволит быстро и без особых усилий создавать адаптивные, отзывчивые макеты. Итак, приступим!

# Два подхода при построении сетки
При построении сетки используются два основополагающих подхода:
 - Первый подход – в разметке страницы необходимым html-элементам прописываются нужные сеточные классы. Все детали реализации 
 скрыты в CSS:
```html
<div class="container">
  <div class="row">
    <div class="col-12 col-sm-6 col-md-3 col-xs-2"></div>
    <div class="col col-sm-4 col-md-3 col-xs-1"></div>
  </div>
</div> 
```
  
- Второй подход – все необходимые для реализации компонентов сетки правила прописываются в нужных селекторах в 
стилевом файле:

```css
.card {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
}
```

```html
<section class="card">
 <div class="card__header"></div>
 <div class="card__body"></div>
 <div class="card__footer"></div>
</section> 
```

Ни один из подходов не является более или менее правильным по отношению один к другому. У каждого имеются как свои плюсы, 
так и минусы. Какой из них выбрать – лишь вопрос ваших предпочтений. При первом подходе разметка засоряется большим 
количеством классов, которые к тому же приходится запоминать. При втором подходе усложняются стили. Мы в своей библиотеке
реализуем оба этих подхода – библиотека будет включать как богатый набор предопределенных классов, так и набор готовых 
sass/scss миксинов и функций, в совокупности реализующих адаптивную сетку.

# Элементы сетки
Каждая сетка должна включать элементы контейнера, рядов и колонок.

# Структура каталогов
```bash
grid/
  sass/ - реализиция бибиотеки в sass-синтаксисе
  scss/ - реализация библиотеки в scss-синтаксисе
    mixins/ - миксины библиотеки, реализующие ядро
    partials/ - части библиотеки, реализующие генерацию предопределённых сеточных классов
    base.scss - начальная инициализация сетки
    grid.scss - главный файл, точка входа в библиотеку
```

```grid/``` - это основная директория, в которой будет храниться весь код нашей библиотеки

```sass/``` - в этой директории будет храниться код библиотеки в sass-синтаксисе

```scss/``` - в этой директории будет храниться код библиотеки в scss-синтаксисе

```mixins/``` - директория с миксинами, реализующими основной функционал библиотеки

```partials/``` - директория хранит код, отвечающий за генерацию предопределённых готовых классов библиотеки
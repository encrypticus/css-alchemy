import './main-nav.scss';

const mainList = document.querySelector('.main-nav__list_level-1'); // главный список меню верхнего уровня
const sublists = document.querySelectorAll('.main-nav__item_has-child > .main-nav__link + .main-nav__list'); // все вложенные списки
const { body } = document;
const { documentElement } = document;
const { forEach } = Array.prototype;
let zIndex = 2;

function createMenu(list) {
  const listItems = list.children;

  if (listItems.length > 0) {
    forEach.call(listItems, (listItem) => {
      if (listItem.classList.contains('main-nav__item_has-child')) {
        const childLink = listItem.children[0]; // ссылка текущего элемента списка
        const childList = listItem.children[1]; // вложенный список текущего элемента списка
        const parentList = listItem.parentElement; // родительский список текущего элемента списка
        const siblings = parentList.children; // соседние элементы списка текущего элемента списка
        const childListSublists = childList.querySelectorAll('.main-nav__list'); // все дочерние списки любой глубины вложенности дочернего списка текущего элемента списка

        childList.style.zIndex = ++zIndex;

        childLink.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();

          // Закрыть все вложенные списки
          forEach.call(childListSublists, (childListSublist) => {
            childListSublist.classList.remove('main-nav__list_visible');
          });

          // Закрыть все вложенные списки соседних элементов списка
          forEach.call(siblings, (sibling) => {
            if (sibling !== listItem) {
              const siblingsLists = sibling.querySelectorAll('.main-nav__list');

              forEach.call(siblingsLists, (siblingList) => {
                siblingList.classList.remove('main-nav__list_visible');
              });
            }
          });

          // Скрыть/показать вложенный список
          childList.classList.toggle('main-nav__list_visible');
          // childLink.classList.toggle('main-nav__link_active');
        });

        createMenu(childList);
      }
    });
  }
}

// При клике на body и на html нужно закрыть все вложенные списки
documentElement.addEventListener('click', () => {
  forEach.call(sublists, (sublist) => {
    sublist.classList.remove('main-nav__list_visible');
  });
});

body.addEventListener('click', () => {
  forEach.call(sublists, (sublist) => {
    sublist.classList.remove('main-nav__list_visible');
  });
});

createMenu(mainList);

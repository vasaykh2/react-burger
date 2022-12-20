# Проект: "React-burger"

### Обзор

- Интро
- Методы
- Инструменты

**Интро**

Это начало студенческого проекта Yandex-Практикума курса web-разработки+ "Космическая Бургерная". На 7-м спринте создана главная страница бургерной.

**Методы**

Сайт выполнен по макету в Figma. https://www.figma.com/file/zFGN2O5xktHl9VmoOieq5E/React-_-%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BD%D1%8B%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B8_external_link?node-id=0%3A1.

Реализован модульный подход: директории компонентов включают соответствующие файлы _.js и _-styles.module.css.

Организована файловая структура: src/components/, src/fonts/, src/images/, src/utils/

Методом GET в fetch запрошены данные с https://norma.nomoreparties.space/api/ingredients, необходимые для отображения ингредиентов и настройки функционала.

## New!

Проект реализован в среде React:

- По клику на ингридиент открывается модальное окно с описанием ингридиента.
- По клику на кнопку "Оформить заказ" открывается модальное окно с захардкоженным номером заказа.
- К функциональным элементам применена анимация.

**Инструменты**

Использован вновь созданный проект React, установленный через CRA.

Использованы компоненты npm-пакета https://www.npmjs.com/package/@ya.praktikum/react-developer-burger-ui-components.

Ссылка на "React-burger" в GitHub Pages: https://vasaykh2.github.io/react-burger/.

# Проект: "React-burger"

### Обзор

- Интро
- Методы
- Инструменты

**Интро**

Это студенческий проект Yandex-Практикума курса web-разработки+ "Космическая Бургерная". На 7-м спринте создана главная страница бургерной. На 8-м - добавлена функциональность, контекст перенесён в Redux, реализован DnD. На 9-м - подключены роутинк и WebSocket. На 10-м - все компоненты и утилитарные функции переведены на TypeScript.

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

## New! New!

Функциональные компоненты React используют общий Context:

- Использовано множество хуков, для оптимизации функционала.
- Применен метод scrollIntoView при нажатии на табы.
- Применен louder Oval для информирования о загрузке модального окна деталей заказа.
- Пропсы компонентов типизированы.

## New! New! New!

Context заменен на Redux, реализован роутинг и WebSocket:

- Настроен деплой, файловая структура разделена на components, pages, services (actions, reducers, hooks, middlewares), utils с .js и .jsx файлами.
- В store.js создан глобальный стэйт проекта.
- Разработаны новые страницы и компоненты для реализации структуры маршрутов.
- За счёт WebSocket обновляются списки заказов общие и пользователя в реальном времени.

## New! New! New! New!

Файлы Javascript заменены на файлы с расширениями tsx, ts:

- Типизацированы все блоки кода (компоненты и утилиты).
- Типизировано хранилище Redux.
- Проведен дебагинг.

**Инструменты**

Использован вновь созданный проект React, установленный через CRA.

Использованы компоненты npm-пакета https://www.npmjs.com/package/@ya.praktikum/react-developer-burger-ui-components.

Использованы ресурсы библиотеки https://lodash.com/.

Подключены с npm: redux, react-redux, redux-devtools-extension, react-dnd, react-dnd-html5-backend, nanoid, react-router-dom, typescript, @types/node, @types/react, @types/react-dom, @types/jest, react-intersection-observer...

Ссылка на "React-burger" в GitHub Pages: https://vasaykh2.github.io/react-burger/.
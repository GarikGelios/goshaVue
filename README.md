# goshaVue

[Уроки Vue.js для начинающих](https://www.youtube.com/playlist?list=PL0lO_mIqDDFVVNsIt02JBIdBkjNVHIoum)

## Lesson 1

Передать на html страницу текст в место переменной ``{{ title }}`` которая находится в элементе с ``id="app"``

```js
new Vue ({
    el: '#app',
    data: {
        title: 'Hello world'
    }
});
```

## Lesson 2

Вызвать Vue.js приставкой к аттрибуту ``v-on:`` или с помощью символа ``@``

- ``v-on:click="title='Текст'"`` кликнуть и подставить в переменную title текст "Текст"
- ``@click="title='Другой текст'"`` кликнуть и подставить текст
- ``@mouseover="title='Ты навел курсор'"`` навести курсор и подставить текст
- ``@mouseover="changeText"`` вызвать функцию changeText() описаную в файле main.js после объекта data

```js
methods: {
    changeText: function () {
        this.title = 'Какой-то новый текст'
    }
}
```

- ``v-on:input="styleCSS = $event.target.value"`` подставить текст из инпута в указаную переменную
- ``v-bind:class="styleCSS"`` использовать переменную в качестве класса

## Lesson 3

- обрабатывать можно заранее созданные свойтсва
- обрабатанное значение можно выводить из исходного свойства
- свойства можно обрабатывать и выводить результат в отдельном объекте

```js
computed: {
        doubleValue () {
           return this.value * 2
        }
    }
```

## Lesson 4

- ``v-if="show"`` условие существования элемента в DOM в зависимости от булевого значения переменной
- ``v-else`` срабатывает для следующего элемента, если предыдущий false
- ``{{ cars[2].model }}`` вывод конкретного элемента в массиве
- ``<li v-for="car in cars">{{ car.model }}, скорость {{ car.speed }}</li>`` цикл вывода из массива
- ``v-for="(car, i) in cars"`` создать переменную для id элемента в массиве 

## Lesson 5

- ``{{  message | lowercase }}`` передать переменную обработанную фильтром
- функция описанная как фильтр принимает аргумент и возвращает обработанный

```js
filters: {
        lowercase (value) {
            return value.toLowerCase();
        }
    }
```

- встроенных фильтров нет, но можно создавать глобальные вне экземляров

```js
Vue.filter ('capitalize', function (value) {
    if (!value) return '';
    value = value.toString();
    return value.replace(/\b\w/g, function(l) {  return l.toUpperCase })
})
```

- ``{{  message | lowercase | capitalize }}`` добавление нескольких фильтров

## Lesson 6

- для частоиспольщуемых элементов страницы создавай компоненты глобавльные и локальные
- template компонента должен быть описан в одну строку

## Lesson 7

- ``npm install -g @vue/cli`` установить Vue CLI
- ``vue create my-project`` создать спроект
- по старому было ``npm init webpack-simple my-project``, можно и сейчас но тогда нужно установить ``npm install -g @vue/cli-init`` для старого генератора Vue
- в папке src создаются комаоненты с расширением *.vue*
- html-код в компоненте оборачивается в тег ``<template>`` ← должен содержать только один родительский элемент
- в файл main.js импортируются компоненты ``import App from './App.vue'`` и подключаются вместо указанного элемента в экземпляре

```js
new Vue({
  el: '#app',
  render: h => h(App)
})
```

## Lesson 8

- для использования компонентов и их элементов в других  компонентах их необходимо экспортировать

```js
export default {
    data () {
        return {
            mess: ''
        }
    }
};
```

- для глобального использования экспортируемые компоненты необходимо объявить в главном js файле ``import Example from './Example.vue'`` и создать тэг с переменной ``Vue.component ('app-example', Example);``
- для локального использования компенент необходимо экспортировать в место его использования и там описать его тэг

```js
import Input from './Field.vue';

export default {
    components: {
        'app-input': Input
    }
};
```

## Lesson 9

- передача переменных из родительского шаблона через собственный аттрибут ``:msg="message"``
- принять переменную в дочернем шаблоне указать в массиве ``props: ['msg']`` и теперь её можно использовать

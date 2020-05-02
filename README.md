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

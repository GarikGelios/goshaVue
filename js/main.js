new Vue ({
    el: '#app',
    data: {
        title: 'Hello world',
        styleCSS: ''
    },
    methods: {
        changeText: function () {
            this.title = 'Какой-то новый текст'
        }
    }
});



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

new Vue ({
    el: '#app2',
    data: {
        value: 1,
        // doubleValue: 1
    },
    methods: {
        increment (valueFromTarget) {
            this.value = valueFromTarget;
            // this.doubleValue = valueFromTarget * 2; // а можем сразу умножать this.value
            if (valueFromTarget == 25 ) {
                alert('Число 25');
            }
        }
    },
    computed: {
        doubleValue () {
           return this.value * 2
        }
    }
});

new Vue ({
    el: '#app3',
    data: {
        show: true,
        cars: [
            {model:"BMW", speed: 150},
            {model:"Ford", speed:180},
            {model:"Mercedes", speed:200},
            {model:"Audi", speed:220},
        ]
    },
    methods: {

    }
})

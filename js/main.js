Vue.filter ('capitalize', function (value) {
    if (!value) return '';
    value = value.toString();
    return value.replace(/\b\w/g, function(l) {  return l.toUpperCase() })
})

Vue.component ('app-car', {
    data: function () {
        return {
            cars: [
                {model: 'BMW'},
                {model: 'Volvo'},
                {model: 'Mercedes-Benz'},
                {model: 'Ford'},
                {model: 'Audi'},
                {model: 'Siat'},
                {model: 'Fiat'}
            ]
        }
    },
    template: '<div> <div class="car" v-for="car in cars"><p>{{ car.model }}</p></div> </div>'
})

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
        message: 'Hello my world! I`am happy to see you!',
        cars: [
            {model:"BMW", speed: 150},
            {model:"Ford", speed:180},
            {model:"Mercedes", speed:200},
            {model:"Audi", speed:220},
        ]
    },
    methods: {

    },
    computed: {
        showMess () {
            return this.message.toUpperCase ();
        }
    },
    filters: {
        lowercase (value) {
            return value.toLowerCase();
        }
    }
})

new Vue ({
    el: '#app6',
    data: {
        cars: [
            {model: 'BMW'},
            {model: 'Volvo'},
            {model: 'Mercedes-Benz'},
            {model: 'Ford'},
            {model: 'Audi'},
            {model: 'Siat'},
            {model: 'Fiat'}
        ]
    }
})



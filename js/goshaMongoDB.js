// ДОБАВЛЯЕМ ОБЪЕКТЫ В КОЛЛЕКЦИЮ
db.users.insertOne({
    "name": "Georg",
    "email": "admin@test.ru",
    "age": 44,
    "hasCar": false,
    "birthday": new Date('1997-11-27')
})

db.users.insertMany([
    {
        "name": "Миша",
        "email": "misha@yandex.ru",
        "age": 44,
        "hasCar": true,
        "birthday": new Date('1986-07-04')
    },
    {
        "name": "Вася",
        "email": "vasa@yandex.ru",
        "age": 43,
        "hasCar": false,
        "birthday": new Date('1987-06-25')
    }
])


// ИЩЕМ ОБЪЕКТЫ В КОЛЛЕКЦИИ

db.users.find({ $or: [{ age: 22 }, { "email": "vasa@yandex.ru" }] }, { _id: 0 }).limit(1).sort({ age: -1 })
// $or: поиск с условием "или" из настроек в массиве
// {_id:0} второй аргумент исключающий вывод данных, т.е. не хочу id чтобы было видно
// .limit(1) ограничение на количество вывода
// .sort({age: -1}) сортировка по свойству в отрицательном порядке
db.users.find({ age: { $lt: 25 } }, { _id: 0 })
// age:{$lt:25} age:{$gt:25}ограничение максимального и минимального значения в свойстве
db.users.find({ name: { $in: ["Georg", "Sam", "Миша"] } }, { _id: 0 })
// $in ограничение на вывод соответсвующий условию из настроек в массиве
db.users.find({ child: { $exists: true } }, { _id: 0 });
// {$exists: true} содержит любое значение с таким свойством
db.users.find({ favColors: { $size: 1 } }, { _id: 0 });
// {$size: 1} свойствосодержит указанное количество элементов в массиве


// ОБНОВНЯЕМ СВОЙСТВА ОБЕКТОВ

db.users.updateOne({ age: 22 }, { $set: { age: 25 } })
// нашёл один первый объект по одному свойству и указал какое свойтсво и значение установить, по сути тут поменял значение
db.users.updateMany({ age: 25 }, { $set: { age: 30 } })
// то же самое но у нескольких объектов

db.users.updateMany({ age: 30 }, { $set: { name: 'User', email: 'teat30@mail.ru' } })
// нашёл одни данные и поменял там другие

db.users.replaceOne(
    { age: 30 },
    { name: 'New user', hasCar: 2, password: '1234', hasWife: true }
)
// нашли и полностью обновили объект

// УДАЛЯЕМ ОБЪЕКТ

db.users.deleteMany({ age: { $gte: 30 }, age: { $lt: 40 } });


// МАССОВОЕ ИСПОЛЬЗОВАНИЕ КОМАНД

db.users.bulkWrite([
    {
        insertOne: {
            "document": {
                "name": "Pedro",
                "email": "pedro@yahoo.com",
                "age": 44,
            }
        }
    },
    {
        insertOne: {
            "document": {
                "name": "Jack",
                "email": "ja@gmail.com",
                "age": 64,
            }
        }
    },
    {
        insertOne: {
            "document": {
                "name": "Leonardo",
                "email": "leo@turtles.com",
                "age": 21,
                "hasCar": false,
                "birthday": new Date('1990-08-24')
            }
        }
    },
    {
        insertOne: {
            "document": {
                "name": "Michelangelo",
                "email": "mike@turtles.com",
                "age": 22,
                "hasCar": false,
                "birthday": new Date('1989-02-10')
            }
        }
    },
    {
        insertOne: {
            "document": {
                "name": "Donatello",
                "email": "don@turtles.com",
                "age": 23,
                "hasCar": false,
                "birthday": new Date('1988-11-12')
            }
        }
    },
    {
        insertOne: {
            "document": {
                "name": "Raphael",
                "email": "raph@turtles.com",
                "age": 24,
                "hasCar": true,
                "birthday": new Date('1987-05-14')
            }
        }
    }
])

db.users.bulkWrite([
    {
        deleteOne: {
            filter: { age: 44 }
        }
    },
    {
        updateOne: {
            filter: { name: "Jack" },
            update: { $set: { email: "splinter@turtles.com" }, $set: { age: 64 } }
        }
    },
    {
        replaceOne: {
            filter: { name: "Jack" },
            replacement: { name: 'Splinter', hasCar: true, age: 64 }
        }
    }
])


// ПОИСК ПО ТЕКСТУ
db.articles.insertMany([
    {
        "title": "Разыгрываем iPhone 11 Pro",
        "description": "Для участия нужно с 25 апреля по 30 июня оформить заказ через корзину Onliner и оплатить его в онлайне картой Visa через сервис Onliner Pay.",
        "athor": "Вася Васильев",
        "date": new Date("2020-04-10")
    },
    {
        "title": "IT-компания выплатит сотрудникам $1000",
        "description": "Программа будет действовать во всех офисах Admitad, включая минский.",
        "athor": "Пётр Петрищев",
        "date": new Date("2019-04-25")
    },
    {
        "title": "Маск и принудительная изоляция",
        "description": "Если кто-то хочет остаться дома — отлично. Им должны это разрешить и не принуждать к выходу.",
        "athor": "Илон Маск",
        "date": new Date("2018-05-08")
    },
    {
        "title": "Основной челлендж",
        "description": "Мой распорядок дня сейчас стал четче, удаленная коммуникация помогла более внимательно относиться к своему времени.",
        "athor": "Родион Троицкий",
        "date": new Date("2017-05-17")
    },
])

db.articles.createIndex({ title: "text", description: "text", athor: "text" });
db.articles.find({ $text: { $search: "Visa" } });
db.articles.find({ $text: { $search: "Разыгрываем $1000" } });
db.articles.find(
    { $text: { $search: "Разыгрываем дома челлендж" } },
    { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } });


// получить массив всех значений без повторений
db.users.distinct("email");

db.сonfectionery.insertMany([
    {
        "category": "Birthday cake",
        "title": "Chocolate boom",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "image": "/cake.jpeg",
        "weight": 10,
        "price": 20.5,
        "published": true,
        "create": new Date("2020-08-14"),
        "update": new Date("2020-08-14")
    },
    {
        "category": "Birthday cake",
        "title": "Creamy chic",
        "description": "Duis ultrices quam a ipsum malesuada, vitae gravida tortor interdum.",
        "image": "/cake2.jpeg",
        "weight": 7,
        "price": 15.6,
        "published": true,
        "create": new Date("2020-08-15"),
        "update": new Date("2020-08-18")
    },
    {
        "category": "Birthday cake",
        "title": "Honey Wow",
        "description": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae",
        "image": "/cake3.jpeg",
        "weight": 8,
        "price": 18.4,
        "published": true,
        "create": new Date("2020-08-19"),
        "update": new Date("2020-08-20")
    },
    {
        "category": "Strudel",
        "title": "Apple that",
        "description": "Integer lacus leo, semper porta porttitor et, sollicitudin vel urna.",
        "image": "/cake4.jpeg",
        "weight": 5,
        "price": 8.3,
        "published": true,
        "create": new Date("2020-08-22"),
        "update": new Date("2020-08-25")
    },
    {
        "category": "Strudel",
        "title": "Pear of what",
        "description": "Nam sed nisl cursus, vehicula magna sit amet, tempor nunc.",
        "image": "/cake5.jpeg",
        "weight": 6,
        "price": 10.1,
        "published": true,
        "create": new Date("2020-08-23"),
        "update": new Date("2020-08-25")
    },
    {
        "category": "Petits fours",
        "title": "Berry bears",
        "description": "Praesent fringilla dui eget eros luctus maximus.",
        "image": "/cake6.jpeg",
        "weight": 15,
        "price": 26.7,
        "published": true,
        "create": new Date("2020-09-05"),
        "update": new Date("2020-09-05")
    },
    {
        "category": "Petits fours",
        "title": "Liquorice butterflies",
        "description": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
        "image": "/cake7.jpeg",
        "weight": 14,
        "price": 30,
        "published": true,
        "create": new Date("2020-09-10"),
        "update": new Date("2020-09-11")
    },
    {
        "category": "Petits fours",
        "title": "Coconut Fur Seals",
        "description": "Maecenas et neque sed leo hendrerit interdum ac non ipsum.",
        "image": "/cake8.jpeg",
        "weight": 13,
        "price": 35,
        "published": true,
        "create": new Date("2020-09-15"),
        "update": new Date("2020-09-16")
    },
    {
        "category": "Petits fours",
        "title": "Sand puppies",
        "description": "Ut consequat ligula laoreet aliquet aliquam.",
        "image": "/cake9.jpeg",
        "weight": 12,
        "price": 38,
        "published": true,
        "create": new Date("2020-09-22"),
        "update": new Date("2020-09-23")
    },
    {
        "category": "Petits fours",
        "title": "Caramel bees",
        "description": "Maecenas pellentesque feugiat neque, sed auctor magna varius sed.",
        "image": "/cake10.jpeg",
        "weight": 11,
        "price": 45,
        "published": true,
        "create": new Date("2020-09-25"),
        "update": new Date("2020-09-28")
    },
])

db.сonfectionery.distinct("category");
db.сonfectionery.update({ title: "Apple that" }, { $set: { stock: 30 } });

db.сonfectionery.bulkWrite([
    {
        updateOne: {
            filter: { title: "Chocolate boom" },
            update: { $set: { stock: 10 } }
        }
    },
    {
        updateOne: {
            filter: { title: "Creamy chic" },
            update: { $set: { stock: 8 } }
        }
    },
    {
        updateOne: {
            filter: { title: "Honey Wow" },
            update: { $set: { stock: 5 } }
        }
    },
])

// сгруппировать и посчитать сумму полей 
db.сonfectionery.aggregate([
    { $match: {} },
    { $group: { _id: "$category", stok: { $sum: "$stock" } } }
])

// сгруппировать и посчитать количество в группе
db.сonfectionery.aggregate([
    { $match: {} },
    { $group: { _id: "$category", "product range": { $sum: 1 } } }
])



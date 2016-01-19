var faker = require("faker");

    for (var i = 0; i < 10; i++) {
        console.log(faker.Name.findName() + " - $" + faker.random.number());
    }

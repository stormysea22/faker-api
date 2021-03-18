const express = require('express'),
    app = express(),
    faker = require('faker'),
    cors = require('cors'),
    port = 8000,
    server = app.listen(port,() => console.log(`Listening on port ${port}`));

app.use(cors());

app.use(express.json());

class User {
    constructor() {
        this._id = faker.random.number();
        this.firstName = faker.name.firstName();
        this.lastName = faker.name.lastName();
        this.phoneNumber = faker.phone.phoneNumber();
        this.email = faker.internet.email();
        this.password = faker.internet.email();
    }
}

const newUser = new User();
console.log(newUser);

class Address {
    constructor() {
        this.street = faker.address.streetAddress();
        this.city = faker.address.city();
        this.state = faker.address.state();
        this.zipCode = faker.address.zipCode();
        this.country = faker.address.country();
    }
}

const newAddress = new Address();
console.log(newAddress);

class Company {
    constructor() {
        this._id = faker.random.number();
        this.name = faker.company.companyName();
        this.address = newAddress;
    }
}

const newCompany = new Company();
console.log(newCompany);

app.get('/',(req,res) => {
    res.json({"message":"Ok"});
})

app.get('/api/:users/:new', (req, res) => {
    if (req.params.users === "users") {
        res.send(`Users First Name: ${newUser.firstName}; user Last Name: ${newUser.lastName}`);
    }
    if (req.params.users === "companies") {
        res.send(`Company Name: ${newCompany.name}`);
    }
    if (req.params.users === "user" && req.params.new === "company") {
        res.send(`User First Name: ${newUser.firstName}; User Last Name: ${newUser.lastName}; Company Name: ${newCompany.name}`);
    }
})
const mongoose = require('mongoose');

// Import model
const Customer = require('./models/customer');

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

//connect to db
const db = mongoose.connect('mongodb://localhost:27017/customercli', {
    useNewUrlParser: true
});

// Add Customer
const addCustomer = (customer) => {
    Customer.create(customer).then(customer => {
        console.info('New Customer Added');
        db.close();
    })
}

// Find Customer
const findCustomer = (name) => {
    // Make case insensitive
    const search = new RegExp(name, 'i');
    Customer.find({ $or: [{ firstname: search }, { lastname: search }] })
        .then(customer => {
            console.info(JSON.stringify(customer, null, 2));
            console.info(`${customer.length} matches`);
            db.close();
        })
}

// Update Customer
const updateCustomer = (_id, customer) => {
    Customer.update({ _id }, customer)
        .then(customer => {
            console.info('Customer Updated');
            db.close();
        })
}

// Remove Customer
const removeCustomer = (_id) => {
    Customer.remove({ _id })
        .then(customer => {
            console.info('Customer Removed');
            db.close();
        })
}

// List All Customers
const listCustomer = () => {
    Customer.find()
        .then(customers => {
            console.info(JSON.stringify(customers, null, 2));
            console.info(customers.length + ' customers');
            db.close();
        })
}

// Export methods 
module.exports = {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomer
}
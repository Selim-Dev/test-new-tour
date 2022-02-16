/* eslint-disable prettier/prettier */
const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel');
// const tours = require('./tours-simple.json');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

async function main() {
    await mongoose.connect(
        DB, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        },
        (err) => {
            if (err) process.exit(1);
            console.log('db connected successfully');
        }
    );
}
main().catch((err) => console.log(err));

// Read Json File;
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

//import data nito mongo db
const importData = async() => {
    try {
        await Tour.create(tours);
        console.log('Data Loaded Successfully');
        process.exit();
    } catch (err) {
        console.log(err);
    }
};

// delete all data from collection
const deleteData = async() => {
    try {
        await Tour.deleteMany();
        console.log('Data Deleted Successfully');
        process.exit();
    } catch (err) {
        console.log(err);
    }
};

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}
console.log(process.argv);
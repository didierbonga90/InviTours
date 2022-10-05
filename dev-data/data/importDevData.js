const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const Tour = require('../../models/tourSchema');


mongoose.connect('mongodb+srv://admin:admin@cluster0-w2svx.mongodb.net/CRUD1?retryWrites=true', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('DB from file is connected!!');
});

// Read Json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

// Import Data from file to DB
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Successfully loaded!!');
        process.exit();
    } catch (err) {
        console.log(err)
    }
}

// Delete Data from DB
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Successfully deleted!')
        process.exit();

    } catch (err) {
        console.log(err)
    }
}

console.log(process.argv);

if (process.argv[2] === '--import') importData();
if (process.argv[2] === '--delete') deleteData();

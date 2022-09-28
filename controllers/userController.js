var fs = require('fs');
const users = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/users.json`));

exports.getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'user not define yet'
    })
}

exports.getOneUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'user id not define yet'
    })
}

exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'user create not define yet'
    })
}

exports.updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'user not define yet'
    })
}

exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'user not define yet'
    })
}




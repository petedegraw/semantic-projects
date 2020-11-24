const fs = require('fs');
var colors = require('colors');

exports.copy = (src, dir, dest) => {
    fs.stat(dir, function(err, stat) {
        if (err == null) {
            // console.log(`${dir} folder exists`);
        } else if (err.code === 'ENOENT') {
            // does not exist
            fs.copyFile(src, dest, (err) => {
                if (err) throw err;
                console.log(`${dest} file created`);
            });
        } else {
            console.log('Some other error: ', err.code);
        }
    });
};

exports.write = (dest, data) => {
    fs.stat(dest, function(err, stat) {
        if (err == null) {
            console.log(`${dest} already exists`.bold.red);
        } else if (err.code === 'ENOENT') {
            // does not exist
            fs.writeFile(dest, data, (err) => {
                if (err) console.log(err);
                console.log(`${dest} file created`);
            });
        } else {
            console.log('Some other error: ', err.code);
        }
    });
};
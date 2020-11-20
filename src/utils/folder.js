const fs = require('fs');

exports.make = (dir) => {
    fs.stat(dir, function(err, stat) {
        if (err == null) {
            // console.log(`${dir} folder exists`);
        } else if (err.code === 'ENOENT') {
            // does not exist
            fs.mkdir(dir, { recursive: true }, (err) => {
                if (err) throw err;
                console.log(`${dir} folder created`);
            });
        } else {
            console.log('Some other error: ', err.code);
        }
    });
}
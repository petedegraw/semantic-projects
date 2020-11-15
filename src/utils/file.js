const fs = require('fs');

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
}
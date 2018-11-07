let fs = require('fs');
console.log('Creating symlinks ...');
if (fs.existsSync('node_modules/@UserModules')) {
    console.log('link exists already ')
} else {
    let source = '../@UserModules';
    console.log(`creating link for ${source}`);
    fs.symlinkSync(source, 'node_modules/@UserModules', 'junction');
    console.log('done')
}
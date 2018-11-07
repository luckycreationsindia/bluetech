let fs = require('fs');
console.log('Creating symlinks ...');

if (fs.existsSync('./node_modules/bluetechcategorymanagement')) {
    console.log('category link exists already ')
} else {
    let source = '../@ProductsModule/CategoryManagement';
    console.log(`creating link for ${source}`);
    fs.symlinkSync(source, 'node_modules/bluetechcategorymanagement', 'junction');
    console.log('done')
}

if (fs.existsSync('./node_modules/bluetechproductmanagement')) {
    console.log('product link exists already ')
} else {
    let source = '../@ProductsModule/ProductManagement';
    console.log(`creating link for ${source}`);
    fs.symlinkSync(source, 'node_modules/bluetechproductmanagement', 'junction');
    console.log('done')
}

if (fs.existsSync('./node_modules/bluetechusermanagement')) {
    console.log('user link exists already ')
} else {
    let source = '../@UsersModule/UserManagement';
    console.log(`creating link for ${source}`);
    fs.symlinkSync(source, 'node_modules/bluetechusermanagement', 'junction');
    console.log('done')
}
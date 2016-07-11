import fs from 'fs';

function scanDir(resolver, compDef, wire) {
    wire(compDef.options).then(({
        directory
    }) => {
        fs.readdir(directory, (err, files) => {
            if(err) {
                resolver.reject(err);
            } else {
                resolver.resolve(files);
            }
        });
    })
}

export default function ScanDirPlugin(options) {
    return {
        factories: {
            scanDir
        }
    }
}
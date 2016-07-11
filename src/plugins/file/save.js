import _ from 'underscore';
import fs from 'fs';

function save(resolver, filePath, fileData) {
    fs.writeFile(filePath, fileData, (error) => {
        if (error) {
            resolver.resolve({
                html: JSON.stringify({
                    success: 0, 
                    error
                })
            });
        } else {
            resolver.resolve({
                html: JSON.stringify({success: 1})
            });
        }
    });
}

function saveFile(resolver, compDef, wire) {
    wire(compDef.options).then(({
        directory,
        path,
        data,
        validate
    }) => {
        // add trailing slash if nessesary
        if(path && path.slice(1) !== '/') {
            path = `/${path}`;
        }
        let filePath = directory + path;

        if(validate) {
            if(!_.isFunction(validate)) {
                resolver.reject('[SaveFilePlugin]: Validate option should be a function!');
            }

            let errors = validate().errors;
            if(!errors) {
                save(resolver, filePath, data);
            } else {
                resolver.resolve({
                    html: JSON.stringify({
                        success: 0, 
                        error: errors
                    })
                });
            }
        }
    })
}

export default function SaveFilePlugin(options) {
    return {
        factories: {
            saveFile
        }
    }
}
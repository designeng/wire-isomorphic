import _ from "underscore";
const COMPILATION_MODE = process.env.COMPILATION_MODE;

function cleanInsertFactory(spec){
    let _spec = _.clone(spec);
    if(_spec.component){
        if(_spec.component.insert){
            delete _spec.component.insert;
        }
        if(_spec.component.bindEvents){
            delete _spec.component.bindEvents;
        }
    }
    return _spec;
}

export default function environment(...extraElements) {
    return (spec) => {
        if(COMPILATION_MODE == 'server'){
            let _spec = _.clone(spec);
            extraElements.forEach(element => {
                if(_spec.hasOwnProperty(element)){
                    delete _spec[element];
                }
            });

            _spec = cleanInsertFactory(_spec);
            return _spec;
        } else {
            return spec;
        }
    }
}
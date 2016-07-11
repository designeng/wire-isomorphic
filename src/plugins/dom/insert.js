import $ from 'jquery';
import adler32 from 'adler-32';
import { DATA_CHECKSUM } from '../constants';

function insertInFacet(resolver, facet, wire) {
    const target = facet.target;
    wire(facet.options).then(({
        inTo
    }) => {
        let checksum = adler32.str(target.replace(/^<div[^>]*>|<\/div>$/g, ''));
        let targetElement = $(target);

        if(parseInt(targetElement.attr(DATA_CHECKSUM)) !== checksum){
            targetElement.appendTo(inTo);
        }
        resolver.resolve(target);
    })
}

export default function insertInPlugin(options) {
    return {
        facets: {
            insert: {
                ready: insertInFacet
            }
        }
    }
}
import createContext from '../createContext';
import carcassSpec from '../../tasks/carcass/spec';
import notFoundSpec from '../../tasks/404/page.spec';

import Timer from '../timer';

import _ from 'underscore';

export default function showNotFoundPage(request, response, next) {

    let specs = [
        {
            requestUrl: request.url,
            hostname: request.hostname,
        },  
        carcassSpec, 
        notFoundSpec
    ];

    createContext(specs).then(
        (context) => {
            const warningMessage = `NOT FOUND: ${request.url}; AT: ${new Timer().getFormattedTime()}`;
            response.status(404).end(context.body.html);
            context.destroy();
        },
        (error) => {
            const errorMessage = `NOT FOUND ERROR HANDLER REPORT: URL: ${request.url}, ERROR: ${JSON.stringify(error)}, AT: ${new Timer().getFormattedTime()}`;
            response.status(500).end(errorMessage);
        }
    );
} 
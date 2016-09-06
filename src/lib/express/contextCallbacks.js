import _ from 'underscore';
import showNotFoundPage from './showNotFoundPage';
import Timer from '../timer';

export function success(request, response) {
    return (context) => {
        let headers = {}
        if(context.headers) {
            _.extend(headers, context.headers);
        }

        let result = context.response ? context.response : context.carcass;

        response.writeHead(200, headers);
        response.end(result);
        context.destroy();
    }
}

export function error(request, response) {
    return (error) => {
        if(error.status == 404) {
            showNotFoundPage(request, response);
        } else {
            let headers = JSON.stringify(request.headers);

            let errorMessage = `DEFAULT CONTEXT ERROR HANDLER REPORT. ` 
                + `URL: '${request.url}'; ERROR: ${error}; STATUS: ${error.status}; `
                + `AT: ${new Timer().getFormattedTime()}; `
                + `HEADERS: ${headers};`;

            console.log('ERROR:::', JSON.stringify(error));

            response.status(500).end(errorMessage);
        }
    }
}
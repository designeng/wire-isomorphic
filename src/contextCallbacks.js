import _ from 'underscore';
import showNotFoundPage from './utils/express/showNotFoundPage';
import Timer from './utils/timer';

export function success(request, response) {
    return (context) => {
        let html;
        
        let headers = {'Referer': `https://www.drive.ru${request.url}`}
        if(context.headers) {
            _.extend(headers, context.headers);
        }

        html = context.carcass;

        response.writeHead(200, headers);
        response.end(html);
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

            response.status(500).end(errorMessage);
        }
    }
}
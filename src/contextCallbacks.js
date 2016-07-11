import _ from 'underscore';
import showNotFoundPage from './utils/express/showNotFoundPage';
import Timer from './utils/timer';

import { replaceWidgetPlaceholder } from './utils/widgets/replacement';

// TODO. The post route returns json - not html.
// fix variable name in all tasks specs: body{ html } -> body{ content }, e.g.

export function success(request, response) {
    return (context) => {
        let html;
        // console.log("url, specName:::", context.routeUrl, context.specName);
        
        let headers = {'Referer': `https://www.drive.ru${request.url}`}
        if(context.headers) {
            _.extend(headers, context.headers);
        }

        if(context.query.dev === 'widgets') {
            _.extend(headers, {'content-type': 'text/html; charset=utf-8'});
            html = _.reduce(context.widgetsHash, (result, value, key) => {
                result.push(value);
                return result;
            }, []).join('');
        } else if(context.widgetsHash) {
            html = replaceWidgetPlaceholder(context.body.html, context);
        } else {
            html = context.body.html;
        }

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
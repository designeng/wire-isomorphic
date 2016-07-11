import $ from 'jquery';
import wire from 'essential-wire';
import pipeline from 'when/pipeline';

import routeSpec from '../../tasks/main/page.spec.js';

const run = (pageSpec) => {
    var routeTask = function(context) {
        return context? context.wire(pageSpec) : wire(pageSpec)
    }

    let tasks = [routeTask];

    pipeline(tasks).then(
        (context) => {
            console.log("CONTEXT::::::", context);
            $('body').html(context.body);
        },
        (error) => {
            console.error("ERROR:::::", error);
        }
    );
}

run(routeSpec);

if (module.hot) {
    module.hot.accept('../../tasks/main/page.spec.js', () => {
        var _routeSpec = require('../../tasks/main/page.spec.js');
        run(_routeSpec.default);
    })
}
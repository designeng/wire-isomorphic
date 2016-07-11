import Timer from '../../utils/timer';
import chalk from 'chalk';

export default function PerformancePlugin(options) {
    let timer;

    return {
        context: {
            initialize: function(resolver, wire) {
                timer = new Timer();
                resolver.resolve();
            },
            startup:    function(resolver, wire) {},
            ready:      function(resolver, wire) {
                console.log(chalk.blue("Wiring time:.... " + timer.end()));
                resolver.resolve();
            },

            shutdown:   function(resolver, wire) {},
            destroy:    function(resolver, wire) {},

            error: function(resolver, wire) {},
        }
    }
}
import wire from 'essential-wire';
import pipeline from 'when/pipeline';

import expressSpec from './app.express.spec';
import { createTasks, createTask } from './lib/tasks';
import Timer from './lib/timer';

pipeline(createTasks([expressSpec])).then(context => {
    
}).otherwise(error => {
    const errorMessage = `Express.js is not started! ${JSON.stringify(error)} (${new Timer().getFormattedTime()})`;
    console.error(errorMessage);
});
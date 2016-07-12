import wire from 'essential-wire';
import pipeline from 'when/pipeline';

import expressSpec from './app.express.spec';
import { createTasks, createTask } from './utils/tasks';
import Timer from './utils/timer';

pipeline(createTasks([expressSpec])).then(context => {
}).otherwise(error => {
    const errorMessage = `Express.js is not started! ${JSON.stringify(error)} (${new Timer().getFormattedTime()})`;
    console.error(errorMessage);
});
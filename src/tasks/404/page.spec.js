import controller from './controller';

export default {
    specName: '404',

    body: {
        create: {
            module: controller,
            args: [
                {$ref: 'carcass'},
            ]
        }
    }
}
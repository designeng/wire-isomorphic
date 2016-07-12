import _ from 'underscore';

export default {
    $plugins: [
    ],

    brands: ['acura', 'bmw', 'ford'],

    response: {
        create: {
            module: (brands) => {
                return JSON.stringify(_.map(brands, (value) => {
                        return {
                            name: value.toUpperCase(),
                            id: value
                        }
                    }));
            },
            args: [
                {$ref: 'brands'},
            ]
        }
    }
}
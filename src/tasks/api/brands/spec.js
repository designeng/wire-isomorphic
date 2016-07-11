import _ from 'underscore';

export default {
    $plugins: [
    ],

    brands: ['acura', 'bmw', 'ford'],

    body: {
        create: {
            module: (brands) => {
                return {
                    response: _.map(brands, (value) => {
                        return {
                            name: value.toUpperCase(),
                            id: value
                        }
                    })
                }
            },
            args: [
                {$ref: 'brands'},
            ]
        }
    }
}
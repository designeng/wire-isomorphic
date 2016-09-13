

export default {
    $plugins: [
    ],

    response: {
        create: {
            module: () => {
                return JSON.stringify({token: 'some token'});
            },
            args: [
            ]
        }
    },

}
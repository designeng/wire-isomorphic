const permissions = [
    {
        roles: ['guest', 'member'],
        allows: [
            {resources: 'blogs', permissions: ['takeALook']},
            {resources: 'forums', permissions: ['get', 'put','delete', 'talkAbout']},
            {resources: 'news', permissions: ['make', 'inspect', 'accept']},
        ]
    },
    {
        roles: ['gold', 'silver'],
        allows:[
            {resources: 'cash', permissions: ['sell','exchange']},
            {resources: ['account','deposit'], permissions: ['put','delete']}
        ]
    }
];

export default permissions;
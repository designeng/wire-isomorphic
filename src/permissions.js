const permissions = [
    {
        roles: ['guest', 'member'],
        allows: [
            {resources: 'blogs', permissions: ['takeALook']},
            {resources: 'forums', permissions: ['get', 'put','delete', 'talkAbout']},
            {resources: 'news', permissions: ['make', 'inspect', 'accept']},
        ]
    },
];

export default permissions;
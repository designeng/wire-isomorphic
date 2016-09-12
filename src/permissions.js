const permissions = [
    {
        roles: ['guest', 'member'],
        allows: [
            {resources: 'blogs', permissions: ['takeALook']},
            {resources: 'forums', permissions: ['create', 'read', 'delete']},
            {resources: 'news', permissions: ['make', 'inspect', 'accept']},
        ]
    },
];

export default permissions;
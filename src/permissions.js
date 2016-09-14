const permissions = [
    {
        roles: ['guest', 'member'],
        allows: [
            {resources: 'blogs', permissions: ['takeALook']},
            {resources: 'forums', permissions: ['create', 'read', 'delete', 'update']},
            {resources: 'users', permissions: ['create', 'read', 'update']},
        ]
    },
];

export default permissions;
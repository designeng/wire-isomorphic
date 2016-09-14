const permissions = [
    {
        roles: ['guest'],
        allows: [
            {resources: 'forums', permissions: ['read']}
        ]
    },
    {
        roles: ['member'],
        allows: [
            {resources: 'forums', permissions: ['read', 'delete']},
            {resources: 'users', permissions: ['create', 'read', 'update']},
        ]
    },
];

export default permissions;
const routes = [
    // API
    {
        url: '/',
        type: 'CRUD'
    },
    {
        url: '/:_id',
        type: 'CRUD'
    },

    // PAGES
    {
        url: '/threads',
        tasks: ['forumThreadsSpec']
    }
];

export default routes;
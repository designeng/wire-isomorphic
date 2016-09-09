const routes = [
    // API
    {
        url: '/',
        type: 'CRUD'
    },
    {
        url: '/:id',
        type: 'CRUD'
    },

    // PAGES
    {
        url: '/threads',
        tasks: ['forumThreadsSpec']
    }
];

export default routes;
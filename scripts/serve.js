const fastify = require('fastify')({ logger: true });
const path = require('path');
const fs = require('fs');

const rootDir = path.join(__dirname, '..');

fastify.register(require('@fastify/cors'), {
    origin: '*',
    methods: ['GET', 'OPTIONS']
});

fastify.register(require('@fastify/static'), {
    root: path.join(rootDir, 'assets'),
    prefix: '/assets/',
    decorateReply: false
});

fastify.register(require('@fastify/static'), {
    root: path.join(rootDir, 'data'),
    prefix: '/data/',
    decorateReply: false
});


fastify.get('/', (request, reply) => {
    reply.type('application/json');
    return reply.send(fs.createReadStream(path.join(rootDir, 'badges.json')));
});


fastify.get('/badges.json', (request, reply) => {
    reply.type('application/json');
    return reply.send(fs.createReadStream(path.join(rootDir, 'badges.json')));
});

fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info(`Server listening on ${address}`);
});

const fastify = require('fastify')({ logger: true })
const { writeFileSync } = require('fs');
const path = require('path')

fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'public'),
})

fastify.get('/', function (req, reply) {
    reply.sendFile('index.html') // serving path.join(__dirname, 'public', 'myHtml.html') directly
})

fastify.post('/api/v2/annotations', function (req, reply) {
    let body = JSON.parse(req.body);

    console.log(body);

    writeFileSync(`../../labels/${body.fileName}`, body.annotations);

    reply.send("File Saved Successfully");
})

const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
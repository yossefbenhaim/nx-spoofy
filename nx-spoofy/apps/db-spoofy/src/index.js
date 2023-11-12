
const cors = require( 'cors')
const dotenv = require("dotenv")
const express = require( 'express')
const Filter = require( "postgraphile-plugin-connection-filter")

const { default: PgPubSub } = require('@graphile/pg-pubsub')
const { postgraphile, makePluginHook } = require( "postgraphile")

dotenv.config()

const app = express();

app.use(cors());

const subsPluginHook = makePluginHook([PgPubSub]);

const res = postgraphile(process.env.CONNECTION_STRING, process.env.SCHEMA, {
    pluginHook: subsPluginHook,
    appendPlugins: [Filter],
    graphileBuildOptions: {
		connectionFilterRelations: true,
    },
	watchPg:true,
	graphiql: true,
	enhanceGraphiql: true,
    subscriptions: true,
    simpleSubscriptions: true,
    websocketMiddlewares: [],
});
app.use(res);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port: ${process.env.PORT}`);
});

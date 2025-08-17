import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with additional fields for
"isDone" (boolean) and "createdAt" (timestamp). The authorization rule
below specifies that unauthenticated users can "read" records, but only
authenticated users can "create", "update", and "delete" records.
=========================================================================*/
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
      isDone: a.boolean(), // New field to track completion status
      createdAt: a.timestamp(), // New field to track creation time
    })
    .authorization((allow) => [
      allow.guest().read(), // Replaced 'operations' with specific methods
      allow.authenticated().create().update().delete().read(),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'identityPool',
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content} - {todo.isDone ? 'Done' : 'Pending'}</li>)}</ul>

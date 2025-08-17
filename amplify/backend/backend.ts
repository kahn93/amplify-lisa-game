import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource'; // Verify that './auth/resource.ts' exists or correct the path if necessary
import { data } from './data/resource'; // Ensure the file './data/resource.ts' exists or update the path

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
defineBackend({
  auth,
  data,
});

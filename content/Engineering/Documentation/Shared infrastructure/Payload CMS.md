---
title: "Payload CMS"
---

# Deploying changes
After making changes to the [GitHub - purduehackers/cms](https://github.com/purduehackers/cms) repository, run the following and commit the changes they produce.
1. **Generate TypeScript types**
	This should be done while you’re working. When you edit a collection schema, re-generate the types to get proper type checking.
	```shell
$ bun run generate:types
	```
2. **Generate database migrations**
	Only do this once you’re done making your schema changes. If you change any collections (or anything else that gets stored in the database), run this step. If you don’t change anything related to the database, you can skip this.
	```shell
$ PAYLOAD_SECRET=ignore bun run payload migrate:create
	```
<empty-block/>
# RBAC
We use role-based access control (RBAC) for granting access to collections/documents in Payload.
*Users* and *service accounts* can authenticate to Payload. Each is granted a set of *roles.* Generally, these roles are what determine which resources they can access within Payload.
## Defining new roles
To define a new role, add an object to `availableRoles` in `src/collections/auth-utils.ts`. You can then use the other helper functions in there to restrict access to collections/documents based on roles.
The `implies` field of a role definition takes a list of other role values and makes it so that if, e.g., role A sets `required: ["B"]`, then role A cannot be granted to a user unless B is also granted. So a user having role A implies they have all of the roles in their implied list.
This is used to create hierarchy, e.g. `admin` implies `editor` which implies `viewer`.
## API keys
Users and service accounts can both have API keys. Use user API keys for when you need to automate a one-time task, e.g. importing a bunch of data into the CMS. Use service accounts to create API keys for services, e.g. PH websites.
### Creating/managing keys
For authenticating services to Payload, create a new entry in the *Service Accounts* collection in the Payload UI. Check *Enable API key* to create an API key for the service account. Grant it whatever roles it needs.
Each service account can only have one API key, so for all intents and purposes, *service account* $`\equiv`$ *API key*.
To revoke a service account, check the *Revoked* checkbox.
### Authenticating with keys
Add the following header to your HTTP requests:
```plain text
Authorization: service-accounts API-Key <api-key-here>
```
## Defining resource permissions
To define who can access certain resources (collections/documents/fields), set the `access` field when defining the resource. For example, shelter projects have the following settings.
```typescript
  const ShelterProjects: CollectionConfig = {
	  // ...
	  access: {
	    read: accessTrySequential(
		    isViewer,
		    () => ({ visible: { equals: true } })
		  ),
	    readVersions: isViewer,
	    create: isEditor,
	    update: isEditor,
	    delete: isEditor,
	  },
	  // ...
	};
```
See [Access Control \| Documentation \| Payload](https://payloadcms.com/docs/access-control/overview) for details on what each field of `access` controls, as well as for what the function receives as arguments and must return.
For most use cases, there are helper functions in `src/collections/auth-utils.ts`. Some examples are:
- `anyone` — any one can access, including non-authenticated (public) clients
- `nobody` — nobody can access
- `loggedIn` — any logged-in user can access
- `hasAllRoles(role1, role2, ...)` — users can access if they have all the listed roles
- `hasAnyRoles(role1, role2, ...)` — users can access if they have any of the listed roles
- `isAdmin`, `isEditor`, `isViewer` — shortcuts for common roles
- `accessTrySequential(test1, test2, ...)` — combines several tests in sequential order. See the documentation for this function for details.
**Note:** `hasAllRoles`, `hasAnyRoles`, and `accessTrySequential` are functions which return the access callback. Thus they should be used like `create: hasAllRoles('viewer', 'editor')`.
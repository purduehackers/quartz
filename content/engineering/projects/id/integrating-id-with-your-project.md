---
title: "Integrating ID with Your Project"
---

ID is a versatile OAuth provider that you can use for any site where you want to allow Purdue Hackers members to sign in with their [passports](/282181f3b6ed80b1b0c6ff73b35bfa48?pvs=25). Get started using these simple steps:
::: callout {icon="ℹ️" color="gray_bg"}
	This guide assumes you are writing a JavaScript app and will use `better-auth`. If you aren’t, the steps are still pretty similar, but you will need to translate for your preferred OAuth library.
:::
# 1. Create Your Client
Head to the [ID dashboard](https://id.purduehackers.com/dash) and click **Create Client**. Give your app a name, then add a callback URL. Callback URLs usually look like the following:
- [`https://ORIGIN/api/auth/oauth2/callback/purduehackers-id`](https://sign.purduehackers.com/api/auth/oauth2/callback/purduehackers-id) 
- [`http://localhost:5173/api/auth/oauth2/callback/purduehackers-id`](http://localhost:5173/api/auth/oauth2/callback/purduehackers-id)
Your [`localhost`](http://localhost) port may be different, but these are what your URLs should look like if you follow this guide exactly. Note your localhost URL should use `http`, not `https`.
Chose the most-restrictive scopes you can for your project.
- `user:read`: Read attributes for a user, including their name and passport. Best if you’re just trying to get basic auth.
- `user`: You want to modify user data. You likely won’t need this, but it’s there in case you want it.
- `admin:read`: Read administrative information about passports, including all passports past, previous, and reserved. **This scope is unavailable unless you are an admin.**
- `admin`: Similar to `user` but for admin data. **This scope is unavailable unless you are an admin.**
# 2. Add `better-auth` to your project
Add [`better-auth`](https://better-auth.com/) to your project. Your auth config should look something like this:
```javascript
export const auth = betterAuth({
	baseURL: env.ORIGIN,
	secret: env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, { provider: 'sqlite' }),
	emailAndPassword: { enabled: true },
	user: {
		additionalFields: {
			role: {
				type: 'string',
				required: false
			}
		}
	},
	plugins: [
		genericOAuth({
			config: [
				{
					providerId: 'purduehackers-id',
					clientId: '<YOUR CLIENT ID HERE>',
					clientSecret: '0',
					authorizationUrl: 'https://id.purduehackers.com/api/authorize',
					tokenUrl: 'https://id.purduehackers.com/api/token',
					userInfoUrl: 'https://id.purduehackers.com/api/user',
					scopes: ['<ADD YOUR SCOPES AS A LIST HERE>'],
					authentication: 'post',
					getUserInfo: async (tokens) => {
						const res = await fetch('https://id.purduehackers.com/api/user', {
							headers: { Authorization: `Bearer ${tokens.accessToken}` }
						});
						const profile = await res.json();
						const passport = profile.latest_passport;
						return {
							id: String(profile.sub),
							name: passport
								? `${passport.name} ${passport.surname}`
								: String(profile.sub),
							email: `${profile.sub}@id.purduehackers.com`,
							emailVerified: false,
							image: undefined,
							raw: profile
						};
					},
					mapProfileToUser: (profile) => ({
						role: profile.raw?.role ?? null
					})
				}
			]
		}),
		sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
	]
});
```
To add sign in capabilities, use your framework’s preferred method. For example, SvelteKit uses server actions, with this example using `/signIn` as the endpoint:
```javascript
export const actions: Actions = {
	signIn: async (event) => {
		const result = await auth.api.signInWithOAuth2({
			body: {
				providerId: 'purduehackers-id',
				callbackURL: '/dashboard'
			}
		});

		if (result.url) {
			return redirect(302, result.url);
		}
		return fail(400, { message: 'Sign-in failed' });
	}
};
```
# 3. Use Endpoints
## `GET /api/user`: Returns user information
Requires `user:read` scope.
```json
{
	"iss": "https://id.purduehackers.com",
	"sub": int,
	"id": int,
	"discord_id": int,
	"role": "hacker" | "admin",
	"latest_passport": null | {
		"id": int,
		"version": int,
		"surname": string,
		"name": string,
		"date_of_birth": isostring,
		"date_of_issue": isostring,
		"place_of_origin": string
	},
}
```
## `GET /api/jwk`: Returns JWK public key
## `GET /api/door`: Returns whether a passport is valid and active
Requires JSON body:
```json
{
	"id": int,
	"secret": string
}
```
- `200`: Valid and active
- `401`: Invalid passport secret
- `403`: Passport is disabled
## `GET /api/passport`: Returns a list of all passports
Requires `admin:read` scope.
## `POST /api/passport/{id}`: Activates a passport with ID `id` 
Requires `admin` scope.
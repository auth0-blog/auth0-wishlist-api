# WishList API: Express Sample

<!-- vscode-markdown-toc -->

- [Quick Setup](#QuickSetup)
  - [1. Configure Auth0](#ConfigureAuth0)
  - [2. Create a Quick Live Server](#CreateaQuickLiveServer)
  - [3. Connect the Server with Auth0](#ConnecttheServerwithAuth0)
  - [4. Test the Live Server](#TesttheLiveServer)
- [API Endpoints](#APIEndpoints)
  - [Public Endpoints](#PublicEndpoints)
  - [Protected Endpoints](#ProtectedEndpoints)

<!-- vscode-markdown-toc-config
	numbering=false
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## <a name='QuickSetup'></a>Quick Setup

### <a name='ConfigureAuth0'></a>1. Configure Auth0

You need an Auth0 account. If you don't have one yet, <a href="https://auth0.com/signup">sign up for a free Auth0 account</a>.

Open the [APIs section of the Auth0 Dashboard](https://manage.auth0.com/#/apis), click the "Create API" button.

Fill out the form that comes up:

- **Name:**

```
WishList API Sample
```

- **Identifier:**

```
https://wishlist.sample
```

Leave the signing algorithm as `RS256`. It's the best option from a security standpoint.

Once you've added those values, click the "Create" button.

Once you create an Auth0 API, a new page loads up, presenting you with your Auth0 API information.

Keep page open to complete the next step.

### <a name='CreateaQuickLiveServer'></a>2. Create a Quick Live Server

Open this Glitch project:

[https://glitch.com/edit/#!/auth0-blog-wishlist-demo-api](https://glitch.com/edit/#!/auth0-blog-wishlist-demo-api)

Click on the "Remix to Edit" button in the top-right corner.

### <a name='ConnecttheServerwithAuth0'></a>3. Connect the Server with Auth0

Click on the `.env` file from your Glitch project. You'll need to add the values for `AUTH0_AUDIENCE` and `AUTH0_ISSUER` from your Auth0 API configuration.

Head back to your Auth0 API page.

Click on the "Quick Start" tab. This page offers guidance on how to set up different backend technologies to consume the Authorization API you've created.

From the code box, choose "Node.js".

Use the value from the `jwtCheck` method to populate the missing environmental variable values from your `.env` file.

The `AUTH0_ISSUER` is the value of the `issuer` property, including the trailing slash.

The `AUTH0_AUDIENCE` is the value of the `audience` property.

> _Do not_ include the quotes as part of the `.env` variable value. Only include the string within the quotes.

### <a name='TesttheLiveServer'></a>4. Test the Live Server

In your Glitch project, click on the "Share" button, which you can find under the project name in the top-left corner.

Click on the "Live App" tab and copy the first URL right under the buttons. This is the root URL of your live server that you can use to make requests:

```bash
https://<random-long-string>.glitch.me
```

#### Making a request to a public endpoint

Open the terminal and test if the server is working by making the following request:

```bash
curl https://<random-long-string>.glitch.me/api/wishlist/items
```

You should receive a response from the server similar to this:

```bash
{
    "items": [
        {
            "id": "IHbQsGGh-",
            "description": "toilet paper"
        },
        {
            "id": "UBihgXerxm",
            "description": "face mask"
        },
        {
            "id": "8TL-dp-Q1F",
            "description": "hand sanitizer"
        }
    ]
}
```

#### Making a request to a protected endpoint

Whenever you want to access an API protected endpoint, you need to include an access token issued by Auth0 in the authorization header of the request.

It's easy to get a test access token. Head to the [APIs section of the Auth0 Dashboard](https://manage.auth0.com/#/apis).

Select the Auth0 API you configured earlier, "WishList API Sample", and click on the "Test" tab. If this is your first time visiting this tab, click on the "Create & Authorize Test Application" button.

Locate the "Sending the token to the API" section and click on the "cURL" tab.

Copy the sample `curl` command.

Replace the `GET` request value with the type of request you want to make, such as `POST`, `PUT`, and `DELETE`. Refer to the <a name='APIEndpoints'>API Endpoints</a> for more details on the requests the Wish List Server can serve.

Replace the value of `--url` with the path to the resource, such as `https://<random-long-string>.glitch.me/api/wishlist/<resource>`

Execute the command in your terminal.

A `curl` request to add an item to the Wish List may look like this:

```bash
curl --request POST \
  --url https://<random-long-string>.glitch.me/api/wishlist/item \
  --header 'authorization: Bearer YOUR-VERY-LONG-TEST-ACCESS-TOKEN' \
  --header "Content-Type: application/json" \
  --data '{"description":"nintendo switch"}'
```

Once you execute it, the following message should print in the terminal:

{% prism bash %}
Hello, Authenticated User!
{% endprism %}

## <a name='APIEndpoints'></a>API Endpoints

### <a name='PublicEndpoints'></a>Public Endpoints

🔓 `GET /api/wishlist/items`

Get all items from the wishlist.

🔓 `GET /api/wishlist/item`

Get an item from the wishlist.
The request body must include the ID of the item you want to retrieve as follows:

```json
{
  "id": "c0PGnhCeb"
}
```

### <a name='ProtectedEndpoints'></a>Protected Endpoints

These endpoints require the request to include an access token issued by Auth0 in the authorization header.

🔐 `POST /api/wishlist/item`

Add an item to the wishlist.
The request body must include the item description as follows:

```json
{
  "description": "nitendo switch"
}
```

🔐 `PUT /api/wishlist/item`

Update an item from the wishlist.
The request body must include the ID of item ID you want to update and the new description of the item as follows:

```json
{
  "id": "Ww_1KHteq",
  "description": "nintendo console"
}
```

🔐 `DELETE /api/wishlist/items`

Remove all items from the wishlist.

🔐 `DELETE /api/wishlist/item`

Remove an item from the wishlist.
The request body must include the ID of the item you want to remove as follows:

```json
{
  "id": "_SdDBfnbgw"
}
```

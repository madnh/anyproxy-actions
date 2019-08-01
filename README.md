# AnyProxy Actions

Actions for Anyproxy's rules.

## How to use?

```js
{
    * beforeSendRequest: StatusCode(401),
    * beforeSendResponse: ModifyResponseBody.append('Hacked'),
}
```
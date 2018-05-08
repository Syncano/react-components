LoginForm example:

```jsx
const {SyncanoContext, withSyncano} = require('@syncano/react-context');
const SyncanoClient = require('@syncano/client');
const ConnectedLoginForm = withSyncano(LoginForm);

<SyncanoContext.Provider value={new SyncanoClient('webmaster-kit')}>
  <ConnectedLoginForm />
</SyncanoContext.Provider>
```

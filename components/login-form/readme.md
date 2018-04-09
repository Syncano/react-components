LoginForm example:

```jsx
const {SyncanoContext} = require('@syncano/react-context');

<SyncanoContext.Provider value={require('@syncano/client')('webmaster-kit')}>
  <LoginForm />
</SyncanoContext.Provider>
```

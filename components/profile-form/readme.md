ProfileForm example:

```jsx
const {SyncanoContext} = require('@syncano/react-context');

<SyncanoContext.Provider value={require('@syncano/client')('webmaster-kit')}>
  <ProfileForm />
</SyncanoContext.Provider>
```

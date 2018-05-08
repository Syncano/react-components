ProfileForm example:

```jsx
const {SyncanoContext, withSyncano} = require('@syncano/react-context');
const SyncanoClient = require('@syncano/client');
const ConnectedProfileForm = withSyncano(ProfileForm);

<SyncanoContext.Provider value={new SyncanoClient('webmaster-kit')}>
  <ConnectedProfileForm />
</SyncanoContext.Provider>
```

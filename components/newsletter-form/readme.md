NewsletterForm example:

```jsx
const {SyncanoContext, withSyncano} = require('@syncano/react-context');
const SyncanoClient = require('@syncano/client');
const ConnectedNewsletterForm = withSyncano(NewsletterForm);

<SyncanoContext.Provider value={new SyncanoClient('webmaster-kit')}>
  <ConnectedNewsletterForm listId="xxx" />
</SyncanoContext.Provider>
```

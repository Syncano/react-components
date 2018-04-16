NewsletterForm example:

```jsx
const {SyncanoContext} = require('@syncano/react-context');

<SyncanoContext.Provider value={require('@syncano/client')('webmaster-kit')}>
  <NewsletterForm listId="xxx" />
</SyncanoContext.Provider>
```

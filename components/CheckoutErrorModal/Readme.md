```jsx
let showModal = false;
<CheckoutErrorModal active={showModal} closeModal={() => {
  return showModal = !showModal;
}} />
```

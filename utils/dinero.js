import Dinero from 'dinero.js';

export function add(a, b) {
  return Dinero({ amount: a })
    .add(Dinero({ amount: b }))
    .getAmount();
}

export function subtract(a, b) {
  return Dinero({ amount: a })
    .subtract(Dinero({ amount: b }))
    .getAmount();
}

export function setDinero(a, stripe = false) {

  const amount = !stripe ? a : a / 100;

  return Dinero({ amount }).toFormat('0,0.00');
}

export function applyPercentDiscount(a, b) {
  const amountToSubtract = Dinero({ amount: a }).percentage(b);

  return Dinero({ amount: a })
    .subtract(amountToSubtract)
    .toFormat('0,0.00');
}

export function applyAmountDiscount(a, b) {
  return Dinero({ amount: a })
    .subtract(Dinero({ amount: b }))
    .toFormat('0,0.00');
}

const wordNormalize = require('./wordNormalize');

module.exports = {
  signup(bool) {
    fbq('track', 'CompleteRegistration', bool);
  },
  addToCart(product) {
    fbq('track', 'AddToCart', product);
  },
  checkoutStarted(checkout) {
    fbq('track', 'InitiateCheckout', checkout);
  },
  orderCompleted(order) {
    fbq('track', 'Purchase', order);
  },
  locationChoosed(country) {
    fbq('trackCustom', 'CountryChoosed', {
      value: wordNormalize(country)
    });
  },
  searchTrack(words) {
    fbq('track', 'Search', {
      search_string: wordNormalize(words)
    });
  },
  viewContent(page) {
    fbq('track', 'ViewContent', page);
  },
  addPaymentInfo(info) {
    fbq('track', 'AddPaymentInfo', info);
  },
  filter(params) {
    fbq('trackCustom', 'Filter', params);
  },
  quiz(name, params) {
    fbq('trackCustom', name, params);
  },
  becomeTeacher(page) {
    fbq('trackCustom', 'BecomeTeacher', page);
  },
  selectUniversity(param) {
    fbq('trackCustom', 'SelectUniversity', param);
  },
  leaveComment() {
    fbq('trackCustom', 'LeaveComment');
  },
  migrate() {
    fbq('trackCustom', 'Migrate');
  },
  freeTrial(param) {
    fbq('trackCustom', 'FreeTrial', param);
  },
  playerView(param) {
    fbq('trackCustom', 'PlayerView', param);
  },
  freemiumInterest(bool) {
    fbq('track', 'FreemiumInterest', bool);
  },
  freemiumRegister(bool) {
    fbq('track', 'FreemiumRegister', bool);
  },
  inviteMyFriends(page) {
    fbq('track', 'InviteMyFriends', page);
  },
  referralTabSelected(bool) {
    fbq('track', 'ReferralTabSelected', bool);
  },
  referralCopiedLink(bool) {
    fbq('track', 'ReferralCopiedLink', bool);
  },
  referralDiscountApplied(bool) {
    fbq('track', 'ReferralDiscountApplied', bool);
  },
  referralSubscribed(bool) {
    fbq('track', 'ReferralSubscribed', bool);
  },
  referralClickBanner(bool) {
    fbq('track', 'ReferralClickBanner', bool);
  },
};

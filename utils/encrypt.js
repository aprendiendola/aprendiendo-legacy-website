const CaesarEncrypt = (str, offset) => {

  str = str.toLowerCase();

  let result = '';
  var charcode = 0;

  for (var i = 0; i < str.length; i++) {
    charcode = (str.charCodeAt(i));
    const newCharcode = (charcode + offset - 97) % 26 + 97;

    result += String.fromCharCode(newCharcode).toLowerCase();
  }
  return result;

}

const randomLetter = (str) => {

  const randomNumber = () => Math.floor((Math.random() * 20) + 1);
  return str.substr(randomNumber(), 2);

}

export default (text) => {
  const str = 'abcdefghijklmnopqrstuvwxyz';
  return `${randomLetter(str)}${CaesarEncrypt(text, 5)}${randomLetter(str)}`;
}
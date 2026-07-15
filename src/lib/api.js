import axios from 'axios';
const baseUrl = 'https://api.magicthegathering.io';
export async function getCardByAxios(id) {
  const url = `${baseUrl}/v1/cards/${id}`;
  console.log(`Fetching card with id ${id} from ${url}`);
  const result = await axios.get(url);
  console.log(result);
  const resultString = JSON.stringify(result);
  console.log(`Result string: ${resultString}`);
  return result;
}


// mtgsdk
// const mtg = require('mtgsdk');

// export async function getCardById(cardId) {
//     return await mtg.card.find(cardId);
// }

// export async function getCardByName(cardName) {
//    return await mtg.card.all({ name: cardName || '' });
// }
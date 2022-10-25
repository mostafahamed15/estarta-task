import Axios from 'axios';

export function getLogger() {
  return Axios.get(
    'https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f'
  ).then((res) => res.data.result);
}

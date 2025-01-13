import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import * as path from 'path';
import crypto from 'crypto';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
process.emitWarning = () => {};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'sbertoken.txt');

export async function sber(prompt) {
  const payload = {
    model: 'GigaChat',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    n: 1,
    stream: false,
    max_tokens: 512,
    repetition_penalty: 1,
    update_interval: 0,
  };

  let accessToken = await fs.readFile(filePath, 'utf8');

  let result = await doRequest(accessToken);

  if (result === 'regenerate-token') {
    accessToken = await getAccessToken();
    if (!accessToken) throw new Error('Get Token Unsuccess');
    await fs.writeFile(filePath, accessToken, 'utf8');
    result = await doRequest(accessToken);
  }

  if (result) return result.choices[0].message.content;

  async function doRequest(accessToken) {
    const url = 'https://gigachat.devices.sberbank.ru/api/v1/chat/completions';

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: headers,
      });

      if (!response.ok) {
        if (response.status === 401) {
          return 'regenerate-token';
        } else throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function getAccessToken() {
    const UUID = crypto.randomUUID();
    const BASIC_AUTH_KEY =
      'Basic NTQ5YTM4M2QtY2UwNy00NWY0LWJkZDQtYWQyYWU0ZWRmZDMwOjhmYmNjNDQxLWQ4OTYtNGYxMC05Y2ZjLWRkYTBkZTkzODQ5MA==';

    const url = 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth';

    const payload = new URLSearchParams({
      scope: 'GIGACHAT_API_PERS',
    });

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      RqUID: UUID,
      Authorization: BASIC_AUTH_KEY,
    };

    return await fetch(url, {
      method: 'POST',
      headers: headers,
      body: payload,
    })
      .then((response) => response.json())
      .then((data) => {
        accessToken = data.access_token;
        console.log('Generated New Token.', accessToken.slice(0, 10));
        return accessToken;
      })
      .catch((error) => console.error('Error:', error));
  }
}

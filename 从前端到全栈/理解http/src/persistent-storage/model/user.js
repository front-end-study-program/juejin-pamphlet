import crypto from 'crypto'
import { setSession } from './session.js'

const sessionName = 'userInfo';

export async function login(database, ctx, { name, passwd }) {
  const userInfo = await database.get('SELECT * FROM user WHERE name = ?', name);
  const salt = 'xypte';
  const hash = crypto.createHash('sha256').update(`${salt}${passwd}`, 'utf8').digest().toString('hex');
  if(userInfo && hash === userInfo.password) {
    const data = {id: userInfo.id, name: userInfo.name};
    setSession(database, ctx, sessionName, data); // 创建session
    return data;
  }
  return null;
}
export async function getList(database, userInfo) {
  const result = await database.all(`SELECT * FROM todo WHERE state <> 2 and userid = ${userInfo.id} ORDER BY state DESC`);
  return result;
}

export async function addTask(database, userInfo, {text, state}) {
  try {
    const data = await database.run('INSERT INTO todo(text,state, userid) VALUES (?, ?, ?)', text, state, userInfo.id);
    return {err: '', data};
  } catch (ex) {
    return {err: ex.message};
  }
}
export async function getList(database) {
  const result = await database.all('SELECT * FROM todo')
  return result
}

export async function addTask(database, {text, state}) {
  try {
    const data = await database.run('INSERT INTO todo(text,state) VALUES (?, ?)', text, state);
    return {err: '', data};
  } catch (ex) {
    return {err: ex.message};
  }
}

// 返回一个大于等于 min，小于 max 的随机整数
export function randomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}


// 从数组中随机选择元素
export function createRandomPicker(arr) {
  arr = [...arr]
  function randomPick() {
    const len = arr.length - 1
    const index = randomInt(0, len)
    const picked = arr[index]
    arr[index] = arr[len]
    arr[len] = picked
    // [arr[index], arr[len]] = [arr[len], arr[index]]
    return picked
  }
  randomPick()
  return randomPick
}
export function formatDate(ts) {
  return `${ts.getFullYear()}.${(ts.getMonth() + 1)
    .toString()
    .padStart(2, 0)}.${ts
    .getDate()
    .toString()
    .padStart(2, 0)} ${ts
    .getHours()
    .toString()
    .padStart(2, 0)}:${ts
    .getMinutes()
    .toString()
    .padStart(2, 0)}:${ts
    .getSeconds()
    .toString()
    .padStart(2, 0)}:${ts.getMilliseconds().toString().padStart(3, 0)}`;
}

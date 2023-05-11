


export function getDate(value: any):Date {

  if (typeof value?.toDate === 'function') {
    return value.toDate()
  }

  return new Date(value)
}
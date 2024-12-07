export const filterObjectByQuery = <T extends object>(
  object: T[],
  property: keyof T,
  query: string,
  include = true
) => {
  const filteredObject = object.filter((article) =>
    include ? article[property] === query : article[property] !== query
  )

  return filteredObject
}

export const excludeObjectByQuery = <T extends object>(
  object: T[],
  property: keyof T,
  query: string
) => {
  const filteredObject = filterObjectByQuery(object, property, query, false)

  return filteredObject
}

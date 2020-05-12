const filterByTerm = require('../src/filterByTerm')

describe('Filter function', () => {
  test('it should filter by a search term (link)', () => {
    const input = [
      { id: 1, url: 'https://www.url1.dev' },
      { id: 2, url: 'https://www.url2.dev' },
      { id: 3, url: 'https://www.link3.dev' }
    ]

    const output = [{ id: 3, url: 'https://www.link3.dev' }]

    expect(filterByTerm(input, 'link')).toEqual(output)
    expect(filterByTerm(input, 'LINK')).toEqual(output)
  })
})

describe('Filter function', () => {
  test('it should filter by a search term (uRl)', () => {
    const input = [
      { id: 1, url: 'https://www.url1.dev' },
      { id: 2, url: 'https://www.url2.dev' },
      { id: 3, url: 'https://www.link3.dev' }
    ]

    const output = [
      { id: 1, url: 'https://www.url1.dev' },
      { id: 2, url: 'https://www.url2.dev' }
    ]

    expect(filterByTerm(input, 'uRl')).toEqual(output)
  })
})

describe('Filter function', () => {
  test('it should return error for empty search term', () => {
    const input = [
      { id: 1, url: 'https://www.url1.dev' },
      { id: 2, url: 'https://www.url2.dev' },
      { id: 3, url: 'https://www.link3.dev' }
    ]

    const output = Error('searchTerm cannot be empty')
    try {
      filterByTerm(input, '')
    } catch (error) {
      expect(error).toEqual(output)
    }
  })
})

describe('Filter function', () => {
  test('it should return error for empty input', () => {
    const input = []

    const output = Error('inputArr cannot be empty')
    try {
      filterByTerm(input, 'link')
    } catch (error) {
      expect(error).toEqual(output)
    }
  })
})

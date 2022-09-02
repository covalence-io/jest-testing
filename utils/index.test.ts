import { isNil, serializeQuery } from './';

test('Checking isNil', () => {
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
    expect(isNil('test')).toBe(false);
    expect(isNil(1)).toBe(false);
    expect(isNil('')).toBe(false);
});

test('Serializing a query object', () => {
    expect(serializeQuery(null)).toBe('');
    expect(serializeQuery({})).toBe('');
    expect(
        serializeQuery({
            limit: 10,
        })
    ).toEqual('?limit=10');
    expect(
        serializeQuery({
            count: 0,
            limit: 10,
            after: 't3_p02cs',
        })
    ).toEqual('?count=0&limit=10&after=t3_p02cs');
});

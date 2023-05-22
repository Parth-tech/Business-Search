const axios = require('axios');
const { getAutoComplete } = require('../controllers/autocomplete');

jest.mock('axios');

describe('getAutoComplete', () => {
  test('returns autocomplete data for successful API call', async () => {
    const mockData = {
      terms: [
            {
                "text": "Zumba Classes"
            },
            {
                "text": "Auto Zone Near Me"
            },
            {
                "text": "Zip Line"
            }
        ],
    };

    axios.get.mockResolvedValueOnce({ data: mockData });

    const queryparams = { keyword: 'z' };
    const result = await getAutoComplete(queryparams);

    expect(result.autocomplete).toEqual(mockData.terms);
  });

  test('returns empty autocomplete array for unsuccessful API call', async () => {
    axios.get.mockRejectedValueOnce(new Error('API error'));

    const queryparams = { keyword: 'testing' };
    const result = await getAutoComplete(queryparams);

    expect(result.autocomplete).toEqual([]);
  });

  test('returns empty autocomplete array for response without autocomplete data', async () => {
    const mockData = {}; // Empty response without autocomplete data

    axios.get.mockResolvedValueOnce({ data: mockData });

    const queryparams = { keyword: 'test' };
    const result = await getAutoComplete(queryparams);

    expect(result.autocomplete).toEqual(undefined);
  });
});

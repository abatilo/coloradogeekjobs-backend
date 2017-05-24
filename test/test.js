const chai = require('chai');
const expect = chai.expect;
const hasRequiredKeys = require('../index').hasRequiredKeys;

describe('hasRequiredKeys works correctly', () => {
  it('returns true with valid data', (done) => {
    const obj = {
      'city': '',
      'company': '',
      'description': '',
      'email': '',
      'how': '',
      'remote': '',
      'title': '',
      'url': '',
    };

    const requiredKeys = [
      'city',
      'company',
      'description',
      'email',
      'how',
      'remote',
      'title',
      'url',
    ];

    expect(hasRequiredKeys(obj, requiredKeys)).to.equal(true);
    done();
  });

  it('returns false with invalid data', (done) => {
    const obj = {
      'company': '',
      'description': '',
      'email': '',
      'how': '',
      'remote': '',
      'title': '',
      'url': '',
    };

    const requiredKeys = [
      'city',
      'company',
      'description',
      'email',
      'how',
      'remote',
      'title',
      'url',
    ];

    expect(hasRequiredKeys(obj, requiredKeys)).to.equal(false);
    done();
  });
});

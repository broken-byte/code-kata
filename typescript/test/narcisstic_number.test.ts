import { expect } from 'chai';

import { isNarcissistic } from '../src/narcissistic_number/narcissistic_number';

describe('Narcissistic Number', () => {

  it('Should return true for numbers which are narcissistic', () => {
    expect(isNarcissistic(7)).to.equal(true, '7 is narcissistic');
    expect(isNarcissistic(153)).to.equal(true, '153 is narcissistic');
    expect(isNarcissistic(1634)).to.equal(true, '1634 is narcissistic');
  });

  it('Should return false for numbers which are not narcissistic', () => {
    expect(isNarcissistic(10)).to.equal(false, '10 is not narcissistic');
    expect(isNarcissistic(154)).to.equal(false, '154 is not narcissistic');
    expect(isNarcissistic(1635)).to.equal(false, '1652 is not narcissistic');
  });
});

import processAlerts from '../../src/utilities/process_alerts';
import { UserCollection } from '../../src/models/user';

describe('test suite for function process alerts', () => {
  //   beforeAll(() => {
  //     spyOn(UserCollection.prototype, 'getFriendsForUser').and.returnValue(1);
  //     );
  //   });
  it('should return specific result when called', () => {
    const result = processAlerts(1);
    expect(result).toEqual('4,BUY,GOOG_4,SELL,FB_');
  });

  //   it('should return an error if the user id is invalid', () => {
  //     const result = processAlerts(-1);
  //     expect(processAlerts(-1)).toThrow(new Error('invalid user id'));
  //   });
});

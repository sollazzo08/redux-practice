import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { addBug } from '../bugs';
import configureStore from '../configureStore';

describe('bugsSlice', () => {
  describe('action creators', () => {
    let fakeAxios;
    let store;

    beforeEach(() => {
      fakeAxios = new MockAdapter(axios);
      store = configureStore();
    });

    const bugsSlice = () => store.getState().entities.bugs;

    it('should add the bug to the store if it is saved to the server', async () => {
      // Arrange
      const bug = { description: 'a' };
      const savedBug = { ...bug, id: 1 };
      fakeAxios.onPost('/bugs').reply(200, savedBug);

      // Act
      await store.dispatch(addBug(bug));

      // Assert
      expect(bugsSlice().list).toContainEqual(savedBug);
    });
    it('should not add the bug to the store if it is not saved to the server', async () => {
      // Arrange
      const bug = { description: 'a' };
      const savedBug = { ...bug, id: 1 };
      fakeAxios.onPost('/bugs').reply(500, savedBug);

      // Act
      await store.dispatch(addBug(bug));

      // Assert
      expect(bugsSlice().list).toHaveLength(0);
    });
  });
});

/* SOLITARY TEST
    it("addBug", () => {
      const bug = {description: 'a'}
      const result = addBug(bug)
      const expected = {
        type: apiCallBegan.type,
        payload: {
          url: '/bugs',
          method: 'post',
          data: bug,
          onSuccess: bugAdded.type
        }
      }
      expect(result).toEqual(expected)
    })
  */

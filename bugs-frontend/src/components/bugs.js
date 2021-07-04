import {createStore} from 'redux';
import movieReducer from './reducers';

const store = createStore(reducer);

export default store;




{
  movies: [
    {
      id: 1,
      title: 'Interstellar',
      genre: 'Science Fiction',
      liked: false,
    },
    {
      id: 2,
      title: 'The Matrix',
      genre: ['Science Fiction', 'Action'],
      liked: false,
    },
  ];
  currentUser: {}
}





let lastId = 0;
//reducers must be pure
function reducer(state = [], action) {
  if(action.type === 'ADD_MOVIE') {
    return [
      ...state.movies,
        {
          id: ++lastId,
          title: action.payload.title,
          genre: action.payload.genre,
          liked: false
        }
    ]
  }
}
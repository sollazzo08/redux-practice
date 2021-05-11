import configureStore from './store/configureStore';
import { bugAdded, bugResolved, getUnresolvedBugs, getBugsByUser, bugAssignToUser } from './store/bugs';
import { projectAdded } from './store/projects';
import { userAdded } from './store/users';

const store = configureStore();

// User dispatches
store.dispatch(userAdded({ name: 'User 1' }));
// store.dispatch(userAdded({ name: 'User 2' }));
// store.dispatch(userAdded({ name: 'User 3' }));

// // Project dispatches
// store.dispatch(projectAdded({ name: 'Project 1' }));

// // Bug dispatches
// store.dispatch(bugAdded({ description: 'Bug 1' }));
// store.dispatch(bugAdded({ description: 'Bug 2' }));
// store.dispatch(bugAdded({ description: 'Bug 3' }));
// store.dispatch(bugAssignToUser({bugId: 1, userId: 1}))
// store.dispatch(bugResolved({ id: 1 }));

//List of unresolved bugs
const unresolvedBugs = getUnresolvedBugs(store.getState());

//List of bugs by user

const bugsByUser = getBugsByUser(1)(store.getState())

console.log(bugsByUser)
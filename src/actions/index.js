import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder'

export const fetchPosts = () => async (dispatch) => {
    const response = await jsonPlaceholder.get('/posts')

    dispatch({ type: 'FETCH_POSTS', payload: response.data })
}


export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`)

    dispatch({ type: 'FETCH_USER', payload: response.data })
};

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    const userIds = _.uniq(_.map(getState().posts, 'userId'));
    userIds.forEach(id => dispatch(fetchUser(id)));
};

export const addPost = () => {
    return {
        type: 'ADD_POST',
        payload: {
            id: Math.ceil(Math.random() * 101),
            userId: Math.ceil(Math.random() * 101),
            title: 'A new post',
            body: 'This is a new post',
        },
    }
}

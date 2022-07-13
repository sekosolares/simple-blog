import _ from 'lodash';
import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get("/posts");

    dispatch({ type: "FETCH_POSTS", payload: response.data });
};

const _fetchUser = _.memoize(async (id, dispatch) => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({ type: "FETCH_USER", payload: response.data });
});

export const fetchUser = id => dispatch => _fetchUser(id, dispatch);

export const addPost = () => {
    return {
        type: "ADD_POST",
        payload: {
            id: Math.ceil(Math.random() * 101),
            userId: Math.ceil(Math.random() * 101),
            title: "A new post",
            body: "This is a new post"
        }
    };
}
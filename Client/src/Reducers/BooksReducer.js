
const InitBooksState = {
    isLoading: true,
    data: {}
};

const mapAndMergeData = ({ state, payload }) => {
    return payload.reduce((prev, next) => {
        prev[next.id] = next;
        return prev;
    }, {...state})
};

const booksReducer = (state=InitBooksState, action) => {
    const {type, payload} = action || {};

    switch (type) {
        case 'GET_BOOKS_DATA_INIT':
            return { ...InitBooksState };
            
        case 'GET_BOOKS_DATA_SUCCESS':
            const data = mapAndMergeData({state: state.data || {}, payload})
            
            return {
                isLoading: false,
                data
            };

        case 'GET_BOOKS_DATA_FAILURE':
            return {
                isLoading: false,
                data: payload
            };

        default:
            return state
    }
}

export default booksReducer;

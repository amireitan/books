
const InitBookInfoState = {
    isLoading: false,
    selectedBookId: null
};

const bookInfoReducer = (state = InitBookInfoState, action) => {
    const {type, payload} = action || {};

    switch (type) {
        case 'SELECTED_BOOK_ID':
            return {
                ...InitBookInfoState,
                selectedBookId: payload
            };

        case 'UPDATE_BOOK_DATA_REQUEST':
            return {
                ...state,
                isLoading: true
            };

        case 'UPDATE_BOOK_DATA_SUCCESS':
            return {
                ...state,
                isLoading: false,
                error: null
            };

        case 'UPDATE_BOOK_DATA_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: payload
            };

        default:
            return state
    }
}

export default bookInfoReducer;

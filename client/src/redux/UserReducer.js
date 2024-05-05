import {createReducer} from "@reduxjs/toolkit"

const intitalState = {
    isAuthenticated : false
}

export const userReducer = createReducer(intitalState, {
    registerRequest :(state) =>{
        state.loading = true;
    },
    registerSuccess : (state, action) =>{
        state.loading = false;
        state.user = action.payload.newUser;
        state.isAuthenticated = true;
        state.message = action.payload.message;
    },
    registerFailure : (state, action) =>{
        state.loading = false;
        state.error = action.payload;
    },

    loginRequest :(state) =>{
        state.loading = true;
    },
    loginSuccess : (state, action) =>{
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.message = action.payload.message;
    },
    loginFailure : (state, action) =>{
        state.loading = false;
        state.error = action.payload;
    },

    loadUserRequest :(state) =>{
        state.loading = true;
    },
    loadUserSuccess : (state, action) =>{
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    loadUserFailure : (state, action) =>{
        state.loading = false;
        state.error = action.payload;
    },

    logoutRequest :(state) =>{
        state.loading = true;
    },
    logoutSuccess : (state, action) =>{
        state.loading = false;
        state.isAuthenticated = false;
        state.message = action.payload;
    },
    logoutFailure : (state, action) =>{
        state.loading = false;
        state.error = action.payload;
    },

    updateRequest :(state) =>{
        state.loading = true;
    },
    updateSuccess : (state, action) =>{
        state.loading = false;
        state.message = action.payload;
    },
    updateFailure : (state, action) =>{
        state.loading = false;
        state.error = action.payload;
    },

    deleteUserRequest :(state) =>{
        state.loading = true;
    },
    deleteUserSuccess : (state, action) =>{
        state.loading = false;
        state.message = action.payload;
    },
    deleteUserFailure : (state, action) =>{
        state.loading = false;
        state.error = action.payload;
    },

    clearMessage:(state) =>{
        state.message = null;
    },
    clearError:(state) =>{
        state.error = null;
    }
})

export const allUserReducer = createReducer({},{
    allUserRequest :(state) =>{
        state.loading = true;
    },
    allUserSuccess : (state, action) =>{
        state.loading = false;
        state.users = action.payload.users;
        state.message = action.payload.message;
    },
    allUserFailure : (state, action) =>{
        state.loading = false;
        state.error = action.payload;
    },
    clearMessage:(state) =>{
        state.message = null;
    },
    clearError:(state) =>{
        state.error = null;
    }
})

export const singleUserReducer = createReducer({},{
    singleUserRequest :(state) =>{
        state.loading = true;
    },
    singleUserSuccess : (state, action) =>{
        state.loading = false;
        state.user = action.payload.user;
        state.message = action.payload.message;
    },
    singleUserFailure : (state, action) =>{
        state.loading = false;
        state.error = action.payload;
    },
    clearMessage:(state) =>{
        state.message = null;
    },
    clearError:(state) =>{
        state.error = null;
    }
})

export const chatReducer = createReducer({}, {
    sendMessageRequest : (state) =>{
        state.loading  = true;
    },
    sendMessageSuccess : (state, action) =>{
        state.loading = false;
        state.message = action.payload.message;
        state.newChat = action.payload.newChat;
    },
    sendMessageFailure : (state, action) =>{
        state.loading = false;
        state.error = action.payload;
    },
    
    allMessageRequest : (state) =>{
        state.loading  = true;
    },
    allMessageSuccess : (state, action) =>{
        state.loading = false;
        state.message = action.payload.message;
        state.messages = action.payload.allMessages;
    },
    allMessageFailure : (state, action) =>{
        state.loading = false;
        state.error = action.payload;
    },
})
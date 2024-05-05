import {configureStore} from "@reduxjs/toolkit"
import {allUserReducer, chatReducer, singleUserReducer, userReducer} from "./UserReducer"

export const store = configureStore({
    reducer:{
        userStore:userReducer,
        allUserStore:allUserReducer,
        singleUserStore:singleUserReducer,
        chatStore : chatReducer
    }
})
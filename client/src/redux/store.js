import {configureStore} from "@reduxjs/toolkit"
import {allUserReducer, singleUserReducer, userReducer} from "./UserReducer"

export const store = configureStore({
    reducer:{
        userStore:userReducer,
        allUserStore:allUserReducer,
        singleUserStore:singleUserReducer
    }
})
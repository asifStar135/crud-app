import axios from "axios"

export const registerUser = (name, userName, password, image, about) => async (dispatch) =>{
    try {
        dispatch({
            type:"registerRequest"
        })

        const {data} = await axios.post("/register", {name, userName, password, image, about});

        dispatch({
            type:"registerSuccess",
            payload:data
        })

    } catch (error) {
        dispatch({
            type:"registerFailure",
            payload: error.response.data.message
        })
    }
}

export const logoutUser = () => async (dispatch) =>{
    try {
        dispatch({
            type:"logoutRequest"
        })

        const {data} = await axios.put("/account");

        dispatch({
            type:"logoutSuccess",
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type:"logoutFailure",
            payload:error.response.data.message
        })
    }
}

export const loginUser = (userName, password) => async (dispatch) =>{
    try {
        dispatch({
            type:"loginRequest"
        })

        const {data} = await axios.post("/login", {userName, password});

        dispatch({
            type:"loginSuccess",
            payload:data
        })

    } catch (error) {
        dispatch({
            type:"loginFailure",
            payload:error.response.data.message
        })
    }
}

export const loadUser = () => async (dispatch) =>{
    try {
        dispatch({
            type:"loadUserRequest"
        })

        const {data} = await axios.get("/account");

        dispatch({
            type:"loadUserSuccess",
            payload:data.user
        })

    } catch (error) {
        dispatch({
            type:"loadUserFailure",
            payload:error.response.data.message
        })
    }
}

export const updateUser = (name, about, password, image) => async (dispatch) =>{
    try {
        dispatch({
            type:"updateRequest"
        })

        const {data} = await axios.put("/update", {name, image, about, password});

        dispatch({
            type:"updateSuccess",
            payload:data.message
        })

    } catch (error) {
        dispatch({
            type:"updateFailure",
            payload:error.response.data.message
        })
    }
}

export const deleteUser = (password) => async (dispatch) =>{
    try {
        dispatch({
            type:"deleteUserRequest"
        })

        const {data} = await axios.delete("/account", {data: {password}});

        dispatch({
            type:"deleteUserSuccess",
            payload:data.message
        })

    } catch (error) {
        dispatch({
            type:"deleteUserFailure",
            payload:error.response.data.message
        })
    }
}

export const singleUser = (id) => async (dispatch) =>{
    try {
        dispatch({
            type:"singleUserRequest"
        })

        const {data} = await axios.get(`/${id}`);

        dispatch({
            type:"singleUserSuccess",
            payload:data
        })

    } catch (error) {
        dispatch({
            type:"singleUserFailure",
            payload:error.response.data.message
        })
    }
}
export const getAllUser = () => async (dispatch) =>{
    try {
        dispatch({
            type:"allUserRequest"
        })

        const {data} = await axios.get("/allUser");

        dispatch({
            type:"allUserSuccess",
            payload:data
        })

    } catch (error) {
        dispatch({
            type:"allUserFailure",
            payload:error.response.data.message
        })
    }
}

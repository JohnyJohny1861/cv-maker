import axios from 'axios';


export const onLogout = () =>{
    return dispatch => {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('userId');
        dispatch(onSetDefaultCV())
    }
}

// const fail = (error) => ({type: 'FAIL', error})
const loggedIn = () => ({type: 'LOGGED_IN'})
export const onAuthAsync = (url, data, register, history) => {
    return dispatch => {
        axios.post(url, data)
            .then(res => {
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', res.data.expiresIn);
                localStorage.setItem('userId', res.data.localId);
                if(register) {
                    dispatch(loggedIn())
                    return new Promise((res, rej)=> res())
                } else {
                    dispatch(onSetCV())
                    dispatch(loggedIn())
                    history.push('/')
                }  
            })
            .then(res => {
                dispatch(onSetDefaultCV())
                history.push('/')
            })
            .catch(err => {
                console.log(err.response)
                if(err.response.data.error.message === 'EMAIL_EXISTS') {
                    alert('EMAIL_EXISTS');
                }
            })
    }
}

const defaultCV = (defaultState) => ({type: 'SET_DEFAULT_CV', defaultState});
export const onSetDefaultCV = () => {
    return dispatch => {
        axios.get('https://fileupload-111.firebaseio.com/state.json')
            .then(res => dispatch(defaultCV(res.data)))
            .catch(err => {
                console.log(err)
            })
    }
}


const setCV = state => ({type: 'SET_CV', state})
export const onSetCV = () => {
    const userId = localStorage.getItem('userId')
    return (dispatch, getState) => {
        if(userId && getState().isLoggedIn) {
            axios.get(`https://fileupload-111.firebaseio.com/${userId}.json`)
                .then(res => {
                    dispatch(setCV(res.data))
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}


export const onEdit = () => ({type: 'EDIT'});


const saveData = () => ({type: 'SAVE'});
export const onSaveData = (state) => {
    const userId = localStorage.getItem('userId')
    if(userId) {
        return (dispatch, getState) => {
            const savedState = {
                ...getState(),
                edit: null,
                isSaved: null,
                isLoggedIn: null
            }
            axios.put(`https://fileupload-111.firebaseio.com/${userId}.json`, savedState)
                .then(res => { 
                    dispatch(saveData())
                })
                .catch(err => {
                    console.log(err)
                    dispatch(saveData(false))
                })
        }
    }
}
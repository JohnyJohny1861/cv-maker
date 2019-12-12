import defaultImgUrl from '../assets/img/user.png';

const initialState = {
    edit: false,
    imgSrc: defaultImgUrl,
    infoItems: [],
    wrappers: [],
    wrapperBody: [],
    wrapperBodyList: [],
    skillBar: [
        {
            id: new Date().getTime() * Math.round(Math.random()*5),
            isAdded: false,
            SkillbarTitle: 'Skills'
        }
    ],
    skills: [],
    isSaved: false,
    isLoggedIn: localStorage.getItem('userId') ? true : false,
    error: false
}

const wrapperTitleTexts = [
    'Work Experience',
    'Education',
    'Certificates',
    'Projects'
]
const wrapperBodyKeys = [
    'Front-end Assistant',
    'Multimedia Faculty',
    'IELTS (academic)',
    'Burger Builder'
]
const wrapperBodyValues = [
    'iProsites, Nagoya, Japan',
    'HALL, Nagoya, Japan',
    'overall 6.5',
    'www.burgerbuilder.com'
]

const reducer = (state=initialState, action) => {
    const r = Math.round(Math.random() * 3);
    switch(action.type) {
        // AUTHENTICATION
        case 'LOGGED_IN':
            const loggedState = {
                ...state,
                isLoggedIn: true
            }
            return loggedState

        // SET CV
        case 'SET_CV':
            let infoItems = action.state.infoItems ? action.state.infoItems : []
            let wrappers = action.state.wrappers ? action.state.wrappers : []
            let wrapperBody = action.state.wrapperBody ? action.state.wrapperBody : []
            let wrapperBodyList = action.state.wrapperBodyList ? action.state.wrapperBodyList: []
            let skillBar = action.state.skillBar ? action.state.skillBar : []
            let skills = action.state.skills ? action.state.skills : []
            const setState = {
                ...action.state,
                infoItems,
                wrappers,
                wrapperBody,
                wrapperBodyList,
                skillBar,
                skills,
                isSaved: false,
                isLoggedIn: localStorage.getItem('userId') ? true : false,
                edit: false
            }
            return {
                ...setState
            }
        case 'SET_DEFAULT_CV':
            return {
                ...action.defaultState,
                isSaved: false,
                isLoggedIn: localStorage.getItem('userId') ? true : false,
                edit: false
            }

        // IMG UPLOAD
        case 'SAVE_URL':
            return {
                ...state,
                imgSrc: action.url
            }
            
        // EDIT
        case 'EDIT':
            const edit = !state.edit;
            return {
                ...state,
                edit
            }
        case 'SAVE':
            return {
                ...state,
                isSaved: false,
                edit: false
            }
        case 'ADD_WRAPPER':
            const wrapperState = {
                ...state,
                wrappers: state.wrappers.concat({
                    wrapperTitleText: wrapperTitleTexts[r],
                    id: action.id
                })
            }
            return wrapperState
        case 'DELETE_WRAPPER':
            return {
                ...state,
                wrappers: state.wrappers.filter(el => el.id !== action.id),     
            }

        // WRAPPER
        case 'ADD_WRAPPER_BODY':
            const oldBodyAdd = state.wrapperBody;
            const bodyAddState = {
                ...state,
                wrapperBody: oldBodyAdd.concat({
                    id: new Date().getTime() + 1000,
                    wrapperId: action.wrapperId,
                    keyText: wrapperBodyKeys[r],
                    valueText: wrapperBodyValues[r],
                    from: '2016',
                    to: '2019',
                    subText: 'Responsibilities',
                    subtitle: false
                })
            }
            return bodyAddState
        case 'DELETE_WRAPPER_BODY':
            const oldBodyDel = state.wrapperBody;
            return {
                ...state,
                wrapperBody: oldBodyDel.filter(el => {
                   return el.id === action.bodyId && el.wrapperId === action.wrapperId ? false : true
                })
            }
        case 'TOGGLE_SUBTITLE':
            const toggleBody = state.wrapperBody.map(el => {
                if(el.id === action.bodyId) {
                    const subtitle = !el.subtitle
                    return {
                        ...el,
                        subtitle
                    }
                } else return {...el}
            })
            return {
                ...state,
                wrapperBody: toggleBody
            }

        // WrapperBody 
        case 'ADD_LIST_ITEM':
            const wrapperBodyListAdd = state.wrapperBodyList;
            return {
                ...state,
                wrapperBodyList: wrapperBodyListAdd.concat({
                    id: new Date().getTime() + 10000,
                    bodyId: action.bodyId,
                    itemText: 'List Item'
                })
            }
        case 'DELETE_ITEM':
            const wrapperBodyListDelete = state.wrapperBodyList
            return {
                ...state,
                wrapperBodyList: wrapperBodyListDelete.filter(el => el.id !== action.id)
            }

        // SKILLBAR 
        case 'TOGGLE_SKILLBAR':
            const isAdded = !state.skillBar[0].isAdded
            const newSkillBar = [{...state.skillBar[0], isAdded}]
            return {
                ...state,
                skillBar: newSkillBar
            }
        case 'ADD_SKILL':
            return {
                ...state,
                skills: state.skills.concat({
                    id: new Date().getTime() * 5 - 2261231,
                    skillKey: 'React',
                    skillValue: '1-year experience'
                })
            }
        case 'DELETE_SKILL':
            return {
                ...state,
                skills: state.skills.filter(skill => skill.id !== action.id)
            }

        // TEXTCHANGE
        case 'CHANGE_TEXT':
            const objState = {...state}
            let arr;
            let property;
            for(let key in objState) {
                if(typeof objState[key] === 'object'){
                    objState[key].forEach((el, index) => {
                        for(let i in el){
                            if(i === action.title && el.id === +action.id){
                                property = key
                                arr = objState[key];
                                return arr[index] = {...el, [i]: action.text}
                            }
                        }
                    })
                }
            }
            const newState = {
                ...state,
                [property]: arr
            }
            return newState
        default : return state
    }    
}   

export default reducer;
import React from 'react'
import { connect } from 'react-redux';
import './Edit.css';

import * as actions from '../../store/actions';

const Edit = (props) => {
    const edit = props.isLoggedIn ? 
        (
            <div className="Edit" >
                <div className="Edit_Btn">
                { props.edit ?
                    <i 
                        onClick={() => props.onSave(props.state)}
                        className="far fa-save fa-3x"></i> :
                    <i 
                        onClick={props.onEdit}
                        className="far fa-edit fa-3x"></i>
                }
                </div>
                {props.edit ? (
                    <div className="Edit_Add">
                        <p onClick={props.onAddWrapper}>New Section</p>
                        <p onClick={props.onAddSkillbar}>Toggle Skill Bar</p>
                        <p onClick={props.onSetDefaultCV} className="Edit_Default">Example CV</p>
                    </div>
                ) : null}
            </div>
        ) : null
    return (
        edit
    )
}

const mapStateToProps = state => ({
    state: state,
    isLoggedIn: state.isLoggedIn,
    edit: state.edit
})

const mapDispatchToProps = dispatch => ({
    onEdit: () => dispatch(actions.onEdit()),
    onSave: (state) => dispatch(actions.onSaveData(state)),
    onSetDefaultCV: () => dispatch(actions.onSetDefaultCV()),
    onAddWrapper: () => dispatch({type: 'ADD_WRAPPER', id: new Date().getTime()}),
    onAddSkillbar: () => dispatch({type: 'TOGGLE_SKILLBAR'})
})

export default connect(mapStateToProps, mapDispatchToProps)(Edit)

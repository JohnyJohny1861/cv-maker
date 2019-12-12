import React from 'react'
import './ListItem.css'
import {connect} from 'react-redux';

const ListItem = (props) => {
    const style = props.edit ? {
        border: '2px dashed #c0c0c0',
        padding: '3px',
        boxSizing: 'initial',
        transform: 'translateX(-2px)'
    } : {
        transform: 'translateX(-2px)'
    }
    return (
        <li className="SkillBar-item" style={style}>
            <p 
                id={props.id}
                className="Skill-key textChange" 
                title="skillKey">{props.skillKey}</p>
            <p 
                id={props.id}
                className="Skill-value textChange" 
                title="skillValue">{props.skillValue}</p>
            {props.edit ? (
            <i
                onClick={() => props.onDeleteSkill(props.id)}
                className="far fa-trash-alt Skill-delete">
            </i>
            ) : null}
        </li>
    )
}

const mapStateToProps = state => ({
    edit: state.edit
})

const mapDispatchToProps = dispatch => ({
    onDeleteSkill: (id) => dispatch({type: "DELETE_SKILL", id})
})

export default connect(mapStateToProps, mapDispatchToProps)(ListItem)

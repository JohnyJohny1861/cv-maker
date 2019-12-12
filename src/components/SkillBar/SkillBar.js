import React from 'react'
import {connect} from 'react-redux';
import './SkillBar.css';
import ListItem from './ListItem'

const skillBar = (props) => {
    const SkillBarStyle = props.edit ? {
        border: '2px dashed #ff4f4f',
        padding: '10px',
        boxSizing: 'initial',
        transform: 'translateX(-2px)'
    } : {
        border: '2px dashed transparent',
        transform: 'translateX(-2px)'
    }
    const headStyle = props.edit ? {
        borderBottom: 'none'
    } : null

    const skills = props.skills.map(skill => {
        return (
            <ListItem 
                key={skill.id} 
                id={skill.id}
                skillKey={skill.skillKey} 
                skillValue={skill.skillValue}/>
        )
    })
    
    return (
        <div className="SkillBar" style={SkillBarStyle}>
            <div className="SkillBar-head" style={headStyle}>
                <div className="SkillBar-title textChange" title="SkillbarTitle" id={props.skillBar.id}>
                    {props.skillBar.SkillbarTitle}
                </div>
                {props.edit ? 
                    <div className="SkillBar_Control">
                        <i 
                            onClick={props.onAddSkill} 
                            className="fas fa-plus fa-2x SkillBar_Add">
                        </i>
                    </div>
                : null}
            </div>
            <ul className="SkillBar-list">
                {skills}
            </ul>
        </div>
    )
}

const mapStateToProps = state => ({
    edit: state.edit,
    skills: state.skills,
    skillBar: state.skillBar[0]
})

const mapDispatchToProps = dispatch => ({
    onAddSkill: () => dispatch({type: 'ADD_SKILL'})
})

export default connect(mapStateToProps, mapDispatchToProps)(skillBar)

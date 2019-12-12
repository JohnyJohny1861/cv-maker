import React from 'react'
import { connect } from 'react-redux';

import Body from './Body';

import './Wrapper.css'

const Wrapper = (props) => {
    const wrapperStyle = props.edit ? {
        border: '2px dashed #ff4f4f',
        padding: '15px',
        margin: '25px 0',
        boxSizing: 'initial',
        transform: 'translateX(-2px)'
    } : {
        border: '2px dashed transparent',
        transform: 'translateX(-2px)'
    }
    const headStyle = props.edit ? {
        borderBottom: 'none'
    } : null

    let body = []
    if(props.body) {
        body = props.body.map(el => {
            if(props.id === el.wrapperId) {
                return (
                    <Body  
                        wrapperId={props.id} 
                        wrapperBody={el} 
                        key={el.id}/>
                )
            } else return null
        })
    }

    return (
        <div className="Wrapper" style={wrapperStyle}>
            <div className="Wrapper-head" style={headStyle}>
                <div className="Wrapper-title textChange" id={props.id} title="wrapperTitleText">
                    {props.wrapperTitleText}
                </div>
                {props.edit ? 
                    <div className="Wrapper_Control">
                        <i 
                            onClick={()=> props.onAddBody(props.id)} 
                            className="fas fa-plus fa-2x Wrapper_Add">
                        </i>
                        <i
                            onClick={() => props.onDeleteWrapper(props.id)}
                            className="far fa-trash-alt fa-2x Wrapper_Delete">
                        </i>
                    </div>
                : null}
            </div>
            {body}
        </div>
    )
}

const mapStateToProps = state => ({
    edit: state.edit,
    body: state.wrapperBody
});

const mapDispatchToProps = dispatch => ({
    onAddBody: (wrapperId) => dispatch({type: 'ADD_WRAPPER_BODY', wrapperId}),
    onDeleteWrapper: (id) => dispatch({type: 'DELETE_WRAPPER', id})
})

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper)

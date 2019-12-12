import React from 'react'
import {connect} from 'react-redux';
import List from './List';

import './Body.css';

const Body = (props) => {
    const style = props.edit ? {
        border: '2px dashed #c0c0c0',
        margin: '20px 0',
        padding: '45px 3px 3px 3px',
        boxSizing: 'initial',
        transform: 'translateX(-2px)'
    } : {
        border: '2px dashed transparent',
        transform: 'translateX(-2px)'
    }

    const wrapperValueStyle = {
        flex: '0 1 75%'
    }

    return (
        <div className="Wrapper-body" style={style}>
            <div className="Wrapper-key">
                <div 
                    className="Wrapper-key_title textChange" 
                    id={props.wrapperBody.id}
                    title="keyText">{props.wrapperBody.keyText}
                </div>
                <div className="Wrapper-key_subTitle">
                    <span 
                        className="textChange"
                        id={props.wrapperBody.id}
                        title="from">{props.wrapperBody.from}
                    </span> 
                    <i className="fas fa-minus" style={{margin: '0 5px'}}></i> 
                    <span 
                        className="textChange"
                        id={props.wrapperBody.id}
                        title="to">{props.wrapperBody.to}
                    </span>
                </div>
            </div>
            <div className="Wrapper-value" style={wrapperValueStyle}>
                <div className="Wrapper-value_title">
                    <span 
                        className="textChange"
                        id={props.wrapperBody.id}
                        title="valueText">{props.wrapperBody.valueText}
                    </span>
                    {props.edit ? (
                        <i 
                            onClick={()=> props.onAddItem(props.wrapperBody.id)} 
                            className="fas fa-plus AddItem">
                        </i>
                    ) : null}
                </div>
                {props.wrapperBody.subtitle ? <span className="Wrapper-value_subTitle textChange">{props.wrapperBody.subText}:</span> : null}
                <List bodyId={props.wrapperBody.id}/>
            </div>
            {props.edit ? 
                <div className="Body_control">
                    <p 
                        onClick={() => props.onToggleSubtitle(props.wrapperBody.id, props.wrapperId)}
                        className="Body_subtitle">Subtitle</p>
                    <i
                        onClick={() => props.onDeleteBody(props.wrapperId, props.wrapperBody.id)}
                        className="far fa-trash-alt Wrapper_delete">
                    </i>
                </div> : null}
        </div>
    )
}

const mapStateToProps = state => ({
    edit: state.edit
})

const mapDispatchToProps = dispatch => ({
    onToggleSubtitle: (bodyId, wrapperId) => dispatch({type: 'TOGGLE_SUBTITLE', bodyId, wrapperId}),
    onAddItem: (bodyId) => dispatch({type: 'ADD_LIST_ITEM', bodyId}),
    onDeleteBody: (wrapperId, bodyId) => dispatch({type: 'DELETE_WRAPPER_BODY', wrapperId, bodyId})
})
export default connect(mapStateToProps, mapDispatchToProps)(Body)

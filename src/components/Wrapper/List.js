import React from 'react'
import {connect} from 'react-redux';

import './List.css';

const List = (props) => {
    let listRender = []
    if(props.lists) {
        listRender = props.lists.map(el => {
            if(props.bodyId === el.bodyId) {
                return ( 
                    <li 
                        className="List_Item"
                        title="itemText"
                        key={el.id}>
                            <i className="fas fa-minus Iterator"></i>
                            <span 
                                className="textChange"
                                id={el.id}
                                title="itemText">{el.itemText}
                            </span>
                            {props.edit? 
                            <i 
                                onClick={() => props.onDeleteItem(el.id)}
                                className="far fa-trash-alt Item_Remove"></i> : null}
                    </li>
                )
            } else return null
        })
    }
    return (
        <ul className="Wrapper-value_list">
            {listRender}
        </ul>
    )
}

const mapStateToProps = state => ({
    edit: state.edit,
    lists: state.wrapperBodyList
})

const mapDispatchToProps = dispatch => ({
    onDeleteItem: (id) => dispatch({type: 'DELETE_ITEM', id})
})

export default connect(mapStateToProps, mapDispatchToProps)(List)

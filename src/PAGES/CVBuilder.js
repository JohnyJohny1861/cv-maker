import React, {useEffect} from 'react'
import './CVBuilder.css'
import {connect} from 'react-redux';
import * as actions from '../store/actions';

import Edit from '../containers/Edit/Edit';
import Top from '../containers/Top/Top';
import Body from '../containers/Body/Body';

const CVBuilder = (props) => {
    useEffect(() => {
        props.isLoggedIn ? props.onSetCv() : props.onSetDefaultCV()
    }, [props.isLoggedIn])
    const textChangeHandler = (e) => {
    if(e.target.classList.contains('textChange')) {
        function createInput(text) {
        let input = document.createElement('input');
        input.setAttribute('placeholder', text)
        input.setAttribute('type', 'text');
        input.className = 'input';
        return input;
        }
    
        let el = e.target;
    
        // Create Input
        let input = createInput(el.textContent);
    
        // Insert Input Inside an Element
        el.appendChild(input);
    
        // Set Element's position relative 
        el.style.position = 'relative';
    
        // Show focus state and Remove El's Text
        input.focus();
    
        // Update Text and Remove Input
        input.addEventListener('keypress', function(e) {
        if(e.keyCode === 13) {
            if(e.target.value){
            updateText(e.target);
            return;
            }
        }
        });
    }
    }

    const updateText = (input) => {
    let el = input.parentNode;
    if(input.value !== ''){
        if(el.textContent.lastIndexOf(':') !== -1){
        if(input.value.endsWith(':')) { el.textContent = input.value; } 
        else { el.textContent = `${input.value}:`; }  
        } else if(el.textContent.indexOf('-') === 0) {
            el.textContent = `-${input.value}`;
        } else {
            el.textContent = input.value;
        }
    }
    input.remove();
    // console.log(el.title, el.id, el.textContent)
    props.onChangeText(el.title, el.id, el.textContent)

    }
    return (
        <div className="CVBuilder" onDoubleClick={props.edit ? textChangeHandler : null}>
          <Edit />
          <Top/>
          <Body />
        </div>
    )
}

const mapStateToProps = state => ({
    edit: state.edit,
    state: state,
    isLoggedIn: state.isLoggedIn
  })
  
const mapDispatchToProps = dispatch => ({
    onChangeText: (title, id, text) => dispatch({type: 'CHANGE_TEXT', title, id, text}),
    onSetCv: () => dispatch(actions.onSetCV()),
    onSetDefaultCV: () => dispatch(actions.onSetDefaultCV())
})

export default connect(mapStateToProps, mapDispatchToProps)(CVBuilder)

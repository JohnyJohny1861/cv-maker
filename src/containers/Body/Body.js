import React from 'react'
import {connect} from 'react-redux';

import Wrapper from '../../components/Wrapper/Wrapper';
import Skillbar from '../../components/SkillBar/SkillBar';

const Body = (props) => {
  let wrappers = []
  if(props.wrappers) {
    wrappers = props.wrappers.map(el => (
      <Wrapper id={el.id} key={el.id} wrapperTitleText={el.wrapperTitleText}/>
    ))
  }
  const skillBar = props.skillBar.isAdded ? <Skillbar /> : null
  return (
    <div className="Body">
      {skillBar}
      {wrappers}
    </div>
  )
}

const mapStateToProps = state => ({
  wrappers: state.wrappers,
  skillBar: state.skillBar[0]
})

export default connect(mapStateToProps)(Body)

import React from 'react'
import {connect} from 'react-redux'
import './Top.css'
import ImgUpload from '../../components/ImgUpload/ImgUpload';
import Info from '../../components/Info/Info';

const Top = (props) => {
  return (
    <div className="Top">
      <ImgUpload />
      {props.info ? <Info /> : null}
    </div>
  )
}

const mapStateToProps = state => ({
  info: state.infoItems
})

export default connect(mapStateToProps)(Top)
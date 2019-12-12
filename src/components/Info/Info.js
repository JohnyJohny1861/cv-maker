import React from 'react'
import {connect} from 'react-redux'

import './Info.css';

const Info = props => {
    const getInfoFullName = () => {
        return props.info.map((info) => {
            if(info.fullName) {
                return (
                    <h1 
                        title="fullName"
                        id={info.id}
                        key={info.id}
                        className="Info-fullName textChange">{info.fullName}
                    </h1>
                )
            } else return null
        })
    }
    const getInfoItemsHandler = () => {
        return props.info.map((info) => {
            if(!info.fullName) {
                return (
                    <li key={info.id}>
                        <span 
                            className="textChange" 
                            id={info.id}
                            title="infoKey">{info.infoKey}
                        </span>
                        <span 
                            className="textChange" 
                            id={info.id}
                            title="infoValue">{info.infoValue}
                        </span>
                    </li>
                )
            } else return null 
        });
    }

    return (
        <div className="Info">
            {getInfoFullName()}
            <ul className="Info-inlineList">
                {getInfoItemsHandler()}
            </ul>
        </div>
    )
}
const mapStateToProps = state => ({
    info: state.infoItems
})

export default connect(mapStateToProps)(Info);

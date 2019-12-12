import React, {Fragment, useState} from 'react'
import {connect} from 'react-redux'
import {storage} from '../../Firebase/index';

import './ImgUpload.css';

const ImgUpload = (props) => {
    const [prog, setProg] = useState(0);

    const fileSelectedHandler = e => {
        const reader = new FileReader();
            reader.onload = () => {}
        if(e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
            let file = e.target.files[0]

            const uploadTask = storage.ref(`images/${file.name}`).put(file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Progress
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                    setProg(progress)
                },
                (error) => {
                    // Error
                    console.log(error)
                },
                () => {
                    // Complete
                    storage.ref('images').child(file.name).getDownloadURL()
                        .then(url => {
                            props.onSaveUrl(url);
                        })
                }
            )
        }
    }

    return (
        <div className="ImgUpload">
            <input 
                onChange={fileSelectedHandler}
                type="file" 
                className="ImgUpload-file" 
                id="photo"/>
            <label>
                <img src={props.imgSrc} className="ImgUpload-img" id="photo" alt="img"/>
            </label>
            {props.edit ? 
            <Fragment>
                <progress value={prog} max="100"/>
                <div className="Img_control">
                    <label htmlFor="photo">
                        <p>Choose Img</p>
                    </label>
                </div>
            </Fragment> : null}
        </div>
    )
}

const mapStateToProps = state => ({
    imgSrc: state.imgSrc,
    edit: state.edit
})

const mapDispatchToProps = dispatch => ({
    onSaveUrl: (url) => dispatch({type: 'SAVE_URL', url})
})

export default connect(mapStateToProps, mapDispatchToProps)(ImgUpload);

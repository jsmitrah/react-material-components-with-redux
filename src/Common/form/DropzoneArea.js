import React, { Fragment, useState } from 'react';
import Dropzone from 'react-dropzone';
import _map from 'lodash/map';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Attachment from '@material-ui/icons/Attachment';
import Delete from '@material-ui/icons/Delete';
import Person from '@material-ui/icons/Person';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

const DropzoneArea = ({
    parent,
    type,
    fileType,
    t,
    isImageUpload = false,
    showModal,
    fromArt,
    getImageName,
    fromFile,
    singleUpload = false,
    multipleUpload = false,
    setFile,
    setUploadedImg,
    myCallBack,
    ...rest
}) => {
    const [uploadedImg, setuploadedImg] = useState('');
    const [totalUpload, setTotalUpload] = useState('');

    const onDropHere = (type, file, setFile) => {
        setuploadedImg(file);
        var totalUploads = [];
        totalUploads = [...file, ...totalUpload];
        setTotalUpload(totalUploads);
    };
    const onDelete = imageName => {
        let nonDeletedList = [];
        alert('Are you sure you want to delete this image?');
        _map(totalUpload, upload => {
            if (upload.name !== imageName) {
                nonDeletedList.push(upload);
            }
        });
        setTotalUpload(nonDeletedList);
    };
    return (
        <Dropzone multiple={singleUpload ? false : true} onDrop={files => onDropHere(type, files, setFile)} {...rest}>
            {({ getRootProps, getInputProps }) => {
                return (
                    <div {...getRootProps()}>
                        {isImageUpload ? (
                            <Fragment>
                                <input {...getInputProps()} type="file" />

                                {multipleUpload && totalUpload.length ? (
                                    _map(totalUpload, (img, key) => {
                                        return (
                                            <div className="dropzone_area1" key={key}>
                                                <div className="imageCard">
                                                    <div>
                                                        {img.type === 'image/jpeg' || img.type === 'image/png' ? (
                                                            <img
                                                                alt="no logo"
                                                                src={URL.createObjectURL(img)}
                                                                className="artwork-edit-profile"
                                                            />
                                                        ) : (
                                                            <i className="material-icons">
                                                                <InsertDriveFileIcon className="fileIcon" />
                                                            </i>
                                                        )}
                                                    </div>
                                                    <div className="col-md-6 cardName">
                                                        <div className="textWrap">{img.name}</div>
                                                        <div>{img.size}</div>
                                                    </div>
                                                    <div>
                                                        <Delete
                                                            className="deleteBtn"
                                                            onClick={evt => {
                                                                evt.stopPropagation();
                                                                onDelete(img.name);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : singleUpload && uploadedImg && uploadedImg.length ? (
                                    <img
                                        alt="no logo"
                                        src={URL.createObjectURL(uploadedImg[0])}
                                        className="singleImage"
                                    />
                                ) : (
                                    <div>
                                        {singleUpload ? (
                                            <div>
                                                <Person className="singleImgIcon" />
                                            </div>
                                        ) : (
                                            <div className="textAlign py-5 uploadImg">
                                                <div>
                                                    <CloudUploadIcon />
                                                </div>
                                                <Typography variant="subtitle1">Upload image</Typography>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Fragment>
                        ) : (
                            ''
                        )}
                        {fromFile ? (
                            <Fragment>
                                <div className="uploadIcon">
                                    <Attachment />

                                    <span className="artist-basic-description">
                                        <input {...getInputProps()} type="file" />
                                        Drop File
                                    </span>
                                    <u className="dropzone-style">Select File</u>
                                </div>
                                {parent.state[type] && !getImageName
                                    ? _map(parent.state[type], (file, key) => {
                                          return (
                                              <div key={key} className="artist-basic-description">
                                                  {file.name || file.fileName + '   '}
                                              </div>
                                          );
                                      })
                                    : null}
                            </Fragment>
                        ) : (
                            ''
                        )}
                    </div>
                );
            }}
        </Dropzone>
    );
};

export default DropzoneArea;

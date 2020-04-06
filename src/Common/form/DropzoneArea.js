import React, { Fragment, useState } from "react";
import Dropzone from "react-dropzone";
import _map from "lodash/map";
import _filter from "lodash/filter";
import Typography from "@material-ui/core/Typography";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Delete from "@material-ui/icons/Delete";
import Person from "@material-ui/icons/Person";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import Dialog from "../Dialog";
const DropzoneArea = ({ multipleUpload = false, ...rest }) => {
  const [uploadedImg, setuploadedImg] = useState("");
  const [totalUpload, setTotalUpload] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imageName, setImageName] = useState("");

  const onDropHere = file => {
    setuploadedImg(file);
    var totalUploads = [];
    totalUploads = [...file, ...totalUpload];
    setTotalUpload(totalUploads);
  };
  const onOpenWindow = imageName => {
    setDialogOpen(true);
    setImageName(imageName);
  };
  const closeWindow = val => {
    setDialogOpen(val);
  };
  const deleteCOntent = () => {
    let nonDeletedList = [];
    _filter(totalUpload, upload => {
      if (upload.name !== imageName) {
        nonDeletedList.push(upload);
      }
    });
    setTotalUpload(nonDeletedList);
  };
  return (
    <>
      {dialogOpen ? (
        <Dialog
          dialogOpen={dialogOpen}
          closeWindow={closeWindow}
          deleteCOntent={deleteCOntent}
          details={{
            label: "Delete Image",
            message: `Are you sure you want to delete this ${imageName}?`
          }}
        />
      ) : null}
      <Dropzone
        multiple={!multipleUpload ? false : true}
        onDrop={files => onDropHere(files)}
        {...rest}
      >
        {({ getRootProps, getInputProps }) => {
          return (
            <div {...getRootProps()}>
              <Fragment>
                <input {...getInputProps()} type="file" />

                {multipleUpload && totalUpload.length ? (
                  _map(totalUpload, (img, key) => {
                    return (
                      <div className="dropzone_area1" key={key}>
                        <div className="imageCard">
                          <div>
                            {img.type === "image/jpeg" ||
                            img.type === "image/png" ? (
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
                            <div>{`${(img.size / 1024).toFixed(1)} kB`}</div>
                          </div>
                          <div>
                            <Delete
                              className="deleteBtn"
                              onClick={evt => {
                                evt.stopPropagation();
                                onOpenWindow(img.name);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : !multipleUpload && uploadedImg && uploadedImg.length ? (
                  <img
                    alt="no logo"
                    src={URL.createObjectURL(uploadedImg[0])}
                    className="singleImage"
                  />
                ) : (
                  <div>
                    {!multipleUpload ? (
                      <div>
                        <Person className="singleImgIcon" />
                      </div>
                    ) : (
                      <div className="textAlign py-5 uploadImg">
                        <div>
                          <CloudUploadIcon />
                        </div>
                        <Typography variant="subtitle1">
                          Upload image
                        </Typography>
                      </div>
                    )}
                  </div>
                )}
              </Fragment>
            </div>
          );
        }}
      </Dropzone>
    </>
  );
};

export default DropzoneArea;

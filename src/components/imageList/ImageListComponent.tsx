import React from 'react';
import {Grid} from "@mui/material";
import ImageUploading, {ImageListType} from "react-images-uploading";


type PropsType = {
    files: ImageListType,
    setFiles: (value: ImageListType) => void
}

const ImageListComponent = (props: PropsType) => {

    return (
        <Grid>
            <ImageUploading
                multiple
                onChange={(imageList: ImageListType, addUpdateIndex: number[] | undefined)=>{
                    props.setFiles(imageList)
                }}
                value={props.files}
            >
                {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps
                  }) => (
                    <div>
                        <button
                            style={isDragging ? { color: "red" } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Click or Drop here
                        </button>
                        <button onClick={onImageRemoveAll}>Remove all images</button>
                        {Array.from(imageList).map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image.dataURL} alt="" width="100" />
                                <div className="image-item__btn-wrapper">
                                    <button onClick={() => onImageUpdate(index)}>Update</button>
                                    <button onClick={() => onImageRemove(index)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
        </Grid>
    )
}

export default ImageListComponent;
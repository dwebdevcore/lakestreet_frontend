import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

import SignedWaiverDialog from './SignedWaiverDialog';
import {ImageUploadContainer} from '../../Shared/Cloudinary';
import ImageList from "./ImageList";

const styles = theme => ({
    submitWaiver: {
        display: 'flex',
        justifyContent: 'center',
        padding: `${theme.spacing.unit * 2}px 0`
    },
});
const SmileGalleryEditor = ({
                                classes,
                                smileGalleryDialogOpen,
                                onImageChange,
                                onImageCheck,
                                onSmileGalleryDialogToggle,
                                smileGalleryFilename,
                                smileGalleryFile,
                                onSmileGalleryDialogConfirm,
                                cloudinaryImageList,
                                enabledImages
                            }) => {

    return (<div className={classes.root}>
        <ImageUploadContainer onImageChange={onImageChange} imageSrc={smileGalleryFile} fullWidth/>
        {smileGalleryFilename && <div className={classes.submitWaiver}>
            <Button variant="contained" color="primary" onClick={onSmileGalleryDialogToggle}>
                Submit Waiver
            </Button>
        </div>}

        {enabledImages &&
        <ImageList images={cloudinaryImageList} onImageCheck={onImageCheck} enabledImages={enabledImages}/>}
        <SignedWaiverDialog open={smileGalleryDialogOpen}
                            smileGalleryFilename={smileGalleryFilename}
                            onClose={onSmileGalleryDialogToggle}
                            onConfirm={onSmileGalleryDialogConfirm}/>
    </div>);
};

SmileGalleryEditor.propTypes = {
    classes: PropTypes.object.isRequired,
    smileGalleryDialogOpen: PropTypes.bool,
    onImageChange: PropTypes.func,
    onImageCheck: PropTypes.func,
    onSmileGalleryDialogToggle: PropTypes.func,
    onSmileGalleryDialogConfirm: PropTypes.func,
    smileGalleryFilename: PropTypes.string,
    smileGalleryFile: PropTypes.object,
    cloudinaryImageList: PropTypes.array,
    enabledImages: PropTypes.array
};

export default withStyles(styles)(SmileGalleryEditor);

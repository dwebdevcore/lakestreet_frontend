import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import {ImageUploadContainer} from '../../Shared/Cloudinary';
import {cloudinaryConfig} from '../../../config/cloudinary';
import {withRouter} from 'react-router-dom';

const styles = theme => ({
    submitWaiver: {
        display: 'flex',
        justifyContent: 'center',
        padding: `${theme.spacing.unit * 2}px 0`
    },
});
const ExteriorOfficePhotoEditor = ({
                                       classes,
                                       exteriorOfficePhotoFile,
                                       onExteriorOfficePhotoImageChange,
                                       match
                                   }) => {
    let portalId = match.params.id;
    let publicId = portalId ? `${cloudinaryConfig.exteriorOfficePhotoFolder(portalId)}/exterior` : '';
    return (<div className={classes.root}>
            <ImageUploadContainer
                onImageChange={onExteriorOfficePhotoImageChange}
                publicId={publicId}
                imageSrc={exteriorOfficePhotoFile} fullWidth/>
        </div>
    )
};

ExteriorOfficePhotoEditor.propTypes = {
    classes: PropTypes.object.isRequired,
    exteriorOfficePhotoFile: PropTypes.object,
    onExteriorOfficePhotoImageChange: PropTypes.func
};

export default withRouter(withStyles(styles)(ExteriorOfficePhotoEditor));

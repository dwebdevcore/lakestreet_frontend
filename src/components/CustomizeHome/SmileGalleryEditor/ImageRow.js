import React from 'react';
import PropTypes from 'prop-types';
import {ImageWrapper} from '../../Shared/Cloudinary';
import {withStyles} from "@material-ui/core/styles";
import {TextField} from '../../Shared/TextField';
import Checkbox from "@material-ui/core/Checkbox";


const styles = theme => ({
    root: {},
    row: {
        paddingTop: theme.spacing.unit * 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

});

class ImageRow extends React.PureComponent {

    static propTypes = {
        image: PropTypes.object,
        onImageCheck: PropTypes.func,
        classes: PropTypes.object.isRequired,
    };
    handleCheckBoxChange = (e) => {
        this.props.onImageCheck(e, this.props.image);
    };

    render() {
        let {image, checked, classes} = this.props;
        return (
            <div className={classes.row} key={image.public_id}>
                <Checkbox
                    //name={name}
                    checked={checked}
                    color="primary"
                    onChange={this.handleCheckBoxChange}
                />
                <ImageWrapper publicId={image.public_id} previewOnly/>
                <TextField
                    value={image.public_id.split('/').pop()}
                    label='Filename'
                    name='cloudinaryImage'
                    disabled
                />
            </div>
        );
    }
}


export default withStyles(styles)(ImageRow);
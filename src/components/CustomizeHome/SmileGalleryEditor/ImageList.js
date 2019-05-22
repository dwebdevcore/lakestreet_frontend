import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import ImageRow from './ImageRow';

const styles = theme => ({
    root: {},
    row: {
        paddingTop: theme.spacing.unit * 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

});

class ImageList extends React.PureComponent {

    static propTypes = {
        images: PropTypes.array,
        enabledImages: PropTypes.array,
        classes: PropTypes.object.isRequired,
    };
    handleCheckBoxChange = (image) => {
        this.props.onImageCheck(image)
    };

    render() {
        let {images, enabledImages, classes, onImageCheck} = this.props;
        return (
            <div className={classes.root}>
                {
                    images && images.map(image => {
                        return <ImageRow
                            checked={!!enabledImages.filter(i => i.cloudinary_path === image.public_id).length}
                            image={image}
                            key={image.public_id}
                            onImageCheck={onImageCheck}/>
                    })
                }
            </div>
        );
    }
}


export default withStyles(styles)(ImageList);
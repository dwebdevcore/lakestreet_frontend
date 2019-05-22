import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import Dropzone from 'react-dropzone'
import ImageWrapper from './ImageWrapper';
import {classNames} from "../../../helpers/format";

const styles = theme => ({
    dropzone: {
        border: `2px dashed rgb(102,102,102)`,
        width: 200,
        height: 200,
        overflow: 'hidden',
        backgroundColor: theme.color.grey.light,
        [theme.breakpoints.down('md')]: {
            margin: '0 auto'
        },
        /*  [theme.breakpoints.down(theme.customBreakpoints.sm)]: {
              width: 100,
              height: 100,
          }*/
    },
    fullWidth: {
        width: '100%',
        height: 200,
    }
});

class ImageUploadContainer extends React.Component {
    static propTypes = {
        imageSrc: PropTypes.object,
        publicId: PropTypes.string,
        doctor: PropTypes.object,
        aboutYourDentist: PropTypes.bool
    };
    state = {
        imageSrc: ''
    };

    componentDidMount() {
        this.setState({imageSrc: this.props.imageSrc});
    }

    onDrop = (files) => {
        this.setState({
            imageSrc: files[0]
        });
        let props = {};
        if (this.props.aboutYourDentist !== undefined) {
            if (this.props.aboutYourDentist) {
                props.npi = this.props.doctor.npi;
            } else {
                props.team_member_id = this.props.doctor.team_member_id;
            }
        }
        this.props.onImageChange({
            ...props,
            file: files[0]
        });
    };

    render() {
        let {imageSrc} = this.state;
        let {publicId, fullWidth, classes} = this.props;
        let dropzoneClasses = [classes.dropzone];
        if (fullWidth) {
            dropzoneClasses.push(classes.fullWidth);
        }
        return (
            <React.Fragment>
                <Dropzone
                    className={classNames(dropzoneClasses)}
                    onDrop={this.onDrop}
                    multiple={false}
                    accept="image/*">
                    <ImageWrapper
                        publicId={publicId}
                        imageSrc={imageSrc ? imageSrc.preview : null}
                    />
                </Dropzone>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(ImageUploadContainer);
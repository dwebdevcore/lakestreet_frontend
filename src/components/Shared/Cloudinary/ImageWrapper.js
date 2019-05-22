import React from 'react';
import PropTypes from 'prop-types';
import {Image} from 'cloudinary-react';
import {withStyles} from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {cloudinaryConfig} from '../../../config/cloudinary';
import defaultImage from '../../../assets/images/placeholder-image.png';

const styles = theme => ({
    photo: {
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        // width: 140,
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: theme.shape.borderRadius,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: theme.palette.primary.contrastText,
        '& p': {
            fontSize: 12,
            color: theme.palette.primary.contrastText,
        },
        '& img': {
            // height: 200
            width: '100%',
            // maxWidth: 200
        }
    },
    camera: {
        position: 'absolute',
        // backgroundColor: 'rgba(0,0,0,0.7)'
    }
});

class ImageWrapper extends React.PureComponent {

    static propTypes = {
        imageSrc: PropTypes.string,
        classes: PropTypes.object.isRequired,
        publicId: PropTypes.string,
        previewOnly: PropTypes.bool
    };

    render() {
        let {classes, imageSrc, publicId, previewOnly} = this.props;
        /*
        * backgroundImage could be used instead of Cloudinary <Image />
        * to increase performance and decrease render time
        * */
        return (
            <div className={classes.photo}
                //style={{backgroundImage: `url('${publicId}')`}}
            >
                {imageSrc ?
                    <img src={imageSrc} alt={''}/> :
                    <Image
                        cloudName={cloudinaryConfig.cloudName}
                        publicId={publicId}
                        onError={() => {
                            this.img.element.src = defaultImage
                        }}
                        ref={(img) => {
                            this.img = img;
                        }}>
                        >
                        {/*Transformation component slow page performance too much
                           That's why used onError handler above
                        */}
                        {/*<Transformation defaultImage="default"/>*/}
                    </Image>
                }
                {!previewOnly && <div className={classes.camera}>
                    <FontAwesomeIcon icon='camera'/>
                    <Typography component='p'>Change Photo</Typography>
                </div>}
            </div>
        )
    }
}


export default withStyles(styles)(ImageWrapper);
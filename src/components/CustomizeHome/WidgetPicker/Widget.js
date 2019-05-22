import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import {TextField} from '../../Shared/TextField';
import googleMap1 from '../../../assets/images/googleMap1.png';
import googleMap2 from '../../../assets/images/googleMap2.png';
import GoogleMapRow from './GoogleMapRow';
import {SmileGalleryEditor} from '../SmileGalleryEditor';
import {FeaturedServicesEditor} from '../FeaturedServicesEditor';

const styles = theme => ({
    root: {
        '&:nth-of-type(even)': {
            backgroundColor: theme.color.grey.light
        },
        padding: theme.spacing.unit * 2,
    },
    row: {
        marginBottom: theme.spacing.unit * 2,
        width: '100%',
        [theme.breakpoints.up(theme.customBreakpoints.xs)]: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },

    },
    image: {
        height: 75
    },
    label: {
        '& span': {
            fontSize: 16
        }
    },
    description: {
        fontSize: 12,
        '& a': {
            color: theme.palette.primary.main,
            textDecoration: 'none'
        }
    },
    googleMapList: {
        paddingTop: theme.spacing.unit * 5,
        '& label > span': {
            fontSize: 14
        }
    },
    missionStatement: {
        marginTop: theme.spacing.unit * 3,
    }
});

class Widget extends React.PureComponent {
    render() {
        let {
            classes,
            item,
            name,
            checked,
            title,
            image,
            description,
            googleMapSelectedWidget,
            onCheckboxChange,
            onTextChange,
            onImageChange,
            onImageCheck,
            onSmileGalleryDialogConfirm,
            onSmileGalleryDialogToggle,
            smileGalleryDialogOpen,
            smileGalleryFilename,
            cloudinaryImageList,
            enabledImages,
            services,
            featuredServices,
            onFeaturedServicesChange,
            onGoogleMapWidgetRadioChange
        } = this.props;
        return <div className={classes.root}>
            <div className={classes.row}>
                <FormControlLabel
                    className={classes.label}
                    control={
                        <Checkbox
                            name={name}
                            checked={checked}
                            color="primary"
                            onChange={onCheckboxChange}
                        />
                    }
                    label={title}
                />
                {image && <div className={classes.image}><img src={image} alt={title} className={classes.image}/></div>}
            </div>
            <Typography component='p' className={classes.description}>
                {description}
            </Typography>
            {
                name === 'google_block' &&
                <div className={classes.googleMapList}>
                    <GoogleMapRow
                        name='reviews'
                        title={'Google Block - Map / Reviews'}
                        image={googleMap1}
                        googleMapSelectedWidget={googleMapSelectedWidget}
                        onRadioChange={onGoogleMapWidgetRadioChange}
                        value={1}
                    />
                    <GoogleMapRow
                        name='virtual_tour'
                        title={'Google Block - Virtual Tour / Reviews'}
                        image={googleMap2}
                        value={2}
                        googleMapSelectedWidget={googleMapSelectedWidget}
                        onRadioChange={onGoogleMapWidgetRadioChange}
                    />
                    <GoogleMapRow
                        name='virtual_tour'
                        title={'Google Block - Virtual Tour / Map'}
                        image={googleMap2}
                        value={3}
                        googleMapSelectedWidget={googleMapSelectedWidget}
                        onRadioChange={onGoogleMapWidgetRadioChange}
                    />
                </div>
            }
            {
                name === 'mission_statement' &&
                <div className={classes.missionStatement}>
                    <TextField
                        fullWidth
                        value={item.text}
                        name='mission_statement'
                        label='Mission Statement'
                        onChange={onTextChange}
                    />
                </div>
            }
            {
                name === 'smile_gallery' &&
                <SmileGalleryEditor
                    onImageChange={onImageChange}
                    onImageCheck={onImageCheck}
                    onSmileGalleryDialogConfirm={onSmileGalleryDialogConfirm}
                    onSmileGalleryDialogToggle={onSmileGalleryDialogToggle}
                    smileGalleryDialogOpen={smileGalleryDialogOpen}
                    smileGalleryFilename={smileGalleryFilename}
                    cloudinaryImageList={cloudinaryImageList}
                    enabledImages={enabledImages}
                />
            }
            {
                name === 'featured_services' &&
                <FeaturedServicesEditor services={services}
                                        featuredServices={featuredServices}
                                        onFeaturedServicesChange={onFeaturedServicesChange}/>
            }
        </div>
    }
}


Widget.propTypes = {
    item: PropTypes.object,
    name: PropTypes.string,
    title: PropTypes.string,
    googleMapSelectedWidget: PropTypes.number,
    onGoogleMapWidgetRadioChange: PropTypes.func,
    description: PropTypes.any,
    image: PropTypes.string,
    checked: PropTypes.bool,
    onCheckboxChange: PropTypes.func,
    onTextChange: PropTypes.func,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Widget);

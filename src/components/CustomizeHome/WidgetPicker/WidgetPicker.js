import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import Widget from './Widget';
import doctorBio from '../../../assets/images/doctor-bio.png';
import featuredServicesImage from '../../../assets/images/featured-services.png';
import smileGallery from '../../../assets/images/smile-gallery.png';
import meetTheTeam from '../../../assets/images/meet-the-team1.png';

const styles = theme => ({
    root: {
        // display: 'flex',
        // justifyContent: 'space-between'
    },
});
const WidgetPicker = ({
                          classes,
                          widgets,
                          googleMapSelectedWidget,
                          onCheckboxChange,
                          onRadioChange,
                          onTextChange,
                          onImageChange,
                          onImageCheck,
                          onSmileGalleryDialogConfirm,
                          onSmileGalleryDialogToggle,
                          smileGalleryDialogOpen,
                          smileGalleryFilename,
                          cloudinaryImageList,
                          services,
                          featuredServices,
                          onFeaturedServicesChange,
                          onGoogleMapWidgetRadioChange
                      }) => {
    return (
        <div className={classes.root}>
            <Widget
                title='Doctor Bio'
                description='Doctor bio will publish the doctors initial bio and headshot.'
                checked={widgets.doctor_bio.enabled}
                image={doctorBio}
                name='doctor_bio'
                onCheckboxChange={onCheckboxChange}
                onTextChange={onTextChange}
            />
            <Widget
                title='Featured Services'
                description='3 featured services can be selected in the assigned services section.'
                checked={widgets.featured_services.enabled}
                image={featuredServicesImage}
                name='featured_services'
                onCheckboxChange={onCheckboxChange}
                onTextChange={onTextChange}
                onRadioChange={onRadioChange}
                services={services}
                featuredServices={featuredServices}
                onFeaturedServicesChange={onFeaturedServicesChange}
            />
            <Widget
                title='Meet The Team'
                checked={widgets.meet_the_team.enabled}
                image={meetTheTeam}
                name='meet_the_team'
                onCheckboxChange={onCheckboxChange}
                onTextChange={onTextChange}
            />
            <Widget
                title='Smile Gallery'
                description='Make sure there are a minimum of 3 images in the Smile Gallery.'
                checked={widgets.smile_gallery.enabled}
                image={smileGallery}
                name='smile_gallery'
                onCheckboxChange={onCheckboxChange}
                onTextChange={onTextChange}
                smileGalleryDialogOpen={smileGalleryDialogOpen}
                onImageChange={onImageChange}
                onImageCheck={onImageCheck}
                onSmileGalleryDialogConfirm={onSmileGalleryDialogConfirm}
                onSmileGalleryDialogToggle={onSmileGalleryDialogToggle}
                smileGalleryFilename={smileGalleryFilename}
                cloudinaryImageList={cloudinaryImageList}
                enabledImages={widgets.smile_gallery.images}
            />
            <Widget
                title='Google Block - Map/ Reviews'
                description='The map and reviews are the preferred Google block, however there are alternatives for offices with virtual tours.'
                checked={widgets.google_block.enabled}
                name='google_block'
                item={widgets.google_block}
                googleMapSelectedWidget={googleMapSelectedWidget}
                onCheckboxChange={onCheckboxChange}
                onRadioChange={onRadioChange}
                onTextChange={onTextChange}
                onGoogleMapWidgetRadioChange={onGoogleMapWidgetRadioChange}
            />
            <Widget
                title='Mission Statement'
                description='Mission statement of philosophy of the practice. A maximum of 80 characters are allowed'
                checked={widgets.mission_statement.enabled}
                item={widgets.mission_statement}
                name='mission_statement'
                onCheckboxChange={onCheckboxChange}
                onTextChange={onTextChange}
            />
        </div>
    )

};

WidgetPicker.propTypes = {
    widgets: PropTypes.object,
    onRadioChange: PropTypes.func,
    googleMapSelectedWidget: PropTypes.number,
    onGoogleMapWidgetRadioChange: PropTypes.func,
    onCheckboxChange: PropTypes.func,
    onTextChange: PropTypes.func,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WidgetPicker);

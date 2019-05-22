import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";

import {ColorPicker} from './ColorPicker';
import {TemplatePicker} from './TemplatePicker';
import {PromoWidgetSidebar} from './PromoWidgetSidebar';
import {ButtonPicker} from './ButtonPicker';
import {AboutPicker} from './AboutPicker';
import {WidgetPicker} from './WidgetPicker';
import {BrandBadgesPicker} from './BrandBadgesPicker';
import {ExteriorOfficePhotoEditor} from './ExteriorOfficePhotoEditor';
import Panel from './Panel';
import Typography from "@material-ui/core/Typography/Typography";

const styles = theme => ({
    root: {
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    left: {
        width: '100%',
        marginRight: theme.spacing.unit * 2 + theme.spacing.unit / 2,
        [theme.breakpoints.up(theme.customBreakpoints.md)]: {
            maxWidth: theme.centralBlockMaxWidth,
        },
    },
    panel: {
        borderRadius: theme.shape.borderRadius
    },
    summary: {
        backgroundColor: theme.color.grey.light,
        color: theme.color.grey.main,
    },
    title: {
        fontWeight: 700,
        padding: `${theme.spacing.unit * 3}px 0`,
        [theme.breakpoints.up('md')]: {
            display: 'none'
        },
    },
});
const CustomizeHome = ({
                           classes,
                           colors,
                           buttons,
                           templates,
                           accentColor,
                           template,
                           buttonStyle,
                           onRadioChange,
                           widgetsPromo,
                           aboutList,
                           aboutSection,
                           onCheckboxChange,
                           onTextChange,
                           onSortEnd,
                           onBrandBadgeChange,
                           brandBadges,
                           widgets,
                           homeWidgets,
                           googleMapSelectedWidget,
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
                           onGoogleMapWidgetRadioChange,
                           exteriorOfficePhotoFile,
                           onExteriorOfficePhotoImageChange
                       }) => {
    return (<div className={classes.root}>
        <div className={classes.left}>
            <Panel title='Select Template'>
                <TemplatePicker templates={templates} template={template} onRadioChange={onRadioChange}/>
            </Panel>
            <Panel title='Select Accent Color'
                   note='Color Pallettes are determind by your primary brand color, a darker coordinated brand color and a
                tertiary accent color.'>
                <ColorPicker colors={colors} accentColor={accentColor} onRadioChange={onRadioChange}/>
            </Panel>
            <Panel title='Select Button Style'
                   note='The primary button color is based on the brand color and cannot be modified.'>
                <ButtonPicker buttons={buttons} buttonStyle={buttonStyle} onRadioChange={onRadioChange}/>
            </Panel>
            <Panel title='About Section'
                   note='The primary button color is based on the brand color and cannot be modified.'>
                <AboutPicker aboutList={aboutList} selectedAbout={aboutSection} onRadioChange={onRadioChange}/>
            </Panel>
            {template === 'beta' && <Panel title='Exterior Office Photo'>
                <ExteriorOfficePhotoEditor
                    exteriorOfficePhotoFile={exteriorOfficePhotoFile}
                    onExteriorOfficePhotoImageChange={onExteriorOfficePhotoImageChange}/>
            </Panel>}
            <Panel title='Select Widgets to include'
                   note='You may select any of the following widgets, with a maximum of 3 widgets. '>
                <WidgetPicker
                    widgets={widgets}
                    googleMapSelectedWidget={googleMapSelectedWidget}
                    onCheckboxChange={onCheckboxChange}
                    onRadioChange={onRadioChange}
                    onTextChange={onTextChange}
                    onImageChange={onImageChange}
                    onImageCheck={onImageCheck}
                    smileGalleryDialogOpen={smileGalleryDialogOpen}
                    onSmileGalleryDialogConfirm={onSmileGalleryDialogConfirm}
                    onSmileGalleryDialogToggle={onSmileGalleryDialogToggle}
                    smileGalleryFilename={smileGalleryFilename}
                    cloudinaryImageList={cloudinaryImageList}
                    services={services}
                    featuredServices={featuredServices}
                    onFeaturedServicesChange={onFeaturedServicesChange}
                    onGoogleMapWidgetRadioChange={onGoogleMapWidgetRadioChange}
                />
            </Panel>
            <Panel title='Invisalign Preferred'>
                <BrandBadgesPicker brandBadges={brandBadges} onBrandBadgeChange={onBrandBadgeChange}/>
            </Panel>
        </div>
        <Typography className={classes.title} variant="title" gutterBottom>Sort Components</Typography>
        {homeWidgets && <PromoWidgetSidebar onSortEnd={onSortEnd} homeWidgets={homeWidgets}/>}
    </div>);
};

CustomizeHome.propTypes = {
    templates: PropTypes.array.isRequired,
    colors: PropTypes.array.isRequired,
    buttons: PropTypes.array.isRequired,
    widgets: PropTypes.object.isRequired,
    homeWidgets: PropTypes.array,
    accentColor: PropTypes.string.isRequired,
    buttonStyle: PropTypes.string.isRequired,
    template: PropTypes.string.isRequired,
    googleMapSelectedWidget: PropTypes.number.isRequired,
    onGoogleMapWidgetRadioChange: PropTypes.func,
    classes: PropTypes.object.isRequired,
    aboutList: PropTypes.array.isRequired,
    brandBadges: PropTypes.array.isRequired,
    aboutSection: PropTypes.string.isRequired,
    onRadioChange: PropTypes.func,
    onBrandBadgeChange: PropTypes.func,
    onCheckboxChange: PropTypes.func,
    onTextChange: PropTypes.func,
};

export default withStyles(styles)(CustomizeHome);

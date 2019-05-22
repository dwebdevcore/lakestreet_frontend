import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import ImageUploadContainer from '../Shared/Cloudinary/ImageUploadContainer';
import {TextField} from '../Shared/TextField';
import DoctorInfoSection from "../Shared/Doctor/DoctorInfoSection";


const styles = theme => ({
    root: {

        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
        borderBottom: `2px solid ${theme.color.grey.light}`,
        paddingTop: theme.spacing.unit * 4,
        paddingBottom: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 4
    },
    form: {
        width: '100%',
        paddingLeft: theme.spacing.unit * 2
    },
    heading: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 30,
        width: '100%',
        marginBottom: theme.spacing.unit * 3
    },
    quote: {
        marginBottom: 0
    },
    removeMember: {
        color: theme.palette.primary.main,
        cursor: 'pointer'
    }
});
const AddTeamMember = ({classes, addedMember, onTextChange, onImageChange, onRichTextChange}) => (
    <div className={classes.root}>
        <ImageUploadContainer
            // publicId={publicId}
            onImageChange={onImageChange}
        />
        <form className={classes.form}>
            <TextField
                fullWidth
                onChange={onTextChange}
                label='First Name'
                name='firstName'
                value={addedMember.firstName}/>
            <TextField
                fullWidth
                onChange={onTextChange}
                label='Middle Name'
                name='middleName'
                value={addedMember.middleName}/>
            <TextField
                fullWidth
                onChange={onTextChange}
                label='Last Name'
                name='lastName'
                value={addedMember.lastName}/>
            <DoctorInfoSection
                title='Biography'
                value={addedMember.bio}
                name='bio'
                onRichTextChange={onRichTextChange}
             />
        </form>
    </div>
);

AddTeamMember.propTypes = {
    onAddMember: PropTypes.func,
    classes: PropTypes.object.isRequired
};


export default withStyles(styles)(AddTeamMember);
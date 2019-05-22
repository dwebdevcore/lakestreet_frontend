import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from "@material-ui/core/styles";
import ImageUploadContainer from '../Cloudinary/ImageUploadContainer';
import DoctorInfoSection from './DoctorInfoSection';
import {formatName} from '../../../helpers/format';
import {cloudinaryConfig} from "../../../config/cloudinary";

const styles = theme => ({
    root: {
        /*[theme.breakpoints.up('md')]: {
            display: 'flex',
        },*/
        display: 'flex',
        borderBottom: `2px solid ${theme.color.grey.light}`,
        paddingBottom: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 4,
    },
    form: {
        width: '100%',
        paddingLeft: theme.spacing.unit * 2
    },
    heading: {
        [theme.breakpoints.up(theme.customBreakpoints.md)]: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        height: 30,
        width: '100%',
        marginBottom: theme.spacing.unit * 3
    },
    quote: {
        marginBottom: 0
    },
    removeMember: {
        color: theme.palette.primary.main,
        cursor: 'pointer',
        [theme.breakpoints.down(theme.customBreakpoints.sm)]: {
            padding: `${theme.spacing.unit * 3}px 0`
        },
    },
    doctorInfo: {
        [theme.breakpoints.down(theme.customBreakpoints.sm)]: {
            display: 'none'
        },
    },
    doctorInfoMobile: {
        [theme.breakpoints.up(theme.customBreakpoints.sm)]: {
            display: 'none'
        },
    }
});

class Doctor extends React.PureComponent {

    static propTypes = {
        aboutYourDentist: PropTypes.bool,
        onImageChange: PropTypes.func.isRequired,
        onTextChange: PropTypes.func.isRequired,
        onModalOpen: PropTypes.func,
        doctor: PropTypes.object.isRequired,
        doctorBio: PropTypes.object,
        classes: PropTypes.object.isRequired
    };
    handlePropChange = (e) => {
        this.props.onTextChange(this.props.doctor, e.target.name, e.target.value);
    };
    handleModalOpen = () => {
        this.props.onModalOpen(this.props.doctor);
    };
    handleRichTextChange = (name, value) => {
        this.props.onTextChange(this.props.doctor, name, value);
    };

    render() {
        let {portalId, doctor, doctorBio, classes, aboutYourDentist, onImageChange} = this.props;
        let publicId = aboutYourDentist ?
            `${cloudinaryConfig.doctorPhotosFolder}/${doctor.npi}` :
            `${cloudinaryConfig.dentalTeamPhotosFolder(portalId)}/${doctor.team_member_id}`;
        return (
            <React.Fragment>
                <div className={classes.root}>
                    <ImageUploadContainer
                        aboutYourDentist={aboutYourDentist}
                        doctor={doctor}
                        publicId={publicId}
                        onImageChange={onImageChange}
                    />
                    <form className={classes.form}>
                        <div className={classes.heading}>
                            <Typography
                                variant='title'>{`${formatName(doctor.first_name)} ${formatName(doctor.middle_name)} ${formatName(doctor.last_name)}`}</Typography>
                            {!aboutYourDentist &&
                            <div onClick={this.handleModalOpen}
                                 className={classes.removeMember}>Remove Team Member</div>}
                        </div>
                        <div className={classes.doctorInfo}>
                            {
                                (aboutYourDentist && doctorBio) &&
                                <DoctorInfoSection
                                    title='Mission Statement'
                                    value={doctorBio.mission_statement}
                                    name='mission_statement'
                                    handlePropChange={this.handlePropChange}
                                    onRichTextChange={this.handleRichTextChange}
                                />
                            }
                            {
                                doctorBio &&
                                <DoctorInfoSection
                                    title='Biography'
                                    value={doctorBio.biography}
                                    name='biography'
                                    onRichTextChange={this.handleRichTextChange}
                                    handlePropChange={this.handlePropChange}/>
                            }
                        </div>
                    </form>
                </div>
                <div className={classes.doctorInfoMobile}>
                    {
                        (aboutYourDentist && doctorBio) &&
                        <DoctorInfoSection
                            title='Mission Statement'
                            value={doctorBio.mission_statement}
                            name='mission_statement'
                            onRichTextChange={this.handleRichTextChange}
                            handlePropChange={this.handlePropChange}/>
                    }
                    {
                        doctorBio &&
                        <DoctorInfoSection
                            title='Biography'
                            value={doctorBio.biography}
                            name='biography'
                            onRichTextChange={this.handleRichTextChange}
                            handlePropChange={this.handlePropChange}/>
                    }

                </div>
            </React.Fragment>
        )
    }
}


export default withStyles(styles)(Doctor);
import React from 'react';
import PropTypes from 'prop-types';
import Doctor from './Doctor';
import {withStyles} from "@material-ui/core/styles";
import {getItemById} from "../../../selectors/index";

const styles = theme => ({
    root: {
        paddingTop: theme.spacing.unit * 4
    },
});
const DoctorList = ({doctors, doctorBios, classes, onTextChange, onModalOpen, aboutYourDentist, portalId, onImageChange}) => (
    <div className={classes.root}>
        {
            doctors && doctors.map((doctor) => {

                return <Doctor
                    onImageChange={onImageChange}
                    portalId={portalId}
                    onModalOpen={onModalOpen}
                    aboutYourDentist={aboutYourDentist}
                    doctor={doctor}
                    doctorBio={
                        getItemById(doctorBios, aboutYourDentist ?
                            doctor.npi : doctor.team_member_id,
                            aboutYourDentist ? 'npi' : 'team_member_id')}
                    key={`doctor${aboutYourDentist ? doctor.npi : doctor.team_member_id}`}
                    onTextChange={onTextChange}/>
            })
        }
    </div>
);

DoctorList.propTypes = {
    portalId: PropTypes.any,
    aboutYourDentist: PropTypes.bool,
    onImageChange: PropTypes.func.isRequired,
    onTextChange: PropTypes.func.isRequired,
    onModalOpen: PropTypes.func,
    doctors: PropTypes.array.isRequired,
    doctorBios: PropTypes.array,
    classes: PropTypes.object.isRequired
};


export default withStyles(styles)(DoctorList);
import React from 'react';
import PropTypes from 'prop-types';
import AssignedDoctors from './AssignedDoctors';
import {DoctorList} from '../Shared/Doctor';

const AboutYourDentist = ({classes, portalId, doctors, doctorBios, onTextChange, onImageChange}) => (
    <React.Fragment>
        <AssignedDoctors doctors={doctors}/>
        <DoctorList
            onImageChange={onImageChange}
            portalId={portalId}
            doctors={doctors}
            doctorBios={doctorBios}
            onTextChange={onTextChange}
            aboutYourDentist={true}/>
    </React.Fragment>
);

AboutYourDentist.propTypes = {
    onImageChange: PropTypes.func.isRequired,
    onTextChange: PropTypes.func.isRequired,
    doctors: PropTypes.array.isRequired,
    doctorBios: PropTypes.array.isRequired,
};

export default AboutYourDentist;

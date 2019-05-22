import React from 'react';
import PropTypes from 'prop-types';

import {DoctorList} from '../Shared/Doctor';

const AboutYourTeam = ({onImageChange, portalId, classes, doctors, doctorBios, onTextChange, onModalOpen}) => (
    <DoctorList
        aboutYourDentist={false}
        onImageChange={onImageChange}
        portalId={portalId}
        doctorBios={doctorBios}
        doctors={doctors}
        onTextChange={onTextChange} onModalOpen={onModalOpen}/>
);

AboutYourTeam.propTypes = {
    portalId: PropTypes.any,
    onTextChange: PropTypes.func.isRequired,
    onImageChange: PropTypes.func.isRequired,
    onModalOpen: PropTypes.func.isRequired,
    doctors: PropTypes.array.isRequired,
    doctorBios: PropTypes.array.isRequired,
};

export default AboutYourTeam;

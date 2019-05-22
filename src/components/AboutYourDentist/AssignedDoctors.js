import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import {formatName} from '../../helpers/format';
const AssignedDoctors = ({doctors}) => (
    <div>
        <Typography variant='body2'>Assigned Doctors:</Typography>
        <Typography variant='subheading'>{doctors.map((doctor) => `${formatName(doctor.first_name)} ${formatName(doctor.middle_name)} ${formatName(doctor.last_name)}`).join(', ')}</Typography>
    </div>
);

AssignedDoctors.propTypes = {
    doctors: PropTypes.array.isRequired
};

export default AssignedDoctors;
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import {SearchTextField} from '../Shared/SearchTextField';
import SortableDoctorList from "./SortableDoctorList";
import SearchList from "./SearchList";
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: theme.centralBlockMaxWidth,
    },
    sectionTitle: {
        paddingTop: theme.spacing.unit * 6,
        paddingBottom: theme.spacing.unit * 3,
        fontSize: 18
    }
});
const DoctorAssignment = ({
                              classes,
                              doctorAssignmentSearch,
                              doctors,
                              doctorList,
                              onTextChange,
                              toggleDropdown,
                              onSortEnd,
                              searchDropDownOpen,
                              addDoctor,
                              removeDoctor
                          }) => {

    return (<div className={classes.root}>
        <SearchTextField
            onFocus={toggleDropdown}
            onBlur={toggleDropdown}
            placeholder='Find doctor Name OR NPI Number'
            value={doctorAssignmentSearch}
            onChange={onTextChange}
            name='doctorAssignmentSearch'/>
        {(searchDropDownOpen && doctorList.length > 0) && <SearchList items={doctorList} addDoctor={addDoctor}/>}
        <Typography variant="headline" className={classes.sectionTitle}>Currently Assigned Doctors</Typography>
        {doctors && <SortableDoctorList
            distance={1}
            items={doctors}
            removeDoctor={removeDoctor}
            onSortEnd={onSortEnd}/>}
    </div>)
};

DoctorAssignment.propTypes = {
    searchDropDownOpen: PropTypes.bool,
    doctorAssignmentSearch: PropTypes.string,
    doctorList: PropTypes.array.isRequired,
    doctors: PropTypes.array.isRequired,
    onTextChange: PropTypes.func.isRequired,
    addDoctor: PropTypes.func.isRequired,
    removeDoctor: PropTypes.func.isRequired,
    toggleDropdown: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DoctorAssignment);

import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from '../Shared/TextField';
import {SelectField} from '../Shared/SelectField';
import {withStyles} from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import stateList from "./us-state-list";

const styles = theme => ({
    form: {
        width: '100%',
        maxWidth: theme.centralBlockMaxWidth,
    },
    sectionTitle: {
        marginTop: 20,
        marginBottom: 40
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    mapCoords: {
        width: '25%'
    },
    defaultInput: {
        width: '42%'
    }
});
const PracticeMeta = ({classes, containerData, onTextChange}) => (
    <form className={classes.form}>
        <TextField
            fullWidth
            value={containerData.office_name}
            name='office_name'
            label='Practice Name'
            onChange={onTextChange}
        />
        <TextField
            fullWidth
            value={containerData.epicor_id}
            name='epicor_id'
            label='Epicor ID'
            onChange={onTextChange}
        />
        <TextField
            fullWidth
            value={containerData.carecredit_id}
            name='carecredit_id'
            label='Care Credit ID'
            onChange={onTextChange}
        />
        <Typography variant="title" className={classes.sectionTitle}>Location</Typography>
        <TextField
            fullWidth
            value={containerData.street_1}
            name='street_1'
            label='Address'
            onChange={onTextChange}
        />
        <div>
            <TextField
                className={classes.defaultInput}
                value={containerData.postal_code}
                name='postal_code'
                label='Zip Code'
                onChange={onTextChange}
            />
        </div>
        <div className={classes.container}>
            <TextField
                className={classes.defaultInput}
                value={containerData.city}
                name='city'
                label='City'
                onChange={onTextChange}
            />
            <SelectField
                selectOptions={stateList}
                className={classes.defaultInput}
                value={containerData.province_abbr}
                name='province_abbr'
                label='State'
                onChange={onTextChange}
            />
        </div>
        <Typography variant="title" className={classes.sectionTitle}>Google Maps</Typography>
        <div className={classes.container}>
            <TextField
                className={classes.defaultInput}
                value={containerData.hdcid}
                name='hdcid'
                label='Location ID'
                onChange={onTextChange}
            />
            <TextField
                className={classes.mapCoords}
                value={containerData.latitude}
                name='latitude'
                label='Lat'
                onChange={onTextChange}
            />
            <TextField
                className={classes.mapCoords}
                value={containerData.longitude}
                name='longitude'
                label='Lng'
                onChange={onTextChange}
            />
        </div>
        <Typography variant="title" className={classes.sectionTitle}>Telephone</Typography>
        <div className={classes.container}>
            <TextField
                className={classes.defaultInput}
                value={containerData.phone}
                name='phone'
                label='Phone Number'
                onChange={onTextChange}
            />
            <TextField
                className={classes.defaultInput}
                value={containerData.speeddial}
                name='speeddial'
                label='Speed Dial'
                onChange={onTextChange}
            />
        </div>

    </form>
);

PracticeMeta.propTypes = {
    containerData: PropTypes.object.isRequired,
    onTextChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PracticeMeta);

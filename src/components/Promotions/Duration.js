import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root:{
        marginBottom: theme.spacing.unit * 5
    },
    title: {
        fontWeight: 700
    },
    checkBoxGroup:{
        display: 'flex',
        justifyContent: 'space-evenly'
    }
});

const Duration = ({classes, selectedDuration, durationList, onChange}) => (
    <div className={classes.root}>
        <Typography component='h3' className={classes.title}>Incentive Duration</Typography>
        <div className={classes.checkBoxGroup}>
            {
                durationList.map((duration, index) =>
                    <FormControlLabel
                        key={duration + index}
                        control={
                            <Checkbox
                                name='duration'
                                // checked={(selectedDuration === duration)}
                                color="primary"
                                // value={duration}
                                // onChange={onChange}
                            />
                        }
                        label={`${duration} days`}
                    />)
            }

        </div>
    </div>
);


Duration.propTypes = {
    selectedDuration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    durationList: PropTypes.array,
    onChange: PropTypes.func,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Duration);

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import About from './About';

const styles = theme => ({
    about: {
        justifyContent: 'space-between',
        [theme.breakpoints.up(theme.customBreakpoints.xs)]: {
            display: 'flex',
        },
    },
});
const AboutPicker = ({classes, aboutList, selectedAbout, onRadioChange}) => (
    <div className={classes.about}>
        {
            aboutList.map((about, index) =>
                <About
                    key={about.title + index}
                    about={about}
                    selectedAbout={selectedAbout}
                    onRadioChange={onRadioChange}
                />
            )
        }
    </div>
);

AboutPicker.propTypes = {
    aboutList: PropTypes.array.isRequired,
    selectedAbout: PropTypes.string.isRequired,
    onRadioChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AboutPicker);

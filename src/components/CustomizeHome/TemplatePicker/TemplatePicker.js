import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import Template from './Template';

const styles = theme => ({
    templates: {
        [theme.breakpoints.up(theme.customBreakpoints.sm)]: {
            display: 'flex',
            justifyContent: 'space-around'
        },
    },
});
const TemplatePicker = ({classes, templates, template, onRadioChange}) => (
    <div className={classes.templates}>
        {
            templates.map((templateItem, index) =>
                <Template
                    key={templateItem.title + index}
                    template={template}
                    templateItem={templateItem}
                    onRadioChange={onRadioChange}
                />
            )
        }
    </div>
);

TemplatePicker.propTypes = {
    templates: PropTypes.array.isRequired,
    template: PropTypes.string.isRequired,
    onRadioChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TemplatePicker);

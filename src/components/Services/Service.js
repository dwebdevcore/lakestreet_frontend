import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ServiceSubList from './ServiceSubList';

const styles = theme => ({
    panel: {
        borderRadius: theme.shape.borderRadius,
        border: `2px solid ${theme.color.grey.light}`,
        boxShadow: 'none',
        marginBottom: theme.spacing.unit * 5
    },
    summary: {
        backgroundColor: theme.color.grey.light
    },
    noServices: {
        color: theme.palette.primary.main,
        paddingTop: theme.spacing.unit * 2
    }
});

class Service extends React.PureComponent {
    static propTypes = {
        onChange: PropTypes.func,
        service: PropTypes.object,
        classes: PropTypes.object
    };
    handleLabelClick = e => e.stopPropagation();
    handleCheckBoxChange = (e) =>{
        this.props.onChange(e);
    };
    render() {
        let {service, classes, onChange} = this.props;
        return <ExpansionPanel className={classes.panel} defaultExpanded>
            <ExpansionPanelSummary className={classes.summary} expandIcon={<FontAwesomeIcon icon='chevron-down'/>}>
                <FormControlLabel
                    onClick={this.handleLabelClick}
                    control={
                        <Checkbox
                            name={`taxonomy_id_${service.taxonomy_id}`}
                            checked={service.enabled}
                            color="primary"
                            onChange={this.handleCheckBoxChange}
                        />
                    }
                    label={<Typography variant='title'>{service.text}</Typography>}
                />
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                {service.children &&
                    <ServiceSubList items={service.children} parentService={service} onChange={onChange}/>
                }
            </ExpansionPanelDetails>
        </ExpansionPanel>;
    }
}

export default withStyles(styles)(Service);
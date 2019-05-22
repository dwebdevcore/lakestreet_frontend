import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
    listItem: {
        paddingLeft: theme.spacing.unit * 2,
        '&:nth-child(even)': {
            backgroundColor: theme.color.grey.light,
            paddingLeft: theme.spacing.unit * 2
        }
    },
    listLabel: {
        width: '100%'
    }
});


class ServiceSubList extends React.Component {
    static propTypes = {
        parentService: PropTypes.object,
        service: PropTypes.object,
        classes: PropTypes.object,
        onChange: PropTypes.func,
    };
    shouldComponentUpdate(nextProps, nextState){
        return this.props.service.enabled !== nextProps.service.enabled;
    }
    handleCheckBoxChange = (e) =>{
       this.props.onChange(e, this.props.parentService.taxonomy_id);
    };
    render() {
        let {service, classes} = this.props;
        return (<li className={classes.listItem}>
            <FormControlLabel className={classes.listLabel}
                              control={
                                  <Checkbox
                                      name={`taxonomy_id_${service.taxonomy_id}`}
                                      checked={service.enabled}
                                      color="primary"
                                      onChange={this.handleCheckBoxChange}
                                  />
                              }
                              label={service.text}
            />
        </li>);
    }
}

export default withStyles(styles)(ServiceSubList);
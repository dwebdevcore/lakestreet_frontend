import React from 'react';
import PropTypes from 'prop-types';
import PromotionForm from './PromotionForm';
import Typography from '@material-ui/core/Typography';
import {withStyles} from "@material-ui/core/styles";
import {dateToEpoch} from "../../helpers/format";

const styles = theme => ({
    title: {
        paddingTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 5,
    },

});

class Promotion extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        locations: PropTypes.array.isRequired,
        durationList: PropTypes.array.isRequired,
        onSchedule: PropTypes.func,
        promotion: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired
    };
    state = {
        reg_price: 0,
        campaign_name: "",
        call_to_action: "",
        promo_location: "homepage",
        stop: 1537284772,
        start: 1537284772,
        disclaimer: "",
    };
    componentDidMount() {
        this.setState(this.props.promotion);
    }

    componentWillReceiveProps(nextProps) {
        let {promotion} = nextProps;
        if (promotion && (promotion !== this.state.promotion)) {
            this.setState(promotion);
        }
    }
    handleDateChange = (date) => {
        this.setState({start: dateToEpoch(date)});
    };
    handleOnChange = (e) => {
        let value = (e.target.type === 'checkbox' && !e.target.value) ? e.target.checked : e.target.value;
        this.setState({[e.target.name]: value});
    };

    handleSchedule = (e) => {
        e.preventDefault();
        this.props.onSchedule(this.state);
    };

    render() {
        let {classes, locations, durationList, index} = this.props;
        return (
            <div className={classes.root}>
                <Typography variant='title' component='h2'
                            className={classes.title}>{`Incentive ${index + 1}`}</Typography>
                <PromotionForm
                    durationList={durationList}
                    locations={locations}
                    promotion={this.state}
                    handleSchedule={this.handleSchedule}
                    onChange={this.handleOnChange}
                    onDateChange={this.handleDateChange}/>
            </div>
        );
    }
}

export default withStyles(styles)(Promotion);
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import Promotion from "./Promotion";

const styles = theme => ({
    panel: {
        borderRadius: theme.shape.borderRadius,
        border: `2px solid ${theme.color.grey.light}`,
        boxShadow: 'none'
    },
    summary: {
        backgroundColor: theme.color.grey.light
    },
    list: {
        listStyleType: 'none',
        width: '100%',
        '& li': {
            paddingLeft: theme.spacing.unit * 2
        },
        '& li:nth-child(even)': {
            backgroundColor: theme.color.grey.light,
            paddingLeft: theme.spacing.unit * 2
        }
    },
    listLabel: {
        width: '100%'
    }
});
const Promotions = ({durationList, promotions, locations, onChange, onDateChange,onSchedule, classes}) =>
    <React.Fragment>
        {
            promotions && promotions.map((promotion, i) =>
                <Promotion
                    index={i}
                    durationList={durationList}
                    locations={locations}
                    onSchedule={onSchedule}
                    onChange={onChange}
                    onDateChange={onDateChange}
                    promotion={promotion}
                    key={'promo' + promotion.id}/>)
        }
    </React.Fragment>;

Promotions.propTypes = {
    onSchedule: PropTypes.func,
    promotions: PropTypes.array,
    classes: PropTypes.object
};
export default withStyles(styles)(Promotions);
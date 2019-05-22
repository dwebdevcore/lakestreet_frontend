import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {classNames} from '../../../helpers/format'

const styles = theme => ({
    root: {
        listStyleType: 'none',
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing.unit / 2,
        marginBottom: theme.spacing.unit / 2,
        minHeight: 60,
        padding: theme.spacing.unit / 2,
        position: 'relative',
        textAlign: 'center'
    },
    withBorder: {
        border: `2px dashed ${theme.color.grey.main}`,
    },
    img: {
        width: '100%',
        maxWidth: 200
    },
    icon: {
        width: 30,
        minWidth: 30,
        height: 30,
        border: `2px solid ${theme.color.grey.main}`,
        boxSizing: 'border-box',
        backgroundColor: theme.color.grey.light,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        // top: '40%',
        right: -16,
        cursor: 'pointer',
        '& svg': {
            color: theme.color.grey.main
        }
    }
});

const ListItem = ({name, image, classes, isPromo}) => {

    let rootClasses = [classes.root];
    if (!isPromo) {
        rootClasses.push(classes.withBorder);
    }
    return (
        <li className={classNames(rootClasses)}>
            <img src={image} className={classes.img} alt={name}/>
            {!isPromo && <div className={classes.icon}>
                <FontAwesomeIcon icon="arrows-alt-v"/>
            </div>}
        </li>
    )
};


ListItem.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.any,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListItem);

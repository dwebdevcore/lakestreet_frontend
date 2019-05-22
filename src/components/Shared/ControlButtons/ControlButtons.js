import React from 'react';
import {Button} from '../Button';
import MaterialButton from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from "@material-ui/core/styles";
import {classNames} from "../../../helpers/format";
//import {endPoints} from '../../../config/api';

const styles = theme => ({
    root: {
        marginBottom: theme.spacing.unit * 6,
        [theme.breakpoints.up(theme.customBreakpoints.sm)]: {
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'baseline',
            justifyContent: 'flex-end',
        },
    },
    buttons: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'flex-end',
    },
    button: {
        margin: theme.spacing.unit,
        textTransform: 'capitalize',
    },
    title: {
        fontWeight: 700
    },
    hasTitle: {
        justifyContent: 'space-between',
    },
    previewWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    buttonProgress: {
    },
});
const ControlButtons = ({title, office, onSaveDraft, onPreview, onPublish, classes, loading}) => {
    let rootClasses = [classes.root];
    if (title) {
        rootClasses.push(classes.hasTitle);
    }
    return (
        <div className={classNames(rootClasses)}>
            <div className={classes.buttons}>
                <Button color='additional' text='Save' onClick={onSaveDraft}/>
                <div className={classes.previewWrapper}>
                    {office && <MaterialButton
                        onClick={onPreview}
                        className={classes.button}
                        // href={`${endPoints.PREVIEW(office.content_url, office.tld)}`}
                        // target='_blank'
                        color='secondary'
                        disabled={loading}
                        variant='contained'>
                        Preview
                    </MaterialButton>}
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
            </div>
            {title && <Typography className={classes.title} variant="title" gutterBottom>{title}</Typography>}
        </div>
    )
};

ControlButtons.propTypes = {
    title: PropTypes.string,
    onSaveDraft: PropTypes.func,
    onPreview: PropTypes.func,
    onPublish: PropTypes.func,
    classes: PropTypes.object.isRequired,
    office: PropTypes.object,
};
export default withStyles(styles)(ControlButtons);

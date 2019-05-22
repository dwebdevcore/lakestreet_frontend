import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import RichTextEditor from "../RichTextEditor/RichTextEditor";

const styles = theme => ({
    title: {
        fontWeight: 700,
        marginTop: theme.spacing.unit * 2,
    },
    textarea: {
        backgroundColor: theme.color.grey.light,
        '& textarea': {
            padding: theme.spacing.unit,
        }
    },
    helper: {
        textAlign: 'right'
    }
});

class DoctorInfoSection extends React.PureComponent {
    static propTypes = {
        title: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        handlePropChange: PropTypes.func,
        classes: PropTypes.object.isRequired
    };
    state = {
        limit: 250,
        remainingWords: 250,
    };


    render() {
        let {classes, value, title, name, /*handlePropChange,*/ onRichTextChange} = this.props;

        return (
            <React.Fragment>
                <Typography variant='title' gutterBottom className={classes.title}>{title}</Typography>
                <RichTextEditor
                    value={value}
                    name={name}
                    onChange={onRichTextChange}
                    wordsLimit={250}
                />
            </React.Fragment>
        )
    }
}


export default withStyles(styles)(DoctorInfoSection);
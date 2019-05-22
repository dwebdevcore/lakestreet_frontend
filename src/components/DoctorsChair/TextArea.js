import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import MaterialTextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = theme => ({
    textarea: {
        backgroundColor: theme.color.grey.light,
        '& textarea': {
            padding: theme.spacing.unit
        }
    },
    helper: {
        textAlign: 'right'
    }
});

class TextArea extends React.Component {
    static propTypes = {
        comment: PropTypes.object.isRequired,
        dentistChairDoctors: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired,
        classes: PropTypes.object.isRequired
    };
    state = {
        limit: 200,
        remainingWords: 200,
    };

    componentDidMount() {
        this.checkLimit();
    }

    countWords = (str) => {
        return str.trim().split(/\s+/).length;
    };
    checkLimit = () => {
        let {comment, dentistChairDoctors} = this.props;
        let source = dentistChairDoctors[comment.npi].dentist_chair_items[comment.taxonomy_id];
        if (!source) {
            return 0;
        }
        let text = source.text;

        let words = this.countWords(text);
        this.setState({
            remainingWords: this.state.limit - words
        });
        return words === this.state.limit;
    };

    handlePropChange = (e) => {
        let value = e.target.value;
        /*     if (this.countWords(value) >= this.state.limit) {
                 //handle CTRL+V event and cut words by a limit
                 value = e.target.value.split(' ').splice(0, this.state.limit).join(' ');
             }*/

        this.props.onChange(this.props.comment, value);
    };

    handleOnKeyDown = e => {
        if ((this.checkLimit()) && e.keyCode !== 8) {
            e.preventDefault();
        }
    };

    render() {

        let {comment, classes, dentistChairDoctors} = this.props;

        let text = '';
        if (dentistChairDoctors[comment.npi]) {
            if (dentistChairDoctors[comment.npi].dentist_chair_items[comment.taxonomy_id]) {
                text = dentistChairDoctors[comment.npi].dentist_chair_items[comment.taxonomy_id].text;
            }
        }

        return (

            <React.Fragment>
                <MaterialTextField
                    fullWidth
                    multiline
                    name='text'
                    placeholder='From the Doctors Chair'
                    rows={8}
                    value={text}
                    onKeyDown={this.handleOnKeyDown}
                    onChange={this.handlePropChange}
                    className={classes.textarea}
                />
                <FormHelperText className={classes.helper} error={this.state.remainingWords <= 5}>
                    {`${this.state.remainingWords} words remaining`}
                </FormHelperText>
            </React.Fragment>
        )
    }
}


export default withStyles(styles)(TextArea);

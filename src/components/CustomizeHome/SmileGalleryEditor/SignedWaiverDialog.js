import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";


class SignedWaiverDialog extends React.Component {

    static propTypes = {
        title: PropTypes.string,
        open: PropTypes.bool,
        onClose: PropTypes.func,
        onConfirm: PropTypes.func
    };
    handleClose = () => {
        this.props.onClose(null);
    };

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <form onSubmit={this.props.onConfirm}>
                    <DialogTitle id="alert-dialog-title">
                        <Typography variant="title" component='p'>Signed Waiver</Typography>
                        <Typography component='p'>You must have a signed waver/release from patient to use their
                            images.</Typography>
                    </DialogTitle>
                    <DialogContent>
                        <FormControlLabel
                            control={<Checkbox color="primary" required/>}
                            label='I have a signed waiver from a patient.'/>
                        <Typography variant="title">Upload Code:</Typography>
                        <Typography variant="display1">{this.props.smileGalleryFilename}</Typography>
                        <FormControlLabel
                            control={<Checkbox color="primary" required/>}
                            label='I have copied the upload code onto the signed waiver.'/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            No
                        </Button>
                        <Button color="primary" autoFocus type="submit">
                            Yes
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

export default SignedWaiverDialog;
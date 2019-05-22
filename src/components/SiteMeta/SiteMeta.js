import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from '../Shared/TextField';
import {withStyles} from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import {socialIcons} from '../../helpers/fontAwesomeIcons';

const styles = theme => ({
    form: {
        width: '100%',
        maxWidth: theme.centralBlockMaxWidth,
    },
    sectionTitle: {
        marginTop: 20,
        marginBottom: 40
    }
});
const SiteMeta = ({classes, containerData, onTextChange}) => (
    <form className={classes.form}>
        <TextField
            fullWidth
            // value={containerData.metaTitle}
            name='metaTitle'
            label='Meta Title'
            //onChange={onTextChange}
        />
        <TextField
            fullWidth
            // value={containerData.metaDescription}
            name='metaDescription'
            label='Meta Description'
            // onChange={onTextChange}
        />
        <Typography variant="title" className={classes.sectionTitle}>Social Media</Typography>
        <TextField
            fullWidth
            icon={socialIcons.faFacebookSquare}
            value={containerData.facebook_url}
            name='facebook_url'
            label='Enter Facebook URL'
            onChange={onTextChange}
        />
        <TextField
            fullWidth
            icon={socialIcons.faTwitter}
            value={containerData.twitter_url}
            name='twitter_url'
            label='@twitterprofile'
            onChange={onTextChange}
        />
        <TextField
            fullWidth
            icon={socialIcons.faInstagram}
            className={classes.textField}
            value={containerData.instagram_url}
            name='instagram_url'
            label='Enter Instagram URL'
            onChange={onTextChange}
        />
        <TextField
            fullWidth
            icon={socialIcons.faYoutube}
            value={containerData.youtube_url}
            name='youtube_url'
            label='Enter Youtube Channel'
            onChange={onTextChange}
        />
        <TextField
            fullWidth
            icon={socialIcons.faSnapchatGhost}
            className={classes.textField}
            value={containerData.snapchat_url}
            name='snapchat_url'
            label='Enter Snapchat'
            onChange={onTextChange}
        />
        {/* <TextField
            fullWidth
            icon={socialIcons.faBloggerB}
            value={containerData.blogger}
            name='blogger'
            label='Enter Personal Blog'
            onChange={onTextChange}
        />*/}
    </form>
);

SiteMeta.propTypes = {
    containerData: PropTypes.object.isRequired,
    onTextChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SiteMeta);

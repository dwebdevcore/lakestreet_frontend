import React from 'react';
import PropTypes from 'prop-types';
import {ControlButtonsContainer} from '../components/Shared/ControlButtons';
import {SiteMeta} from '../components/SiteMeta';
import {MetaContainerHOC} from "./MetaContainerHOC";

class SiteMetaContainer extends React.Component {
    static propTypes = {
        onTextChange: PropTypes.func,
        onSaveDraft: PropTypes.func,
        onPreview: PropTypes.func,
        onPublish: PropTypes.func,
        currentPortalMetadata: PropTypes.object
    };

    render() {
        return (
            <React.Fragment>
                <ControlButtonsContainer
                    title='Site Meta'
                    onSaveDraft={this.props.onSaveDraft}
                    onPreview={this.props.onPreview}
                    onPublish={this.props.onPublish}
                />
                <SiteMeta containerData={this.props.currentPortalMetadata}
                          onTextChange={this.props.handleTextChange}/>
                <ControlButtonsContainer
                    onSaveDraft={this.props.onSaveDraft}
                    onPreview={this.props.onPreview}
                    onPublish={this.props.onPublish}
                />
            </React.Fragment>
        );
    }
}


export default MetaContainerHOC(SiteMetaContainer);

import React from 'react';
import PropTypes from 'prop-types';
import {ControlButtonsContainer} from '../components/Shared/ControlButtons';
import {PracticeMeta} from '../components/PracticeMeta';
import {MetaContainerHOC} from './MetaContainerHOC';

class PracticeMetaContainer extends React.Component {
    static propTypes = {
        selectedOffice: PropTypes.object,
        currentPortalMetadata: PropTypes.object,
        onTextChange: PropTypes.func,
        onSaveDraft: PropTypes.func,
        onPreview: PropTypes.func,
        onPublish: PropTypes.func,
    };

    render() {

        return (
            <React.Fragment>
                <ControlButtonsContainer
                    title='Practice Meta'
                    onSaveDraft={this.props.onSaveDraft}
                    onPreview={this.props.onPreview}
                    onPublish={this.props.onPublish}
                />
                <PracticeMeta containerData={this.props.currentPortalMetadata}
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

export default MetaContainerHOC(PracticeMetaContainer);
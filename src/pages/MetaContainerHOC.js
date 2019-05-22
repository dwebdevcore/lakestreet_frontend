import React from "react";
import {loadMetadata, updateMetadata} from "../redux/actions/actionCreators";

import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {getItemsByPortalId} from '../selectors/index';
import {withAuth} from '../components/Auth';
export const MetaContainerHOC = WrappedComponent => {
    class MetaHOC extends React.Component {
        state = {
            // metaTitle: '',
            // metaDescription: '',
            // metaKeywords: '',
            facebook_url: '',
            twitter_url: '',
            instagram_url: '',
            youtube_url: '',
            snapchat_url: '',
            //blogger: '',
            office_name: '',
            epicor_id: '',
            carecredit_id: '',
            street_1: '',
            postal_code: '',
            city: '',
            province_abbr: '',
            hdcid: '',
            latitude: '',
            longitude: '',
            phone: '',
            speeddial: '',
        };

        componentDidMount() {
            let portalId = this.props.match.params.id;
            if (portalId && !this.props.currentPortalMetadata) {
                this.props.loadMetadata(portalId);
            } else {
                this.setState(this.props.currentPortalMetadata);
            }

        }

        componentWillReceiveProps(nextProps) {
            let {currentPortalMetadata} = nextProps;
            if (currentPortalMetadata && (currentPortalMetadata !== this.state.currentPortalMetadata)) {
                this.setState(currentPortalMetadata);
            }
        }

        handleSaveDraft = () => {
            console.log('handle save draft');
            this.props.updateMetadata({
                portal_id: this.props.match.params.id,
                item: this.state
            });
        };
        handlePreview = () => {
            console.log('handle preview');
        };
        handlePublish = () => {
            console.log('handle publish');
        };
        handleTextChange = (e) => {
            this.setState({[e.target.name]: e.target.value});
        };

        render() {
            //{...this.props} passing to pass match prop
            return (
                <WrappedComponent
                    {...this.props}
                    onSaveDraft={this.handleSaveDraft}
                    onPreview={this.handlePreview}
                    onPublish={this.handlePublish}
                    handleTextChange={this.handleTextChange}
                    currentPortalMetadata={this.state} /*{...this.props}*/ />
            );
        }
    }

    const mapStateToProps = (state, routerProps) => {

        let portalId = routerProps.match.params.id;

        return {
            currentPortalMetadata: getItemsByPortalId(state.metadata, portalId),
        };
    };
    const mapDispatchToProps = dispatch => {
        return bindActionCreators({
            loadMetadata,
            updateMetadata,
        }, dispatch);
    };

    return withAuth(connect(mapStateToProps, mapDispatchToProps)(MetaHOC));
};
export default MetaContainerHOC;

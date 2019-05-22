import React from 'react';
import {Promotions} from '../components/Promotions';
import {bindActionCreators} from "redux";
import {loadPromotions, savePromotion} from "../redux/actions/actionCreators";
import {connect} from "react-redux";
import {getItemsByPortalId} from "../selectors/index";
import {withAuth} from '../components/Auth';
class PromotionsContainer extends React.Component {
    static propTypes = {};
    state = {
        locations: [
            {option: 'homepage', label: 'homepage'},
            {option: 'sitewide', label: 'sitewide'},
            {option: 'targeted', label: 'targeted'}
        ],
        durationList: ['30', '60', '90'],
        promotions: []
    };

    componentDidMount() {
        let portalId = this.props.match.params.id;
        if (portalId && !this.props.promotions) {
            this.props.loadPromotions(portalId);
        }
        else {
            this.setState({promotions: this.props.promotions});
        }
    }

    componentWillReceiveProps(nextProps) {
        let {promotions} = nextProps;
        if (promotions && (promotions !== this.state.promotions)) {
            this.setState({promotions: [...promotions]});
        }
    }

    handleSchedule = (item) => {
        let portalId = this.props.match.params.id;
        this.props.savePromotion({portal_id: portalId, item});
    };

    render() {
        return (
            <Promotions
                onSchedule={this.handleSchedule}
                locations={this.state.locations}
                durationList={this.state.durationList}
                promotions={this.state.promotions}
            />
        );
    }
}

const mapStateToProps = (state, routerProps) => {

    let portalId = routerProps.match.params.id;

    return {
        promotions: getItemsByPortalId(state.promotions, portalId),
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        loadPromotions,
        savePromotion
    }, dispatch);
};
export default withAuth(connect(mapStateToProps, mapDispatchToProps)(PromotionsContainer));
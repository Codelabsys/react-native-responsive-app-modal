import React, { Component } from 'react';
import {
    View,
    Platform,
    I18nManager
} from 'react-native';
import Modalbox from 'react-native-modalbox';
import RootSiblings from 'react-native-root-siblings';
import Dimensions from 'Dimensions';

var ResponsiveAppModal = React.createClass({
    propTypes: {
        ...Modalbox.propTypes,
        screenHeight: React.PropTypes.number,
        screenWidth: React.PropTypes.number,
        verticalMargin: React.PropTypes.number,
        horizontalMargin: React.PropTypes.number,
        sizeMatching: React.PropTypes.oneOf(['content', 'screen']).isRequired
    },
    getInitialState: function () {
        const { width, height } = Dimensions.get('window');
        return {
            width: width,
            height: height,
        };
    },
    getDefaultProps() {
        return {
            swipeToClose: false,
            backButtonClose: true,
            isOpen: false,
            style: {
                height: null,
                width: null
            }
        };
    },
    componentWillMount() {
        this.modal = new RootSiblings(this.renderModal(this.props, this.state));
        if (typeof Dimensions.addEventListener === 'function')
            Dimensions.addEventListener('change', this._dimensionsChanged);
    },
    componentWillUpdate(nextProps, nextState) {
        this.modal.update(this.renderModal(nextProps, nextState));
    },
    componentWillUnmount() {
        this.modal.destroy();
        this.modal = null;

        if (typeof Dimensions.addEventListener === 'function')
            Dimensions.removeEventListener('change', this._dimensionsChanged);
    },
    _dimensionsChanged(Dimensions) {
        const { width, height } = Dimensions.window;

        let newDimensions = {
            width: width,
            height: height,
        }
        if (newDimensions.width != this.state.width || newDimensions.height != this.state.height) {
            this.setState(newDimensions);
        }
    },
    _renderAndroid(props, state) {
        let { screenHeight, screenWidth, verticalMargin, horizontalMargin, sizeMatching, style } = this.props;
        if (!screenHeight >= 0 || !screenHeight >= 0) {
            let { width, height } = state;
            screenWidth = width;
            screenHeight = height;
        }
        verticalMargin = verticalMargin || 0;
        horizontalMargin = horizontalMargin || 0;
        let containerStyle = style || {};

        let preparedStyle = {};
        if (sizeMatching == 'screen')
            preparedStyle = { height: screenHeight - (verticalMargin * 2), width: screenWidth - (horizontalMargin * 2) }
        else
            preparedStyle = { maxHeight: screenHeight - (verticalMargin * 2), width: screenWidth - (horizontalMargin * 2) }

        return (
            <Modalbox {...props} style={[{ height: null, width: null, alignSelf: I18nManager.isRTL ? 'flex-end' : 'flex-start' }, containerStyle]}>
                <View style={preparedStyle}>
                    {props.children}
                </View>
            </Modalbox>
        );
    },
    _renderIOS(props, state) {
        let { screenHeight, screenWidth, verticalMargin, horizontalMargin, sizeMatching, style } = props;
        if (!screenHeight >= 0 || !screenHeight >= 0) {
            let { width, height } = state;
            screenWidth = width;
            screenHeight = height;
        }
        verticalMargin = verticalMargin || 0;
        horizontalMargin = horizontalMargin || 0;
        let containerStyle = style || {};

        let preparedStyle = {};
        if (sizeMatching == 'screen')
            preparedStyle = { height: screenHeight - (verticalMargin * 2), width: screenWidth - (horizontalMargin * 2), alignSelf: I18nManager.isRTL ? 'flex-end' : 'flex-start' }
        else
            preparedStyle = { height: null, maxHeight: screenHeight - (verticalMargin * 2), width: screenWidth - (horizontalMargin * 2), alignSelf: I18nManager.isRTL ? 'flex-end' : 'flex-start' }
        return (
            <Modalbox {...props} style={[preparedStyle, containerStyle]}>
                {props.children}
            </Modalbox>
        );
    },
    renderModal(props, state) {
        return Platform.select({
            ios: this._renderIOS(props, state),
            android: this._renderAndroid(props, state),
        })
    },
    render() {
        //the render function is not used, instead
        return (<View></View>);
    }
});

module.exports = ResponsiveAppModal;
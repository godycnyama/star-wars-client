import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const TransitionedPage = (WrappedComponent: any) => {
    const TransitionedComponent = (props: any) => (
        <ReactCSSTransitionGroup
                    transitionAppear={true}
                    transitionAppearTimeout={600}
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={200}
                    transitionName="slide">
                    <WrappedComponent {...props} />
        </ReactCSSTransitionGroup>
    );
    return TransitionedComponent;
};

export default TransitionedPage;
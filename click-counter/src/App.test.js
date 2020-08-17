import React from 'react';
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

import App from './App';

Enzyme.configure({adapter: new EnzymeAdapter()})

/**
 * Factory function for create a ShallowWrapper for the App component
 * @param {object} props - component props specific to this setup
 * @param {object} state
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
    const wrapper = shallow(<App {...props}/>)
    if (state) wrapper.setState(state)
    return wrapper
}

/**
 * Returns ShallowWrapper with nodes, containing data-test value
 * @param wrapper
 * @param val
 * @returns {*}
 */
const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`)
}

test('renders without errors', () => {
    const wrapper = setup()
    const appComponent = findByTestAttr(wrapper, 'component-app')
    expect(appComponent.length).toBe(1)
});
test('renders increment button', () => {
    const wrapper = setup()
    const button = findByTestAttr(wrapper, 'increment-button')
    expect(button.length).toBe(1)
});
test('renders counter display', () => {
    const wrapper = setup()
    const counterDisplay = findByTestAttr(wrapper, 'counter-display')
    expect(counterDisplay.length).toBe(1)
});
test('counter starts at 0', () => {
    const wrapper = setup()
    const initialCounterState = wrapper.state('counter')
    expect(initialCounterState).toBe(0)
});
test('clicking a button increments counter display', () => {
    const counter = 7
    const wrapper = setup(null, {counter})

    //find button and click
    const button = findByTestAttr(wrapper, 'increment-button')
    button.simulate('click')

    //find display and test value
    const counterDisplay = findByTestAttr(wrapper, 'counter-display')
    expect(counterDisplay.text()).toContain(counter + 1)

});
describe('Decrement', () => {
    test('renders decrement button', () => {
        const wrapper = setup();
        const button = findByTestAttr(wrapper, 'decrement-button');
        expect(button.length).toBe(1);
    });
    test('clicking decrement button decrements counter display when state is greater than 0', () => {
        const counter = 7;
        const wrapper = setup(null, { counter });

        // find button and click
        const button = findByTestAttr(wrapper, 'decrement-button');
        button.simulate('click');
        wrapper.update();

        // find display and test value
        const counterDisplay = findByTestAttr(wrapper, 'counter-display');
        expect(counterDisplay.text()).toContain(counter - 1);
    });
    // make sure error doesn't show by default
    test('error does not show when not needed', () => {
        // I plan to implement this by using a "hidden" class for the error div
        // I plan to use the data-test value 'error-message' for the error div
        const wrapper = setup();
        const errorDiv = findByTestAttr(wrapper, 'error-message');

        // using enzyme's ".hasClass()" method
        // http://airbnb.io/enzyme/docs/api/ShallowWrapper/hasClass.html
        const errorHasHiddenClass = errorDiv.hasClass('hidden');
        expect(errorHasHiddenClass).toBe(true);
    });
    describe('counter is 0 and decrement is clicked', () => {
        // using a describe here so I can use a "beforeEach" for shared setup

        // scoping wrapper to the describe, so it can be used in beforeEach and the tests
        let wrapper
        beforeEach(() => {
            // no need to set counter value here; default value of 0 is good
            wrapper = setup();

            // find button and click
            const button = findByTestAttr(wrapper, 'decrement-button');
            button.simulate('click');
            wrapper.update();
        });
        test('error shows', () => {
            // check the class of the error message
            const errorDiv = findByTestAttr(wrapper, 'error-message');
            const errorHasHiddenClass = errorDiv.hasClass('hidden');
            expect(errorHasHiddenClass).toBe(false);
        });
        test('counter still displays 0', () => {
            const counterDisplay = findByTestAttr(wrapper, 'counter-display');
            expect(counterDisplay.text()).toContain(0);
        });
        test('clicking increment clears the error', () => {
            // find and click the increment button
            const button = findByTestAttr(wrapper, 'increment-button');
            button.simulate('click');

            // check the class of the error message
            const errorDiv = findByTestAttr(wrapper, 'error-message');
            const errorHasHiddenClass = errorDiv.hasClass('hidden');
            expect(errorHasHiddenClass).toBe(true);
        });
    });
});


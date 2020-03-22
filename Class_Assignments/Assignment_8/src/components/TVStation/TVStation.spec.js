import React from 'react';
import { mount } from 'enzyme';
import TVStation from './';
import { getTvSchedule } from '../../services/tvService';
import data from  '../../resources/mock-schedule.json'
import SignupForm from "../SignupForm/SignupForm.spec";

// SETUP TESTS
jest.mock('../../services/tvService');
jest.useFakeTimers();

describe('TV station component test', () => {
    let component;
    beforeEach( () => {
        component = mount(<TVStation/>);
        getTvSchedule.mockImplementation( () => {
            return new Promise((resolve, reject) => {
                resolve(data);
            });
        })
    });

    it('contains the same number of childs', () => {
        jest.runAllTimers();
        return Promise.resolve().then( () => {
            component.update();
            expect(component.find('.tv-schedule').children.length).toBe(3);
        });
    });

    it('It was called at least once', () => {
        jest.runAllTimers();
        expect(getTvSchedule).toHaveBeenCalled();
    });

});
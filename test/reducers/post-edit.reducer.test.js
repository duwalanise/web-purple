import { expect } from 'chai';

import postEditReducer from './../../src/reducers/post-edit.reducer';
import {
    CHANGE_POST_LINK,
    changePostText,
    CHANGE_POST_LINK_TITLE,
    CHANGE_POST_IMAGE,
    toggleDeferredPost,
    toggleExportToFacebook,
    SUBMIT_POST_FORM,
    POST_ADDED,
} from './../../src/actions/post-edit-form.actions';

describe('post-edit.reducer', () => {
    const state = Object.freeze({});

    it('should create empty post object on init', () => {
        const newState = postEditReducer(undefined, {});
        expect(newState).to.be.defined;
        expect(newState.post).to.be.defined;
        expect(newState.post.text).to.be.defined;
    });

    it('should return old state on unknown action', () => expect(postEditReducer(state, {})).to.equal(state));

    describe('CHANGE_POST_LINK action', () => {
        it('should set new link', () => {
            const link = 'awesome link';
            expect(postEditReducer(state, { type: CHANGE_POST_LINK, payload: link }).post.link).to.equal(link);
        });
    });

    describe('CHANGE_POST_TEXT action', () => {
        it('should set new text', () => {
            const text = 'awesome text';
            expect(postEditReducer(state, changePostText(text)).post.text).to.equal(text);
        });
    });

    describe('CHANGE_POST_LINK_TITLE action', () => {
        it('should set new text', () => {
            const linkTitle = 'awesome title';
            expect(postEditReducer(state, {
                type: CHANGE_POST_LINK_TITLE,
                payload: linkTitle,
            }).post.linkTitle).to.equal(linkTitle);
        });
    });

    describe('CHANGE_POST_IMAGE action', () => {
        it('should set new text', () => {
            const imageLink = 'awesome image';
            expect(postEditReducer(state, {
                type: CHANGE_POST_IMAGE,
                payload: imageLink,
            }).post.imageLink).to.equal(imageLink);
        });
    });

    describe('DEFERRED_POST action', () => {
        it('should toggle deferredPost', () => {
            const newState = postEditReducer(state, toggleDeferredPost());
            expect(newState.deferredPost).to.equal(true);
            expect(postEditReducer(newState, toggleDeferredPost()).deferredPost).to.equal(false);
        });
    });

    describe('EXPORT_TO_FACEBOOK action', () => {
        it('should set exportToFacebook', () => {
            expect(postEditReducer(state, toggleExportToFacebook(true)).post.exportToFacebook).to.equal(true);
            expect(postEditReducer(state, toggleExportToFacebook(false)).post.exportToFacebook).to.equal(false);
        });
    });

    describe('SUBMIT_POST_FORM action', () => {
        it('should set isFetching to true', () => {
            expect(postEditReducer(state, { type: SUBMIT_POST_FORM }).isFetching).to.equal(true);
        });
    });

    describe('POST_ADDED action', () => {
        it('should clear all post fields and set isFetching to false after post saved', () => {
            const newState = postEditReducer(state, { type: POST_ADDED });
            expect(newState.post).to.deep.equal({ text: '' });
            expect(newState.isFetching).to.equal(false);
        });
    });
});

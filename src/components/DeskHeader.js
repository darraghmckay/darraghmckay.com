import React from 'react';
import portfolioImage from '../imgs/portfolio-fullscreen.png';

const code = `
import { List } from 'immutable';
import {
  FETCH_LABELS_PENDING,
  FETCH_LABELS_ERROR,
  FETCH_LABELS_SUCCESS,
  CREATE_CRATE_SUCCESS,
} from '../actions/ActionTypes';
import * as RequestStatus from '../constants/requestStatus';
import Bundles from '../records/Bundles';

export default (state = new Bundles(), { type, payload }) => {
  switch (type) {
    case FETCH_LABELS_PENDING:
      return state.merge({
        status: RequestStatus.PENDING,
      });
    case FETCH_LABELS_ERROR:
      return state.merge({
        status: RequestStatus.ERROR,
      });
    case FETCH_LABELS_SUCCESS:
      return new Bundles({
        status: RequestStatus.SUCCESS,
        bundlesMap: payload.reduce(
          (acc, bundle) => acc.set(bundle.id, bundle),
          state.bundlesMap
        ),
      });
    case CREATE_CRATE_SUCCESS:
      return state.setIn(['bundlesMap', payload.id], payload);
    case DELETE_LABEL_PENDING:
      return state.setIn(
        ['bundlesMap', payload, 'status'],
        RequestStatus.PENDING
      );
    default: 
      return state;
  }
})
`;

const DeskHeader = () => (
  <header>
    <div className="splash-cover pt-8">
      <div className="deskDiv">
        <div className="clock">
          <div className="hand" />
          <div className="minhand" />
        </div>
        <div className="deskContainer">
          <div className="monitor">
            <div className="monitorScreen">
              <div className="browser loading">
                <div className="status-bar">
                  <div className="buttons" />
                </div>
                <div className="tab-bar" />
                <div className="window">
                  <div className="loader" />
                  <img
                    alt="scroll-preivew"
                    id="scroll-img"
                    src={portfolioImage}
                    draggable="false"
                    className="scroll-img"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="laptop">
            <div className="laptopScreen">
              <pre>
                <code>{code}</code>
              </pre>
            </div>
          </div>
          <div className="table" />
        </div>
        <div className="person" />
        <div className="chair" />
      </div>
    </div>
  </header>
);

export default DeskHeader;

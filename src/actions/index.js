/**
 *
 *    Reducer Action List & Factories: Main File
 *
 */

import axios from 'axios';

export const FETCH_EVENTS = 'FETCH_EVENTS';
export const LOGOUT = 'LOGOUT';
export const AUTH = 'AUTH';
export const FETCH_JOINED_EVENTS = 'FETCH_JOINED_EVENTS';
export const FETCH_CREATED_EVENTS = 'FETCH_CREATED_EVENTS';
export const FETCH_ONE_EVENT = 'FETCH_ONE_EVENT';
export const CREATE_ONE_EVENT = 'CREATE_ONE_EVENT';
export const UPLOAD_IMG = 'UPLOAD_IMG';
export const SET_DATE = 'SET_DATE';
export const REJECT_FILE = 'REJECT_FILE';
export const SELECT_EVENT = 'SELECT_EVENT';
export const JOIN_EVENT = 'JOIN_EVENT';
export const EDIT_EVENT = 'EDIT_EVENT';

/**
 *    Fetches all events from the backend
 *
 *    @returns [Object] action that feeds into the reducer function
 */
export function fetchEvents() {
  const request = axios.get('api/events');
  return {
    type: FETCH_EVENTS,
    payload: request
  };
}

export function logout() {
  const request = axios.get('api/auth/logout');
  return {
    type: LOGOUT,
    payload: request
  };
}


export function auth() {
  const request = axios.get('api/loggedin')
                        .then((response) => {
                          console.log(response);
                          return response;
                        });
  return {
    type: AUTH,
    payload: request
  };
}

export function uploadImage(file) {
  let imageUrl;
  const request = axios.get('api/s3/sign?file_name=' + file.name + '&file_type=' + file.type)
                        .then((result) => {
                          imageUrl = result.data.url;
                          return axios.put(result.data.signed_request, file, {
                            headers: {
                              'Content-Type': file.type
                            }
                          }).then(() => { return imageUrl; });
                        });
  return {
    type: UPLOAD_IMG,
    payload: request
  };
}

export function createEvent(data) {
  const request = axios.post('api/events', data);
  return {
    type: CREATE_ONE_EVENT,
    payload: request
  };
}

/**
 *    
 *    Fetches all events joined by User by his/her User ID
 *    
 *    @param [Number] which is the unique ID of the User 
 *    @returns [Object] reducer Action
 *    
 */
export function fetchJoinedEvents(userId) {
  const request = axios.get(`api/events/${userId}/joinedevents`);
  return {
    type: FETCH_JOINED_EVENTS,
    payload: request
  };
}


/**
 *    
 *    Fetches all events created by User by his/her User ID
 *    
 *    @param [Number] which is the unique ID of the User 
 *    @returns [Object] reducer Action
 *    
 */
export function fetchCreatedEvents(userId) {
  console.log('User ID for created Events', userId);
  const request = axios.get(`api/events/${userId}/createdevents`);
  return {
    type: FETCH_CREATED_EVENTS,
    payload: request
  };
}


/**
 *    
 *    Fetches one specific event by event ID
 *
 *    @param [Number] which should be the ID of the event
 *    @returns [Object] action that feeds into the reducer function
 *    
 */
export function fetchOneEvent(id) {
  const request = axios.get('api/events/' + id)
                      .then((res) => {console.log(res); return res; })
                      .catch((err) => err);
  return {
    type: FETCH_ONE_EVENT,
    payload: request
  };
}

export function setEventDate(date) {
  return {
    type: SET_DATE,
    payload: date
  };
}

export function editEvent(id) {
  const request = axios.put(`api/events/${id}`);
  return {
    type: EDIT_EVENT,
    payload: request
  };
}

export function selectEvent(event) {
  return {
    type: SELECT_EVENT,
    payload: event
  };
}

export function joinEvent(event){
  const request = axios.post(`api/events/${event.creator}/${event.id}`);
  return {
    type: JOIN_EVENT,
    payload: request
  };
}

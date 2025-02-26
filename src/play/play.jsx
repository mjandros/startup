import React from 'react';
import './play.css';
import { BlackjackGame } from './game';


export function Play(props) {
  return (
    <BlackjackGame userName={props.userName} />

    
  );
}
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'antd/dist/antd.css'

import { App } from './components/app'

import { NotesServices } from './services/notes';
const notes = require('./test/notes.json');
const svc = new NotesServices(notes);

ReactDOM.render(
  <React.StrictMode>
    <App service={svc} />
  </React.StrictMode>,
  document.getElementById('root')
)

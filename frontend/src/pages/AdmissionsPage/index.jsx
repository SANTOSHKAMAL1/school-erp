import React from 'react';
import { mountPage } from '../../dc/runtime.js';
import Logic from './logic.js';
import template from './template.jsx';
import pageCss from './page.css?raw';

export default mountPage(Logic, template, pageCss, {}, "AdmissionsPage");

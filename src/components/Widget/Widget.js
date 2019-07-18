import React from 'react';
import WidgetInputsUrl from '../WidgetInputsUrl';
import WidgetInputsEmail from '../WidgetInputsEmail';
import WidgetInputsSecret from '../WidgetInputsSecret';
import WidgetSettings from '../WidgetSettings';
import WidgetGeneratedKey from '../WidgetGeneratedKey';
import WidgetControls from '../WidgetControls';

import styles from './Widget.module.css';

const Widget = () => (
	<div className={styles.root}>
		<div className={styles.widget}>
			<WidgetInputsUrl/>
			<WidgetInputsEmail/>
			<WidgetInputsSecret/>
			<WidgetControls/>
			<WidgetSettings/>
			<WidgetGeneratedKey/>
		</div>
	</div>
);

export default Widget;
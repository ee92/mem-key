import React from 'react';
import WebsiteField from './WebsiteField';
import EmailField from './EmailField';
import SecretField from './SecretField';
import Settings from './Settings';
import GeneratedKey from './GeneratedKey';
import WidgetControls from './WidgetControls';

import styles from '../styles/PasswordWidget.module.css';

const PasswordWidget = () => (
	<div className={styles.widget}>
		<WebsiteField/>
		<EmailField/>
		<SecretField/>
		<WidgetControls/>
		<Settings/>
		<GeneratedKey/>
	</div>
);

export default PasswordWidget;
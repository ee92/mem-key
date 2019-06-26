import React from 'react';
import WebsiteField from './WebsiteField';
import EmailField from './EmailField';
import SecretField from './SecretField';
import WidgetControls from './WidgetControls';
import Settings from './Settings';
import GeneratedKey from './GeneratedKey';

const PasswordWidget = () => (
	<div>
		<WebsiteField/>
		<EmailField/>
		<SecretField/>
		<WidgetControls/>
		<Settings/>
		<GeneratedKey/>
	</div>
);

export default PasswordWidget;
import { ComponentTypes } from '../../const/discord/interaction';
import { ButtonStyles } from '../../const/discord/message';
import { IButtonComponent, ISelectMenuComponent } from '../../intf/IComponent';

export function transformComponents(components: (IButtonComponent | ISelectMenuComponent)[][]) {
	components = components.map(component => {
		component = {
			components: component.map(c => {
				if (c.type === 'Button') c.style = ButtonStyles[c.style] as any;
				c.type = ComponentTypes[c.type] as any;
				return c;
			}),
			type: 1,
		} as any;
		return component;
	});
	return components;
}

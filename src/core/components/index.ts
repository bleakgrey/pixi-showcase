import { Container } from 'pixi.js'
import { isClass } from '../Helpers'

type ComponentType<P = any> = {
	new(): Container;
} | ((props: P) => Container) | Container;

declare global {
	namespace JSX {
		interface IntrinsicElements { }
		interface Element extends Container { }
		interface ElementClass extends Container { }
		interface ElementAttributesProperty { props: {} }
	}
}

declare module "pixi.js" {
	interface Container {
		(props: any): Container;
	}
}

declare module 'pixi.js' {
	interface ContainerOptions {
		ref?: any
		style?: any
	}
}

export { Container, Graphics, Rectangle, Texture } from 'pixi.js'
export * from './Sprite'

export function jsx<P extends Record<string, any>>(
	tag: ComponentType<P>,
	props: P | null,
	...children: any[]
): Container {
	const finalProps = props || {} as P;

	let node: Container

	if (tag instanceof Container) {
		node = tag
	}
	else if (isClass(tag)) {
		node = new (tag as new () => Container)()
	}
	else {
		node = (tag as (props: P, children: Container[]) => Container)(finalProps, children)
	}

	if (node) {
		for (const prop in finalProps) {
			const value = finalProps[prop]
			switch (prop) {
				case 'ref':
					finalProps.ref(node)
					break
				default:
					(node as any)[prop] = value
					break
			}
		}
	}

	for (const child of children) {
		if (child && child.addChild) {
			node.addChild(child)
		}
	}

	return node
}

import { Assets, Container, DisplayObject, IPointData, Point, Texture } from "pixi.js"

export function isClass(func: any): boolean {
	return (
		typeof func === 'function' &&
		func.prototype &&
		Object.getOwnPropertyDescriptor(func, 'prototype')?.writable === false
	)
}

export function getTexture(id: string): Texture {
	const result = Assets.get(id)

	if (!result) {
		console.warn(`Unknown texture: "${id}". I may have forgor to include it in assets...`)
		return Texture.WHITE
	}

	return result
}

export function findChildren(node: DisplayObject) {
	let array: Container[] = [];

	(node as Container).children.forEach((child: DisplayObject) => {
		array.push(child as Container)
		array.push(...findChildren(child as Container))
	})

	return array
}

export function clamp(min: number, max: number, val: number) {
	return Math.min(Math.max(val, min), max)
}

export function fitRectInto(source: IPointData, target: IPointData): IPointData {
	const sourceAspectRatio = source.x / source.y
	const targetAspectRatio = target.x / target.y

	let newWidth: number
	let newHeight: number

	if (sourceAspectRatio > targetAspectRatio) {
		// Source is wider relative to the target, so fit to target width
		newWidth = target.x
		newHeight = target.x / sourceAspectRatio
	} else {
		// Source is taller (or equal aspect ratio), so fit to target height
		newHeight = target.y
		newWidth = target.y * sourceAspectRatio
	}

	return {
		x: newWidth,
		y: newHeight,
	}
}

export function randomInRange(min: number, max: number): number {
	return Math.random() * (max - min) + min
}

export function randomElement<T>(array: Array<T>): T {
	const idx = Math.floor(randomInRange(0, array.length))
	return array[idx]
}

export function getPointsOnCircle(
	centerX: number,
	centerY: number,
	radius: number,
	totalPoints: number,
) {
	const points: Point[] = [];
	for (let i = 0; i < totalPoints; i++) {
		const angle = (i / totalPoints) * 2 * Math.PI;
		const x = centerX + radius * Math.cos(angle);
		const y = centerY + radius * Math.sin(angle);
		points.push(new Point(x, y));
	}
	return points;
}
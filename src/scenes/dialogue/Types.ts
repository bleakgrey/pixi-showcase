export interface IAvatar {
	name: string;
	url: string;
	position: "left" | "right";
}

export interface ILine {
	name: string;
	text: string;
}

export interface IEmoji {
	name: string;
	url: string;
}

export interface IDialogueScript {
	avatars: IAvatar[];
	dialogue: ILine[];
	emojies: IEmoji[];
}
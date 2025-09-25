import { AssetsBundle } from "pixi.js";
import LOGO from './assets/logo.png'
import DEBUG_FRAME from './assets/debug_frame.png'
import ICON_BACK from './assets/icon_back.png'
import ICON_FS_ENTER from './assets/icon_fullscreen_enter.png'
import ICON_FS_LEAVE from './assets/icon_fullscreen_leave.png'
import ICON_MUSIC from './assets/icon_music.png'
import ICON_MUSIC_OFF from './assets/icon_music_disabled.png'
import TOBYGREEK_SPR from './assets/TobiGreekCyrillicRegular.png'
import TOBYGREEK from './assets/TobiGreekCyrillicRegular.xml?url'
import BG_A from './assets/bg_a.png'
import PATTERN_STRIPE from './assets/pattern_stripe.png'
import PATTERN_STAR from './assets/pattern_star.png'
import PATTERN_WAVE from './assets/pattern_wave.png'
import PATTERN_HEART from './assets/pattern_heart.png'

import CARD_PLACEHOLDER from './assets/card_placeholder.png'
import CARD1 from './assets/card.png'
import CARD2 from './assets/card2.png'
import CARD3 from './assets/card3.png'
import CARD4 from './assets/card4.png'

import FIRE_SPRITE_1 from './assets/vfx_fire1.png'
import FIRE_SPRITE_2 from './assets/vfx_fire2.png'
import FIRE_SPRITE_3 from './assets/vfx_fire3.png'

export enum AssetAlias {
	LOGO = 'logo',
	DEBUG_FRAME = 'frame',

	ICON_BACK = 'back',
	ICON_FULLSCREEN_ENTER = 'enterFullscreen',
	ICON_FULLSCREEN_LEAVE = 'leaveFullscreen',
	ICON_MUSIC = 'music',
	ICON_MUSIC_OFF = 'musicOff',

	TOBYGREEK_PAGE = 'TobiGreekCyrillicRegularSpr',
	TOBYGREEK = 'TobiGreekCyrillicRegular',

	BG_A = 'bg_a',
	PATTERN_STRIPE = 'patternStripe',
	PATTERN_STAR = 'patternStar',
	PATTERN_WAVE = 'patternWave',
	PATTERN_HEART = 'patternHeart',

	DIALOGUE_SCRIPT = 'dlg',

	CARD_PLACEHOLDER = 'cardOutline',
	CARD1 = 'card1',
	CARD2 = 'card2',
	CARD3 = 'card3',
	CARD4 = 'card4',

	FIRE_SPRITE_1 = 'fire1',
	FIRE_SPRITE_2 = 'fire2',
	FIRE_SPRITE_3 = 'fire3',
}

export const AssetBundle: AssetsBundle = {
	name: 'assets',
	assets: [
		// Some of these sprites can be a spritesheet instead of individual textures.
		{
			alias: AssetAlias.DEBUG_FRAME,
			src: DEBUG_FRAME,
		},
		{
			alias: AssetAlias.PATTERN_STRIPE,
			src: PATTERN_STRIPE,
		},
		{
			alias: AssetAlias.PATTERN_STAR,
			src: PATTERN_STAR,
		},
		{
			alias: AssetAlias.PATTERN_WAVE,
			src: PATTERN_WAVE,
		},
		{
			alias: AssetAlias.PATTERN_HEART,
			src: PATTERN_HEART,
		},
		{
			alias: AssetAlias.LOGO,
			src: LOGO,
		},
		{
			alias: AssetAlias.ICON_BACK,
			src: ICON_BACK,
		},
		{
			alias: AssetAlias.ICON_FULLSCREEN_ENTER,
			src: ICON_FS_ENTER,
		},
		{
			alias: AssetAlias.ICON_FULLSCREEN_LEAVE,
			src: ICON_FS_LEAVE,
		},
		{
			alias: AssetAlias.ICON_MUSIC,
			src: ICON_MUSIC,
		},
		{
			alias: AssetAlias.ICON_MUSIC_OFF,
			src: ICON_MUSIC_OFF,
		},
		{
			alias: AssetAlias.BG_A,
			src: BG_A,
		},
		{
			alias: AssetAlias.TOBYGREEK_PAGE,
			src: TOBYGREEK_SPR,
		},
		{
			alias: AssetAlias.TOBYGREEK,
			src: TOBYGREEK,
		},

		// Cards
		{
			alias: AssetAlias.CARD_PLACEHOLDER,
			src: CARD_PLACEHOLDER,
		},
		{
			alias: AssetAlias.CARD1,
			src: CARD1,
		},
		{
			alias: AssetAlias.CARD2,
			src: CARD2,
		},
		{
			alias: AssetAlias.CARD3,
			src: CARD3,
		},
		{
			alias: AssetAlias.CARD4,
			src: CARD4,
		},

		// Dialogue
		{
			alias: AssetAlias.DIALOGUE_SCRIPT,
			src: 'https://private-624120-softgamesassignment.apiary-mock.com/v2/magicwords',
			loadParser: 'loadJson',
		},

		// Fire
		{
			alias: AssetAlias.FIRE_SPRITE_1,
			src: FIRE_SPRITE_1,
		},
		{
			alias: AssetAlias.FIRE_SPRITE_2,
			src: FIRE_SPRITE_2,
		},
		{
			alias: AssetAlias.FIRE_SPRITE_3,
			src: FIRE_SPRITE_3,
		},
	],
}
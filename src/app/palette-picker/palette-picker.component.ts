import { Component, OnInit } from '@angular/core';
import { ThemeService, SubPalette } from '../theme.service';
import { FormGroup, FormControl } from '@angular/forms';

import * as tinycolor from 'tinycolor2';

export interface Palette {
	primary: SubPalette;
	accent: SubPalette;
	warn: SubPalette;
	darkText: string;
	darkBackground: string;
	lightText: string;
	lightBackground: string;
}

@Component({
	selector: 'app-palette-picker',
	templateUrl: './palette-picker.component.html',
	styleUrls: ['./palette-picker.component.scss']
})
export class PalettePickerComponent implements OnInit {
	form: FormGroup;

	constructor(private service: ThemeService) {
		this.form = new FormGroup({
			primary: new FormGroup({
				main: new FormControl(''),
				lighter: new FormControl(''),
				darker: new FormControl('')
			}),
			accent: new FormGroup({
				main: new FormControl(''),
				lighter: new FormControl(''),
				darker: new FormControl('')
			}),
			warn: new FormGroup({
				main: new FormControl(''),
				lighter: new FormControl(''),
				darker: new FormControl('')
			}),
			lightText: new FormControl('', []),
			lightBackground: new FormControl('', []),
			darkText: new FormControl('', []),
			darkBackground: new FormControl('', [])
		});

		// this.form.valueChanges
		//   .pipe(
		//     throttleTime(200)
		//   ).subscribe(x => {
		//     const errs = this.validateLegibility(this.form);
		//     this.form.setErrors(errs);
		//   });
	}

	isLegible(l1: string | tinycolor.Instance, l2: string | tinycolor.Instance, threshold = 4.5) {
		const rl1 = tinycolor(l1).getLuminance();
		const rl2 = tinycolor(l2).getLuminance();
		if (rl1 > rl2) {
			return (rl1 + 0.05) / (rl2 + 0.05) > threshold;
		} else {
			return (rl2 + 0.05) / (rl1 + 0.05) > threshold;
		}
	}

	validateLegibility(form: FormGroup) {
		const f = form.value;

		const lightText = f.lightText;
		const lightBackground = tinycolor(f.lightBackground);
		const darkText = f.darkText;
		const darkBackground = tinycolor(f.darkBackground);

		const pcol = tinycolor(f.primary.main);
		const acol = tinycolor(f.accent.main);
		const wcol = tinycolor(f.warn.main);

		let lightLegible =
			this.isLegible(lightText, lightBackground) &&
			this.isLegible(lightText, lightBackground.darken(10)) &&
			this.isLegible(lightText, lightBackground.darken(20));
		// && this.isLegible(wcol, lightBackground)
		// && this.isLegible(wcol, lightBackground.darken(10));

		let darkLegible =
			this.isLegible(darkText, darkBackground) &&
			this.isLegible(darkText, darkBackground.lighten(10)) &&
			this.isLegible(darkText, darkBackground.lighten(20));
		// && this.isLegible(wcol, darkBackground)
		// && this.isLegible(wcol, darkBackground.lighten(10));

		if (tinycolor(pcol).isDark()) {
			darkLegible = darkLegible && this.isLegible(darkText, pcol);
		} else {
			lightLegible = lightLegible && this.isLegible(lightText, pcol);
		}

		if (tinycolor(acol).isDark()) {
			darkLegible = darkLegible && this.isLegible(darkText, acol);
		} else {
			lightLegible = lightLegible && this.isLegible(lightText, acol);
		}

		const errors = {};
		if (!lightLegible) {
			errors['illegible-light'] = { valid: false };
		}
		if (!darkLegible) {
			errors['illegible-dark'] = { valid: false };
		}
		return Object.keys(errors) ? errors : null;
	}

	ngOnInit() {
		this.form.patchValue({
			primary: { main: '#2d3047' },
			accent: { main: '#059fad' },
			warn: { main: '#c83901' },
			lightText: '#2d3047',
			lightBackground: '#fafafa',
			darkText: '#fafafa',
			darkBackground: '#2d3047'
		});

		this.form.valueChanges.subscribe(x => {
			this.service.palette = x;
		});

		this.service.$palette.subscribe(x => {
			if (x) {
				this.form.patchValue(x);
			}
		});
	}
}

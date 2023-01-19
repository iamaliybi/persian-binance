(() => {
	const getCookie = (cname) => {
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');

		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) === 0) {
				return c.substring(name.length, c.length);
			}
		}
		return undefined;
	};

	const systemIsInDarkMode = () => {
		try {
			return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
		} catch (e) {
			return false;
		}
	};

	const changeSystemPalette = () => {
		const defaultUserSystemPalette = systemIsInDarkMode() ? 'dark' : 'light';
		const themeFromCookie = getCookie("theme");
		const theme = themeFromCookie
			? ['dark', 'light'].includes(themeFromCookie)
				? themeFromCookie
				: defaultUserSystemPalette
			: defaultUserSystemPalette;

		document.documentElement.classList[theme === 'dark' ? 'add' : 'remove']("dark");
	};

	const initialLoad = () => {
		/* Dark mode */
		changeSystemPalette();
	};

	initialLoad();
})();
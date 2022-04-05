/**
 * Format a string to a human readable date format
 * @param {string} dateString
 * @returns
 */
export function readableDate(dateString) {
	const formattedDate = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(
		new Date(dateString)
	);

	return formattedDate;
}

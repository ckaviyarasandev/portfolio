const DRIVE_FILE_PATTERN = /drive\.google\.com\/file\/d\/([^/]+)/;

/** Extracts the file id from a Google Drive share URL, or null if it isn't one. */
export function getDriveFileId(href) {
	return href?.match(DRIVE_FILE_PATTERN)?.[1] ?? null;
}

/**
 * A Drive "view" share link (.../file/d/<id>/view) only opens Drive's viewer —
 * the `download` attribute is ignored for cross-origin links, so it can't force
 * a save. Drive's `uc?export=download` endpoint sends a real attachment header
 * instead, so a click on this URL actually downloads the file.
 */
export function toDriveDownloadUrl(href) {
	const id = getDriveFileId(href);
	return id ? `https://drive.google.com/uc?export=download&id=${id}` : href;
}

/** Drive's inline preview endpoint, embeddable in an iframe. */
export function toDriveEmbedUrl(href) {
	const id = getDriveFileId(href);
	return id ? `https://drive.google.com/file/d/${id}/preview` : href;
}

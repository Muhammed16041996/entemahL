// imageHelper.ts

/**
 * Generates a full image URL from a base URL and image path.
 * @param baseUrl - The base URL of the application.
 * @param imagePath - The path to the image file.
 * @returns The full URL to the image.
 */
const generateImageUrl = (baseUrl: string, imagePath: string): string => {
    return `${baseUrl}/${imagePath}`;
};

/**
 * Validates the image URL based on certain criteria.
 * @param imageUrl - The URL of the image to validate.
 * @returns True if the image URL is valid, otherwise false.
 */
const validateImageUrl = (imageUrl: string): boolean => {
    const pattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp))(\?.*)?$/;
    return pattern.test(imageUrl);
};

/**
 * Detects the file extension from a given image filename.
 * @param filename - The name of the file from which to detect the extension.
 * @returns The file extension or an empty string if no valid extension is found.
 */
const detectFileExtension = (filename: string): string => {
    const parts = filename.split('.');
    return parts.length > 1 ? parts.pop() || '' : '';
};

export { generateImageUrl, validateImageUrl, detectFileExtension };
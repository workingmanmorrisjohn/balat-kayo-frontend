export const resizeImage = (file: File, maxWidth: number, maxHeight: number): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = () => {
            let { width, height } = img;

            // Calculate new dimensions while preserving aspect ratio
            if (width > maxWidth || height > maxHeight) {
                const aspectRatio = width / height;
                if (width > height) {
                    width = maxWidth;
                    height = Math.round(maxWidth / aspectRatio);
                } else {
                    height = maxHeight;
                    width = Math.round(maxHeight * aspectRatio);
                }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            if (!ctx) return reject("Canvas context is null");

            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
                blob => {
                    if (blob) resolve(blob);
                    else reject("Failed to convert canvas to blob");
                },
                file.type, // Keep original file type (e.g., "image/jpeg" or "image/png")
                0.8 // Compression quality (0 to 1) — adjust as needed
            );

            URL.revokeObjectURL(url);
        };

        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject("Failed to load image");
        };

        img.src = url;
    });
};

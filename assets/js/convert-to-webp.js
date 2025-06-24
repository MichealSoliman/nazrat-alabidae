import sharp from 'sharp';
import { existsSync, mkdirSync, readdir } from 'fs';
import { join, parse } from 'path';

// المجلد الذي يحتوي على الصور
const inputFolder = '../img/testimonials'; // استبدل "images" بمسار مجلد الصور
const outputFolder = '../img/output2';

// تأكد من وجود مجلد الإخراج
if (!existsSync(outputFolder)) {
    mkdirSync(outputFolder);
}

// قراءة جميع الملفات في المجلد
readdir(inputFolder, (err, files) => {
    if (err) {
        console.error("خطأ في قراءة المجلد:", err);
        return;
    }

    files.forEach(file => {
        const inputFilePath = join(inputFolder, file);
        const outputFilePath = join(outputFolder, `${parse(file).name}.webp`);

        // تحويل الصورة إلى WebP باستخدام sharp
        sharp(inputFilePath)
            .toFormat('webp')
            .toFile(outputFilePath, (err, info) => {
                if (err) {
                    console.error(`خطأ في تحويل ${file}:`, err);
                } else {
                    console.log(`تم تحويل ${file} إلى WebP بنجاح`);
                }
            });
    });
});

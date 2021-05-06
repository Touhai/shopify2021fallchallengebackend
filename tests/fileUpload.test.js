const fileUpload = require('../fileUpload')



test('validFileExtension', () => {
    expect(fileUpload.validate('/Users/bryankou/Desktop/coffee.jpeg')).toBe(true);

})

test('invalidFileExtension', () => {
    expect(fileUpload.validate('/Users/bryankou/Desktop/update_script_core_d8.sh')).toBe(false);
})

test('validExtensionFileTooBig', () => {
    expect(fileUpload.validate('/Users/bryankou/Desktop/bigImage.jpeg')).toBe(false);
})

test('validFileUpload', () => {
    return fileUpload.upload('/Users/bryankou/Desktop/coffee.jpeg').then(data => {
        expect(data).toBe("Uploaded");
    });
});
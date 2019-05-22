export const cloudinaryConfig = {
    cloudName: 'heartland-dental',
    apiKey: '262258731253431',
    uploadPreset: 'wgp2r2pd',
    imageUploadUrl: 'https://api.cloudinary.com/v1_1/heartland-dental/image/upload',
    resImageUrl: 'http://res.cloudinary.com/heartland-dental/',
    doctorPhotosFolder: 'doctorphotos',
    dentalTeamPhotosFolder: portal_id => `_practice/${portal_id}/team`,
    smileGalleryFolder: portal_id => `_practice/${portal_id}/smilegallery`,
    exteriorOfficePhotoFolder: portal_id => `_practice/${portal_id}/location`
};
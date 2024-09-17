export const generateUrlName = (email: string, uid: any) => {
    // Get the part of the email before '@' and take only the first 5 characters
    const emailNamePart = email.split('@')[0].substring(0, 5);


    // Combine the first 5 characters of emailNamePart, uid, and random number to generate a unique URL name
    return `${emailNamePart}_${uid}`.toString();
};


// http://localhost:5100/rppat_66e9311f56825d906c69f4d3
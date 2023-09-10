module.exports = class UserDto {
    email;
    id;
    isActivated;
    firstname;
    lastname;
    birthday;
    city;
    education;
    phone;
    aboutMe;

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.isActivated = model.isActivated;
        this.firstname = model.firstname;
        this.lastname = model.lastname;
        this.birthday = model.birthday;
        this.city = model.city;
        this.education = model.education;
        this.phone = model.phone;
        this.aboutMe = model.aboutMe;
    }
}
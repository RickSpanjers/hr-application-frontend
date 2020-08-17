export class UpdateProfileDTO {
    constructor(
        public userId: any,
        public mail: string = "",
        public firstname: string = "",
        public lastname: string = "",
        public phone: string = "",
        public country: string = "",
        public zipcode: string = "",
        public place: string = "",
    ) { }
}

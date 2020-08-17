export class AddAccountDTO {
    constructor(
        public userId: any,
        public mail: string = "",
        public firstname: string = "",
        public lastname: string = "",
        public phone: string = "",
        public address: string = "",
        public place: string = "",
        public country: string = "",
        public zipcode: string = "",
        public password: string = "",
        public passwordConfirm: string = "",
        public role: string = "",
        public functionId: any,
        public companyId: any,
        public moderatorId: any,
    ) { }
}

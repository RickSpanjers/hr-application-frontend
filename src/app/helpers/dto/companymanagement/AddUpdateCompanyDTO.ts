export class AddUpdateCompanyDTO {
    constructor(
        public companyId: any,
        public name: string = "",
        public taxId: string = "",
        public registrationNumber: number,
        public phone: string = "",
        public mail: string = "",
        public addressOne: string = "",
        public addressTwo: string = "",
        public city: string = "",
        public zipcode: string = "",
        public country: string = "",
        public archived: boolean = false,
        public ceo: string = "",
    ) { }
}

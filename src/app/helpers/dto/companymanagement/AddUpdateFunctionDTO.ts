export class AddUpdateFunctionDTO {
    constructor(
        public functionId: any,
        public name: string = "",
        public description: string = "",
        public wage: string = "",
        public archived: boolean = false,
        public companyId: any,
    ) { }
}

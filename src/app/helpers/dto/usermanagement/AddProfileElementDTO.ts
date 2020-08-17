export class AddProfileElementDTO {
    constructor(
        public userId: any,
        public name: string = "",
        public description: string = "",
        public certification: string = "",
        public type: string = "",
    ) { }
}

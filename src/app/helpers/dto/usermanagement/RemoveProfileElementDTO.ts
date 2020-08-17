export class RemoveProfileElementDTO {
    constructor(
        public userId: any,
        public profileElementId: number,
        public type: string = "",
    ) { }
}

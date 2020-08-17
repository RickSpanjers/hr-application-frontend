export class ArchiveOrRemoveUserDTO {
    constructor(
        public moderatorId: any,
        public accountId: any,
        public action: string = "",
    ) { }
}

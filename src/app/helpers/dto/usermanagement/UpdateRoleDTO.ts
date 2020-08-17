export class UpdateRoleDTO {
    constructor(
        public userId: any,
        public adminId: any,
        public role: string = "",
    ) { }
}

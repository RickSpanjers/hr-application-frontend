export class UpdatePasswordDTO {
    constructor(
        public userId: any,
        public oldPassword: string = "",
        public newPassword: string = "",
        public newPasswordConfirm: string = "",
    ) { }
}

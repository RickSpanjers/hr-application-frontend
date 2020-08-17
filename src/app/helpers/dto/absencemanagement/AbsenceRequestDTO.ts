export class AbsenceRequestDTO {
    constructor(
        public userId: any,
        public companyId: any,
        public absenceType: string = "",
        public startDate: string = "",
        public endDate: string = "",
        public reason: string = "",
    ) { }
}

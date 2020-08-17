export class UpdateAbsenceStatusDTO {
    constructor(
        public absenceId: number,
        public absenceStatus: string,
    ) { }
}

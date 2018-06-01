export class Crowsale {
    constructor(
        public durationInMinutes: number,
        public etherCostOfEachToken: number,
        public fundingGoalInEthers: number
    ) { }
}

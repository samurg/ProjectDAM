export class Token {
    constructor(
        public user: string,
        public initialSupply: number,
        public tokenName: string,
        public tokenSymbol: string
    ) {}
}

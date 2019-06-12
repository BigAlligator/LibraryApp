export interface UserLoanInfo {   
    loanId: number;
    bookId: number;
    bookSubId: string;
    bookName: string;
    bookStatus: string;
    loanStatus: string;
    fineMoney: string;
    loanDate: Date;
    expectReturnDate: Date;
    actualReturnDate: Date;
    loanDocNo: string;
    returnDocNo: string;
}

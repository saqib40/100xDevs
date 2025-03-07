const x : number = 1;
console.log(x);

function hello(firstName : string) : void {
    console.log("Hello" + firstName);
}

function isLegal(age : number) : boolean {
    if(age>18) {
        return true;
    } else {
        return false;
    }
}
function sum(a:number, b:number) : number {
    return a+b;
}
// create a function that takes another function
// and runs it after 1 sec
function delay(fn : () => void) {
    setTimeout(fn,1000);
}
delay(() => {
    console.log("hii there");
});

interface User {
    firstName : string;
    lastName : string;
    email? : string; // email may or may not be there
    age : number;
}
const user : User = {
    firstName : "Saqib",
    lastName : "Hussain",
    email : "abc@gmail.com",
    age : 34,
}
function isLegal2(user : User) : boolean {
    if(user.age > 18) {
        return true;
    }
    return false;
}
class Employee implements User {
    firstName : string;
    lastName : string;
    email? : string; // email may or may not be there
    age : number;
    constructor(a:string, b:string, c:number) {
        this.firstName=a;
        this.lastName=b;
        this.age=c;
    }
}

type User2 = {
    firstName : string;
    lastName : string;
    age : number;
}
// union
type greetArg = string | number | boolean;
//intersection
type Employe = {
    name: string;
    startDate: Date;
}
type Manager = {
    name: string;
    department: string;
}
type TeamLead = Employe & Manager;
const teamLead : TeamLead = {
    name : "jaydeep",
    startDate: new Date(),
    department: "CSE"
}
// arrays
//type NumberArr = number[];
// given an array of positive integers, return the max value in array
function maxValue(arr: number[]) : void {
    // write the logic
}
function filterUsers(users: User[]) : void {
    // write logic here
}
// Array of numbers
let numbers: number[] = [1, 2, 3, 4, 5];

// Array of strings
let names: Array<string> = ["Alice", "Bob", "Charlie"];

//Array of mixed types, like Javascript, use with caution.
let mixedArray : any[] = [1, "test", true];

//Tuples, arrays of fixed length and type.
let myTuple : [string, number] = ["test", 1];

// Array of strings and numbers
let eg: Array<string | number> = ["Alice", "Bob", "Charlie", 4];
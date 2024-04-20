//let log = console.log;
let thrush = x => f => f(x);
//let pipe = (f,g) => x => g(f(x));
let pipe = (...f) => x => f.reduce((acc,curr) => curr(acc),x)
let tap = f => x => {f(x);return x;} 
// let double = x => x*2
// let print = x => console.log(x)
// pipe(
//     tap(console.log),
//     tap(console.log),
//     double,
//     tap(console.log)
//     )(10)
class Observable{
    constructor(){
        //os = call back obersvable
        this.os = [];
        
    }
    subscribe(callBack){
        this.os.push(callBack);
        console.log("add")
    }
    emit(data){
        //emit will notify all the subscribe
     this.os.map( thrush(data) );
    }
    pipe() { 

    }
}
const observable = new Observable();


observable.emit(13);
observable.emit(111);
observable.emit(122);
observable.emit(125);

observable.subscribe((x) => { console.log(x) })
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
    //the new Observable
    //pipe() === observable.subscribe((x)=>{newObservable.emit(x*2)})
    pipe(obs) { 
        this.subscribe(x => obs.emit(x))
        return obs;
    }
}
class Mapper { 
    constructor(f) { 
        this.observable = new Observable();
        this.f = f
    }
    subscribe(cbs) { 
        this.observable.subscribe(cbs)
    }
    emit(x) { 
        this.observable.emit(this.f(x))
    }

}
const Rx = {}
Rx.map = x => new Mapper(x)

//original
const observable = new Observable();


setTimeout(() => { 
observable.emit(13);
observable.emit(111);
observable.emit(122);
observable.emit(125);
}, 100)


let adder = observable.pipe(Rx.map(x=>x+10))
let multiper = observable.pipe(new Mapper(x => x * 0 ))

observable.subscribe((x) => { console.log(x) })
adder.subscribe(console.log)
multiper.subscribe(console.log)




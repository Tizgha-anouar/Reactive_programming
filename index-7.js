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
    }
    emit(data){
        //emit will notify all the subscribe
     this.os.map( thrush(data) );
    }
    //the new Observable
    //pipe() === observable.subscribe((x)=>{newObservable.emit(x*2)})
    pipe(...obs) { 
        return obs.reduce((acc, curr) => { 
            acc.subscribe(x => curr.emit(x))
            return curr;
        }, this)

        
        // this.subscribe(x => obs.emit(x))
        // return obs;
    }
}
class Mapper { 
    constructor(f) { 
        this.observable = new Observable();
        this.f = f
    }
    subscribe(cb) { 
        this.observable.subscribe(cb)
    }
    emit(x) { 
        this.observable.emit(this.f(x))
    }

}
class Filter { 
    constructor(filter) { 
        this.observable = new Observable(),
        this.filter = filter
    }
    subscribe(cb) { 
        this.observable.subscribe(cb)
    }
    emit(x) { 
        if (this.filter(x)) { 
            this.observable.emit(x)
        }

    }


}
const Rx = {}
Rx.map      = x => new Mapper(x)
Rx.filter   = x => new Filter(x)

//original
const observable = new Observable();


setTimeout(() => { 
    observable.emit(13);
    observable.emit(11);
    observable.emit(-1);
    observable.emit(-10);

}, 100)

//let multiAction = observable.pipe(Rx.map(x=>x*0),Rx.map(x=>x+1))
// adder.subscribe(console.log)
// multiper.subscribe(console.log)
//multiAction.subscribe(console.log);
//observable.subscribe((x) => { console.log(x) })

const filterObservable = observable.pipe(
    Rx.filter(x => x >= 0 )
)
filterObservable.subscribe(console.log)


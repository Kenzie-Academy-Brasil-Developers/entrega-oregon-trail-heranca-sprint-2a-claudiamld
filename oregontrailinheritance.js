class Traveler{
    constructor(name){
        this._name = name
        this._food = 1
        this._isHealthy = true
    }
    set food(value){
        if(typeof food === 'number'){
            this._food = value
        }
    }
    get food(){
        return this._food
    }

    hunt(){
        return this._food += 2
    }
    eat(){
        if(this._food > 0) {
            this._food -= 1
        }else{
            this._isHealthy = false
        }
        return this._isHealthy
    }
}

class Wagon{
    constructor(capacity){
        this._capacity = capacity
        this._passengers = []
    }
    get passengers(){
        return this._passengers
    }
    set passengers(newPassenger) {
        this._passengers = newPassenger
    }

    getAvailableSeatCount(){
        let seats = this._capacity - this._passengers.length 
        return seats
    }
    join(traveler){
        if(this._passengers.length < this._capacity) {
            return this._passengers.push(traveler)
        }
    }
    shouldQuarantine(){
        for(let i = 0; i < this._passengers.length; i++){
            if(this._passengers[i]._isHealthy === false) {
                return true
            }
        }
        return false
    }
    totalFood(){
        let allFood = 0
        for(let i = 0; i < this._passengers.length; i++) {
            allFood += this._passengers[i]._food
        }
        return allFood
    }
}


const Hunter = class Hunter extends Traveler{
    constructor(name){
        super(name)
        this._name = name
        this._food = 2
        this._isHealthy = true
    }
    get name(){
        return this._name
    }
    set name(newName){
        return this._name = newName
    }
    hunt(){
        return this._food += 5
    }
    eat(){
        if(this._food > 0) {
            this._food -= 2
            if(this._food <= 0){
                this._isHealthy = false
            }
        }else{
            this._isHealthy = false
        }
        return this._isHealthy
    }
    giveFood(Traveler, numOfFoodUnits){
        Traveler._food += numOfFoodUnits
        this._food -= numOfFoodUnits
        if(this._food < 0){
            this._isHealthy = false
        }
    }
    
}

const Doctor = class Doctor extends Traveler{
    constructor(name){
        super(name)
        this._name = name
        this._food = 1
        this._isHealthy = true
    }
    heal(Traveler){
        if(Traveler._isHealthy === false){
            Traveler._food += 1
            Traveler._isHealthy = true
        } else{
            return Traveler._isHealthy
        }
    }
}

//TESTES

let wagon = new Wagon(4)
console.log(wagon);
let henrietta = new Traveler('Henrietta')
let juan = new Traveler('Juan')
let drsmith = new Doctor('Dr. Smith')
let sarahunter = new Hunter('Sara')
let maude = new Traveler('Maude')

console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

wagon.join(henrietta)
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

wagon.join(juan)
wagon.join(drsmith)
wagon.join(sarahunter)

wagon.join(maude)
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);

sarahunter.hunt()
drsmith.hunt()

console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);

henrietta.eat()
sarahunter.eat()
drsmith.eat()
juan.eat()
juan.eat()

console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);

drsmith.heal(juan);
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);

sarahunter.giveFood(juan, 4)
sarahunter.eat()

console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);
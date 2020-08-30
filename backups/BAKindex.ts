function component() {
  let output = 'string'
  const element = document.createElement('div')
  // Union
  type MeBoolie = true | false
  // function test(obj: string | string[])
  // Generics
  type StringArray = Array<string>
  type ObjectWithNameArray = Array<{ name: string }>

  // Identity without generic
  // :any loses type
  // function identity(arg: number): number {
  //   return arg
  // }

  // Generic: type variable
  function identity<T>(arg: T[]): T[] {
    console.log(arg.length)
    return arg
  }

  function identityArray<Array>(arg: Array): Array {
    return arg
  }

  interface NewsSite {
    name: string,
    id: number,
    rating: number,
    date: number,
    truth: MeBoolie
  }

  class News {
    name: string
    id: number
    rating: number
    date: number
    truth: MeBoolie

    constructor(name: string, id: number) {
      this.name = name
      this.id = id
      this.rating = this.generateRating
      this.date = Date.now()
      this.truth = this.sourceOfTruth
    }

    get generateRating(): number {
      return Number((Math.random() * 100).toFixed(2))
    }

    get sourceOfTruth(): boolean {
      return this.rating >= 50
    }
  }

  const newsPiece: NewsSite = new News('BBC', 1)

  output = `${newsPiece.name} is ${newsPiece.rating} years old: and that's a ${newsPiece.truth} fact`

  element.innerHTML = output + ' ' + identity([1,2,3,5,6,7,9])
  return element
}

document.body.appendChild(component())

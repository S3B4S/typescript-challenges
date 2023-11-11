/*
  898 - Includes
  -------
  by null (@kynefuk) #easy #array

  ### Question

  Implement the JavaScript `Array.includes` function in the type system. A type takes the two arguments. The output should be a boolean `true` or `false`.

  For example:

  ```ts
  type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
  ```

  > View on GitHub: https://tsch.js.org/898
*/

/* _____________ Your Code Here _____________ */

// Distributed conditional types: https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
type ToArray<T, U> = T extends any ? (T | U)[] : never
type Arrayd = ToArray<number | false, string | Function>
// Arrayd: (string | number | Function)[] | (string | false | Function)[]
type ArraydReverse = ToArray<string | Function, number | false>
// ArraydReverse: (string | number | false)[] | (number | false | Function)[]
// Conclusion: "iterates" over the first union and adds the second union to each element

// "Evaluation flow" for ArraydReverse
type XStep1 = ToArray<string | Function, number | false>
type XStep2 = string extends any ? (string | number | false)[] : never
              | Function extends any ? (Function | number | false)[] : never
type XStep3 = (string | number | false)[] | (Function | number | false)[]

// This is a distributed conditional type
type IsInUnion<T, U> = Equal<T, U> extends true ? true : false
type IsInUnionNumbers = IsInUnion<2 | 7, 7>
// X: false

// "Evaluation flow" for IsInUnionNumbers
type Step1 = IsInUnion<2 | 7, 7>
type Step2 = Equal<2, 7> extends true ? true : false | Equal<7, 7> extends true ? true : false
type Step3 = false | true // equal to boolean
// So why is X not a boolean?

type Includes<T extends readonly any[], U> = T extends [infer H, ...infer R] 
  ? (Equal<H, U> extends true ? true : Includes<R, U>)
  : false

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/898/answer
  > View solutions: https://tsch.js.org/898/solutions
  > More Challenges: https://tsch.js.org
*/
  
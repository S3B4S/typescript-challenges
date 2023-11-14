Solutions for the challenges from https://github.com/type-challenges/type-challenges

# Learnings
#### Distributed conditional types
[Distributed conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)

In order for a distributed conditional type to work, the type in the conditional must be "naked".

In other words, this is not going to work:
```ts
type IsInUnion<T, U> = Equal<T, U> extends true ? true : false
type X = IsInUnion<2 | 7, 7>
// X: false
```

Where you might `boolean` alternatively if you'd reason in this way:
```ts
type Step1 = IsInUnion<2 | 7, 7>
type Step2 = Equal<2, 7> extends true ? true : false | Equal<7, 7> extends true ? true : false
type Step3 = false | true // equal to boolean
```

To work around this, you can add `T extends any` / `T extends T` to force the distributed conditional type:
```ts
type IsInUnion<T, U> = T extends any ? (Equal<T, U> extends true ? true : false) : never
type X = IsInUnion<2 | 7, 7>
// X: boolean
```
---
#### Intersection
Don't expect right to "override" left in intersections, it's like with sets (this seems very obvious in hindsight and I'm not sure why I didn't realise it before).
---
#### Readonly
`readonly` is a relatively "weak" operator and not as strong as you'd theoretically expect it to be.

```ts
type ReadonlyIntersection = {
  readonly foo: string
} & {
  foo: string
}

const bar: ReadonlyIntersection = { foo: "ha" }
bar.foo = 'hello' // allowed
```

Even though intuitively one might expect the intersection of `readonly` & `mutability` to be `readonly`.
---
#### Remap keys in mapped types
Keys can be remapped in mapped types: https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as

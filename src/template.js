import meta from './meta'
import { flatten } from './utils'

function interleave(array1, array2){
  if(array1.length >= array2.length){
    return array1.map((v, i) => (i < array2.length ? [v, array2[i]] : [v])).reduce((a, b) => a.concat(b), [])
  } else {
    return array2.map((v, i) => (i < array1.length ? [array1[i], v] : [v])).reduce((a, b) => a.concat(b), [])
  }
}

function niceTemplate(strings, ...values){
  return interleave(
    strings.map(value => ({type: 'string', value})),
    values.map(value => ({type: 'value', value}))
  )
}

function reducer({ object, remainder }, consumer){
  let { remainder, ...slice } = consumer(remainder)
  return { remainder, Object.assign(object, slice) }
}

function semanticNewline(strings){
  return flatten(strings.map(s => s.split('\n')))
}

function removeWhitespace(strings){
  return strings.map(s => s.trim()).filter(s => s.length)
}
//: cleaners.reduce((s, f) => f(s), strings),

function Tag({
  positional,
  structured,
  cleaners = [semanticNewline, removeWhitespace]
}){
  return function objectify(strings, ...values) {
    return [...structured, ...positional].reduce(reducer, ({
      object: {}, remainder: { strings values }
    }))
  }
}


function examples({ strings, values }){
  strings.('examples:')
}

